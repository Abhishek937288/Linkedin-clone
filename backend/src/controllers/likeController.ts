/* eslint-disable 
  @typescript-eslint/no-unsafe-call,
  @typescript-eslint/no-unsafe-member-access,
  @typescript-eslint/no-unsafe-assignment
*/
import { Request, Response } from "express";

import { prisma } from "../../lib/prisma.js";


// add like to post

export const addLike = async (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res
      .status(400)
      .json({ data: null, message: "unauthorised", success: false });
  }
  const { id: postId } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });
  if (!post) {
    return res
      .status(401)
      .json({ data: null, message: "post not found", success: null });
  }

  const alreadyLiked = await prisma.like.findUnique({
    where: {
      userId_postId: {
        postId: postId,
        userId: req.user.id,
      },
    },
  });

  if (alreadyLiked) {
    return res.status(400).json({
      data: null,
      message: "you already liked this post",
      success: false,
    });
  }

  await prisma.like.create({
    data: {
      postId,
      userId: req.user.id,
    },
  });

  return res.status(200).json({ message: "liked successfully", success: true });
};

export const removeLike = async (req: Request, res: Response) => {
  if (!req.user?.id) {
    return res
      .status(400)
      .json({ data: null, message: "user not found", success: false });
  }
  const { id: postId } = req.params;
  const like = await prisma.like.findUnique({
    where: {
      userId_postId: {
        postId: postId,
        userId: req.user.id,
      },
    },
  });
  if (!like) {
    return res
      .status(404)
      .json({ data: null, message: "like not found", success: false });
  }

  await prisma.like.delete({
    where: {
      userId_postId: {
        postId: postId,
        userId: req.user.id,
      },
    },
  });

  return res.status(200).json({
    message: "unliked",
    success: true,
  });
};
