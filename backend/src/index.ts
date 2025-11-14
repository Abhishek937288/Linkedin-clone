import "dotenv/config";
import { toNodeHandler } from "better-auth/node";
import express from "express";

import { auth } from "./lib/auth.js";

const port: number = Number(process.env.PORT) || 5000;

const app = express();

app.use(express.json());
app.use("/api/auth", toNodeHandler(auth));

app.listen(port, () => {
  console.log(`Server is running on port ${port.toString()}`);
});
