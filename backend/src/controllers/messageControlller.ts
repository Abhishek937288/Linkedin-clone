import { Request, Response } from "express";

import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export const getMessagesBetween = async (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res
      .status(400)
      .json({ data: null, message: "unauthorised", success: false });
  }
  const userA = req.user.id;
  const userB = req.params.id;
  const message = await prisma.message.findMany({
    orderBy: { createdAt: "asc" },
    where: {
      // delivered: true, 
      OR: [
        { receiverId: userB, senderId: userA },
        { receiverId: userA, senderId: userB },
      ],
    },
  });
  return res
    .status(201)
    .json({ data: message, message: "All messages fetched", success: true });
};

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
