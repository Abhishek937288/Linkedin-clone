import { createAuthClient } from "better-auth/client";
const backendUrl = import.meta.env.VITE_BACKEND_URL;


export const authClient = createAuthClient({
  baseURL: `${backendUrl}/api/auth`,
  fetchOptions: {
    credentials: "include",
  },
});


export const { signIn, signUp, signOut, useSession } = authClient;