/* eslint-disable 
  @typescript-eslint/no-unsafe-call,
  @typescript-eslint/no-unsafe-member-access,
  @typescript-eslint/no-unsafe-assignment
*/

import { Request, Response } from "express";

import { prisma } from "../../lib/prisma.js";


// get users recommended friends

export const getReccomendedUser = async (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res
      .status(404)
      .json({ data: null, message: "unauthorised", success: false });
  }
  const userId = req.user.id;
  const me = await prisma.user.findUnique({
    include: {
      receivedRequests: true,
      sentRequests: true,
    },
    where: { id: userId },
  });

  const friendIds = me?.friends ?? []; // to get the friends of user

  const sentToIds =
    me?.sentRequests.map((r: { recipientId: string }) => r.recipientId) ?? []; // send Request ids
  const receiverId =
    me?.receivedRequests.map((r: { senderId: string }) => r.senderId) ?? []; // received Request ids

  const excludedIds = [
    me?.id,
    ...friendIds,
    ...sentToIds,
    ...receiverId,
  ].filter((id): id is string => typeof id === "string");
  const reccomendedUser = await prisma.user.findMany({
    where: {
      id: { notIn: excludedIds },
    },
  });

  return res.status(200).json({
    data: reccomendedUser,
    message: "all recommended user",
    success: true,
  });
};

// get users friend

export const getFriends = async (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res
      .status(400)
      .json({ data: null, message: "unathorised", success: false });
  }
  const userId = req.user.id;
  const me = await prisma.user.findUnique({
    where: { id: userId },
  });

  const friendIds = (me?.friends ?? []).filter((id: string) => id !== userId);

  const friends = await prisma.user.findMany({
    select: {
      backgroundImg: true,
      createdAt: true,
      email: true,
      headline: true,
      id: true,
      image: true,
      name: true,
    },
    where: {
      id: { in: friendIds },
    },
  });

  return res.status(200).json({
    data: friends,
    message: "friends found successfully",
    success: true,
  });
};

// send frined Request
export const sendRequest = async (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res
      .status(400)
      .json({ data: null, message: "unathorised", success: false });
  }
  const myId = req.user.id;
  const { id: recipientId } = req.params;

  // to check sender and reciever are same or not
  if (myId == recipientId) {
    return res.status(400).json({
      data: null,
      message: "cannot request to yourself",
      success: false,
    });
  }

  const recipient = await prisma.user.findUnique({
    where: {
      id: recipientId,
    },
  });

  if (!recipient) {
    return res
      .status(400)
      .json({ data: null, message: "recipient not found", success: false });
  }

  // to check alreadyFriend or not

  const alreadyFriend = recipient.friends.includes(myId);
  if (alreadyFriend) {
    return res
      .status(400)
      .json({ data: null, message: "you are already friends", success: false });
  }

  // to request check request already exist or not

  const existingRequest = await prisma.friendRequest.findFirst({
    where: {
      OR: [
        { recipientId: recipientId, senderId: myId },
        { recipientId: myId, senderId: recipientId },
      ],
    },
  });
  if (existingRequest) {
    return res
      .status(400)
      .json({ data: null, message: "request already exist", success: false });
  }

  const friendRequest = await prisma.friendRequest.create({
    data: {
      recipientId: recipientId,
      senderId: myId,
    },
  });

  return res.status(200).json({
    data: friendRequest,
    message: "friend Request sent succesfully",
    success: true,
  });
};

// accept friend Request

export const acceptRequest = async (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res
      .status(400)
      .json({ data: null, message: "unauthorised", success: false });
  }

  const { id: requestId } = req.params;

  const friendRequest = await prisma.friendRequest.findFirst({
    where: { id: requestId }, // this is request id not user id
  });
  if (!friendRequest) {
    return res.status(401).json({
      data: null,
      message: "freind request not found ",
      success: false,
    });
  }

  // to check user is correct or not
  if (friendRequest.recipientId !== req.user.id) {
    return res.status(401).json({
      data: null,
      message: "your are not authorised to accept the request",
      success: false,
    });
  }
  // to update the status in friend Request
  await prisma.user.update({
    data: {
      friends: {
        push: friendRequest.recipientId,
      },
    },
    where: { id: friendRequest.senderId },
  });

  // Recipient receives friend: senderId
  await prisma.user.update({
    data: {
      friends: {
        push: friendRequest.senderId,
      },
    },
    where: { id: friendRequest.recipientId },
  });

  await prisma.user.update({
    data: {
      friends: {
        push: req.user.id,
      },
    },
    where: { id: friendRequest.recipientId },
  });
  // this will remove the request from request model
  await prisma.friendRequest.delete({
    where: { id: requestId },
  });

  return res
    .status(200)
    .json({ data: null, message: "friend request accepted", success: false });
};

//get all send Requests
export const getSentReqs = async (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res
      .status(400)
      .json({ data: null, message: "unauthorised", success: false });
  }
  const sent = await prisma.friendRequest.findMany({
    include: {
      recipient: true,
    },
    where: {
      senderId: req.user.id,
      status: "pending",
    },
  });

  return res
    .status(200)
    .json({ data: sent, message: "all sent requests", success: true });
};
// get all recieved Request

export const getFriendreqs = async (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res
      .status(400)
      .json({ data: null, message: "unauthorised", success: false });
  }
  const received = await prisma.friendRequest.findMany({
    include: {
      sender: true,
    },
    where: {
      recipientId: req.user.id,
      status: "pending",
    },
  });

  return res
    .status(200)
    .json({ data: received, message: "all recieved requests", success: true });
};
