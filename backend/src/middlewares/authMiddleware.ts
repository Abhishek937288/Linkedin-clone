import { NextFunction, Request, Response } from "express";

import { auth } from "../lib/auth.js";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headers = new Headers();

    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === "string") {
        headers.set(key, value);
      }
    }

    const session = await auth.api.getSession({
      headers,
    });

    if (!session?.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    req.user = session.user;
    next();
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
