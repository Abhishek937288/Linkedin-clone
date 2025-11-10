import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";

import connectDb from "./lib/db.js";

const port = Number(process.env.port) || 8080;

const app = express();

app.use(express.json());
app.use(cookieParser());

await connectDb();

app.listen(port, () => {
  console.log(`server is running on port ${String(port)}`);
});
