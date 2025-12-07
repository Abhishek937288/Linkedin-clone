import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export const saveMsg = async (
  senderId: string,
  receiverId: string,
  delivered: boolean,
  content: string
) => {
  const message = await prisma.message.create({
    data: {
      content,
      delivered,
      receiverId,
      senderId,
    },
  });
  return message;
};

export const getPendingMsg = async (userId: string) => {
  const message = await prisma.message.findMany({
    orderBy: { createdAt: "asc" }, // this will order msg in ascending order
    where: { delivered: false, receiverId: userId },
  });
  return message;
};

export const markDelivered = async (id: string) => {
  const message = await prisma.message.update({
    data: { delivered: true },
    where: { id },
  });
  return message;
};
