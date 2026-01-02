import http from "http";
import { Server, Socket } from "socket.io";

import { PrismaClient } from "../../generated/prisma/index.js";
import { saveMsg } from "../controllers/messageControlller.js";
import { socketAuthMiddleware } from "../middlewares/socketAuthMiddleware.js";
import { addSocket, onlineUsers, removeSocket } from "./onlineUsers.js";

const prisma = new PrismaClient();
const frontendUrl = process.env.FRONTEND_URL;

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

// Function to attach Socket.IO to a server
export function setupSocket(server: http.Server) {
  const io = new Server(server, {
    cors: { credentials: true, origin: frontendUrl },
  });

  io.use((socket, next) => {
    socketAuthMiddleware(socket, next).catch(next);
  });

  io.on("connection", async (socket: AuthenticatedSocket) => {
    console.log("user connected:", socket.userId);
    const userId = socket.userId;
    if (!userId) return socket.disconnect(true);

    addSocket(userId , socket.id );

    await prisma.message.updateMany({
      data: { delivered: true },
      where: { delivered: false, receiverId: userId },
    });

    socket.on("send-message", async (payload: { content: string; to: string }) => {
      const { content, to } = payload;

      const recipientSockets = onlineUsers.get(to);
      const delivered = !!recipientSockets;
      const savedMsg = await saveMsg(userId , to, delivered, content);

      socket.emit("message-sent", savedMsg);

      if (recipientSockets) {
        for (const sid of recipientSockets) {
          io.to(sid).emit("recive-message", savedMsg);
        }
      }
    });

    socket.on("disconnect", () => {
      removeSocket(userId , socket.id );
    });
  });
}
