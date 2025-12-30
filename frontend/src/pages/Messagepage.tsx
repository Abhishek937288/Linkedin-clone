import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import type { Message } from "@/types/messageType";
import { useQuery } from "@tanstack/react-query";
import { getMsgs } from "@/lib/api";
import { userAuthstore } from "@/store/authStore";


const Messagepage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem("authToken");
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const {user} = userAuthstore();
  const myUserId = user?.id;

  const [messages, setMessages] = useState<Message[]>([]);

  const { data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => {
      if (!id) throw new Error("No conversation id");
      return getMsgs(id);
    },
  });

  console.log(data);

  useEffect(() => {
    if (data?.data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMessages(data.data); //above line is used to ignore tseslint warning
    }
  }, [data?.data]);

  useEffect(() => {
    if (!token) return;

    const newSocket = io(backendUrl, {
      auth: { token },
    });

    newSocket.on("connect", () => {
      console.log("Connected to server with id:", newSocket.id);
    });

    newSocket.on("recive-message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    newSocket.on("message-sent", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token, backendUrl]);

  const sendMessage = () => {
    if (socket && input) {
      socket.emit("send-message", { content: input, to: id });
      setInput("");
    }
  };

  console.log(messages);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>send Message</button>
      {messages.map((msg) => {
    const isMe = msg.senderId === myUserId;

    return (
      <div
        key={msg.id}
        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-[70%] rounded-lg px-4 py-2 text-sm
            ${isMe
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-gray-200 text-black rounded-bl-none"
            }`}
        >
          {msg.content}
        </div>
      </div>
    );
  })}
    </div>
  );
};

export default Messagepage;
