import "dotenv/config";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import http from "http";
import path from "node:path";

import { connectDB } from "../lib/prisma.js";
import { auth } from "./lib/auth.js";
import { setupSocket } from "./lib/socket.js";
import commentRoutes from "./routes/commentRoutes.js";
import friendRequestRoutes from "./routes/friendRequestRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const port = Number(process.env.PORT) || 5000;
const frontendUrl = process.env.FRONTEND_URL;

const app = express();
const __dirname = path.resolve();

// Middlewares
app.use(cors({ credentials: true, origin: frontendUrl }));
app.use(express.json());

// API routes
app.use("/api/auth", toNodeHandler(auth));
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/post/like", likeRoutes);
app.use("/api/friends", friendRequestRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/user", userRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));
  // Catch all remaining requests and serve index.html
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

const server = http.createServer(app);

setupSocket(server);

async function bootstrap() {
  await connectDB();
  server.listen(port, () => {
    console.log(`Server running on port ${port.toString()}`);
  });
}

bootstrap().catch(console.error);
