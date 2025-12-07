import express from "express"; // express is just http request handler
import http from "http"; // to create http server
import { Socket } from "socket.io";
import { Server } from "socket.io"; // to create the socket server

import {
  getPendingMsg,
  markDelivered,
  saveMsg,
} from "../controllers/messageControlller.js";
import { socketAuthMiddleware } from "../middlewares/socketAuthMiddleware.js";
import { addSocket, onlineUsers, removeSocket } from "./onlineUsers.js";

const app = express();
const frontendUrl = process.env.FRONTEND_URL;

// to attach the socket we need to create raw server with the http

const server = http.createServer(app); //wrapping app in http server to handle request

const io = new Server(server, {
  //this attaches a Socket.IO server to that same HTTP
  // to handle both http and socket request real time requests
  cors: {
    credentials: true,
    origin: frontendUrl,
  },
});

interface AuthenticatedSocket extends Socket {
  userId?: string;
} // coz extended version of socket with soket.userId

io.use((socket, next) => {
  socketAuthMiddleware(socket, next).catch(next);
}); // middleware to verify the user

io.on("connection", async (socket: AuthenticatedSocket) => {
  console.log("user connected with userId:", socket.userId);
  const userId = socket.userId;
  if (!userId) {
    socket.disconnect(true);
    return;
  }

  // handle the recive Message part

  addSocket(userId, socket.id);

  const pedingMsgs = await getPendingMsg(userId); // get all msgs those are pendings

  for (const msg of pedingMsgs) {
    io.to(socket.id).emit("reciveMessage", msg); // will send all pending msgs for users and make deliverd true
    await markDelivered(msg.id);
  }

  // send message part
  socket.on(
    "send-message",
    async (payload: { content: string; to: string }) => {
      const { content, to } = payload; //payload is  data object sent by the client when it emits the "send-message" event similar to the req.body
      const recipientSokcet = onlineUsers.get(to); // to check reciver is ol or not
      const delivered = recipientSokcet ? true : false;
      const senderId = userId;
      const savedMsg = await saveMsg(senderId, to, delivered, content);
      socket.emit("message-sent", savedMsg); // this will notify user message sent
      // if reciver is online
      if (recipientSokcet) {
        for (const sid of recipientSokcet) {
          io.to(sid).emit("recive-message", savedMsg); // this will send to message to recivers
          //  all socket ids
        }
      }
    }
  );

  socket.on("disconnect", () => {
    console.log("diconnected", socket.id);
    removeSocket(userId, socket.id);
  });
});

export { app, io, server };
