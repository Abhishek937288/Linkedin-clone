/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Socket } from "socket.io";

import { prisma } from "../lib/prisma.js";

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

export const socketAuthMiddleware = async (
  socket: AuthenticatedSocket,
  next: (err?: Error) => void
): Promise<void> => {
  const token = socket.handshake.auth.token as string | undefined;

  if (!token) {
    console.log("No token provided");
    next(new Error("No token provided"));
    return;
  }

  try {
    const session = await prisma.session.findUnique({
      // we store the token in session model
      include: { user: true },
      where: { token },
    });

    if (!session) {
      console.log("Session not found for token:", token);
      next(new Error("No token provided"));
      return;
    }

    if (session.expiresAt < new Date()) {
      console.log("Session expired:", session.expiresAt);
      next(new Error("No token provided"));
      return;
    }

    socket.userId = session.user.id;

    next();
  } catch (err) {
    console.error("Auth error:", err);
    next(new Error("No token provided"));
    return;
  }
};
