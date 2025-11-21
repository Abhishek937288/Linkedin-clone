import { Request, Response } from "express";
import { z } from "zod";

import { PrismaClient } from "../../generated/prisma/index.js";
import { postSchema } from "../validations/postsValidation.js";

const prisma = new PrismaClient();

// to create post
export const createPost = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const result = postSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(401).json({
      data: null,
      message: z.treeifyError(result.error),
      success: false,
    });
  }

  const { content, image, title, video } = result.data;

  const newPost = await prisma.post.create({
    data: {
      content,
      image: Array.isArray(image) ? image : [image],
      title,
      ...(video !== undefined && { video }),

      author: {
        connect: { id: req.user.id },
      },
    },
  });

  return res.status(201).json({
    data: newPost,
    message: "post created succesfully",
    success: true,
  });
};

// to get all posts

export const getAllPost = async (req: Request, res: Response) => {
  try {
    const allPost = await prisma.post.findMany({
      include: {
        author: true,
        comments: true,
        likes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({
      data: allPost,
      message: "got all post sucessfully",
      success: true,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return res.status(401).json({
      data: null,
      message,
      success: false,
    });
  }
};

export const updatePost =  (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`nedd to add ${id}`);
};
