import { Request, Response } from "express";
import {z} from "zod"

import { Prisma, PrismaClient } from "../../generated/prisma/index.js";
import { userSchema } from "../validations/userValidation.js";

const prisma = new PrismaClient();

export const getUserData = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  });
  if (!user) {
    return res
      .status(400)
      .json({ data: null, message: "user not found ", success: false });
  }
  return res
    .status(201)
    .json({ data: user, message: "user found succesfully", success: true });
};

export const updateUser = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const id = req.user.id;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user)
    return res
      .status(400)
      .json({ data: null, message: "user not found", success: false });

  const result = userSchema.safeParse(req.body);
  if (!result.success)
    return res.status(400).json({
      data: null,
      message: z.treeifyError(result.error),
      success: false,
    });

  const {
    backgroundImg,
    bio,
    company,
    designation,
    experience,
    headline,
    image,
    location,
    name,
    skills,
  } = result.data;

  const data: Prisma.UserUpdateInput = {}; //

  if (backgroundImg !== undefined) data.backgroundImg = backgroundImg;
  if (bio !== undefined) data.bio = bio;
  if (company !== undefined) data.company = company;
  if (designation !== undefined) data.designation = designation;
  if (experience !== undefined) data.experience = experience;
  if(headline !== undefined)data.headline = headline;
  if (image !== undefined) data.image = image;
  if (location !== undefined) data.location = location;
  data.name = name;

  if (skills !== undefined) {
    data.skills = Array.isArray(skills)
      ? skills.filter((s): s is string => Boolean(s))
      : [skills];
  }

  const updatedUser = await prisma.user.update({
    data,
    where: { id },
  });

  return res.status(200).json({ data:updatedUser,message:"user Updated succesfully", success: true });
};
