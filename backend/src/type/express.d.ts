import "express";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
    interface User {
      email: string;
      id: string;
      image?: null | string;
      name?: null | string;
    }
  }
}
