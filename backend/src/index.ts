import "dotenv/config";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";

import { auth } from "./lib/auth.js";
import commentRoutes from "./routes/commentRoutes.js";
import likeRoutes from "./routes/likeRoutes.js"
import postRoutes from "./routes/postRoutes.js";


const port: number = Number(process.env.PORT) || 5000;
const frontendUrl = process.env.FRONTEND_URL;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: frontendUrl,
  })
);

app.use(express.json());
app.use("/api/auth", toNodeHandler(auth));
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/post/like", likeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port.toString()}`);
});
