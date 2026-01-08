import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "../../lib/prisma.js";
import { commentSchema } from "../validations/commentValidation.js";


export const addComment = async (req: Request, res: Response) => {
  if (!req.user?.id || !req.user.name) {
    return res
      .status(400)
      .json({ data: null, message: "username not found", success: false });
  }

  const { id } = req.params;
  const result = commentSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      data: null,
      message: z.treeifyError(result.error),
      success: null,
    });
  }
  const { text } = result.data;

  await prisma.comment.create({
    data: {
      postId: id,
      text,
      userId: req.user.id,
    },
  });

  return res.status(200).json({ message: "comment added", success: true });
};

export const deleteComment = async (req: Request, res: Response) => {
  if (!req.user) {
    return res
      .status(400)
      .json({ data: null, message: "unauthorised", success: false });
  }
  const { id } = req.params; // comment id
  const comment = await prisma.comment.findUnique({
    where: { id: id },
  });

  if (!comment) {
    return res
      .status(401)
      .json({ data: null, messagge: "comment not found", success: false });
  }
  if (req.user.id !== comment.userId) {
    return res.status(401).json({
      data: null,
      messagge: "you are not allowed to delete the comment",
      success: false,
    });
  }
  await prisma.comment.delete({
    where: { id: id },
  });

  return res.status(200).json({
    message: "comment deleted successfully",
    success: true,
  });
};
