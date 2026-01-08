import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "../../lib/prisma.js";
import { postSchema } from "../validations/postsValidation.js";

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
        author: {
          select: {
            id: true,
            image: true,
            name: true,
          },
        },
        comments: {
          select: {
            createdAt: true,
            id: true,

            text: true,
            user: { select: { id: true, image: true, name: true } },
            userId: true,
          },
        },
        likes: {
          select: {
            id: true,
            userId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      data: allPost,
      message: "got all post successfully",
      success: true,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return res.status(500).json({
      data: null,
      message,
      success: false,
    });
  }
};

// to get post

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    include: {
      author: true,
      comments: {
        include: {
          user: true,
        },
      },
      likes: {
        include: {
          user: true,
        },
      },
    },
    where: { id: id },
  });
  if (!post) {
    return res
      .status(400)
      .json({ data: null, message: "post not found", success: false });
  }

  return res
    .status(200)
    .json({ data: post, message: "post found successfully", success: true });
};

// to update the posts

export const updatePost = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { id } = req.params; // post id

  // to find the post data including author id
  const post = await prisma.post.findUnique({
    include: {
      author: {
        select: { id: true },
      },
    },
    where: { id: id },
  });

  if (!post) {
    return res
      .status(404)
      .json({ data: null, message: "post not found", success: false });
  }

  // to check user author of the post

  if (post.authorId !== req.user.id) {
    return res.status(403).json({
      data: null,
      message: "user is not authorised to edit post",
      success: false,
    });
  }

  const result = postSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      data: null,
      message: z.treeifyError(result.error),
      success: false,
    });
  }

  const { content, image, title, video } = result.data;

  const updatePost = await prisma.post.update({
    data: {
      content,
      image: Array.isArray(image) ? image : [image],
      title,
      ...(video !== undefined && { video }),
    },
    where: { id: id },
  });
  return res.status(200).json({
    data: updatePost,
    message: "post updated successfully",
    success: true,
  });
};

// to delete post
export const deletePost = async (req: Request, res: Response) => {
  if (!req.user) {
    return res
      .status(400)
      .json({ data: null, message: "unauthorised", success: false });
  }
  const { id } = req.params;

  const post = await prisma.post.findUnique({
    include: {
      author: {
        select: { id: true },
      },
    },
    where: { id: id },
  });

  if (!post) {
    return res
      .status(404)
      .json({ data: null, message: "post not found", success: false });
  }

  if (post.authorId !== req.user.id) {
    return res.status(403).json({
      data: null,
      message: "user is not authorised to delete post",
      success: false,
    });
  }

  // need to delete likes and comments on this post
  await prisma.like.deleteMany({
    where: { postId: id },
  });

  await prisma.comment.deleteMany({
    where: { postId: id },
  });

  const deletePost = await prisma.post.delete({
    where: { id: id },
  });

  return res.status(200).json({
    data: deletePost,
    message: "post deleted successfully",
    success: true,
  });
};
