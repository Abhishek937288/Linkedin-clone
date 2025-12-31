import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import type { Message } from "@/types/messageType";
import { useQuery } from "@tanstack/react-query";
import { getMsgs, getProfileData } from "@/lib/api";
import { userAuthstore } from "@/store/authStore";

const Messagepage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem("authToken");
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = userAuthstore();
  const myUserId = user?.id;

  const [messages, setMessages] = useState<Message[]>([]);

  const { data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => {
      if (!id) throw new Error("No conversation id");
      return getMsgs(id);
    },
  });

  const { data: recipeitData } = useQuery({
    queryKey: ["recipeitData"],
    queryFn: () => getProfileData(id as string),
  });
  const recipeint = recipeitData?.data;

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

  return (
    <div className="bg-gray-100 h-[calc(100vh-64px)] sm:px-30 flex flex-col">
      <div className="sticky top-0 z-10 bg-gray-100 flex items-center gap-2 px-4 py-3 ">
        <img src={recipeint?.image} className="w-8 h-8 rounded-full" alt="" />
        <p className="text-lg font-semibold">{recipeint?.name}</p>
      </div>

      <div className="flex-1 overflow-y-auto  px-2 py-3">
        {messages.map((msg) => {
          const isMe = msg.senderId === myUserId;

          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"} mb-1`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 text-sm
              ${
                isMe
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-gray-700 text-white rounded-bl-none"
              }`}
              >
                <p className="font-semibold">{msg.content}</p>
                <div className="flex justify-end">
                  <p className="text-xs opacity-80">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 p-2  bg-white">
        <input
          className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-600"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message"
        />
        <button
          className="bg-green-500 text-white px-4 hover:bg-green-700 hover:text-lg hover:font-semibold cursor-pointer rounded-xl"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messagepage;
