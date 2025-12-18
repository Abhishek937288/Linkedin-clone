import { create } from "zustand";

interface AuthUser {
  id: string;
  name: string | null;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  backgroundImg?: string | null; // added
  headline?:string | null ;
  bio?: string | null;            // added
  location?: string | null;       // added
  company?: string | null;        // added
  designation?: string | null;    // added
  experience?: number | null;     // added
  skills?: string[];              // added
  createdAt: Date;
  updatedAt: Date;
  friends?: string[];             // optional, since API has it
}


interface AuthStore {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

export const userAuthstore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
