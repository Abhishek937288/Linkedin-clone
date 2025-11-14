import mongoose from "mongoose";

const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  throw new Error("Missing mongoUrl in environment variables");
}

const connectDb = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(mongoUrl);
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (error) {
    console.log("error while connecting mongoDB:", error);
    process.exit(1);
  }
};

export default connectDb;
