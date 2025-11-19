import { create } from "zustand";

interface AuthUser {
  id: string;
  name: string | null;
  email: string;
  emailVerified: boolean;
   image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthStore {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

export const userAuthstore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
