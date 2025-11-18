import { authClient } from "../lib/authClient";

interface AuthForm {
  name: string;
  email: string;
  password: string;
}

export const signUp = async (authForm: AuthForm) => {
  const res = await authClient.signUp.email({
    email: authForm.email,
    password: authForm.password,
    name: authForm.name,
  });
  if (res.error) {
    throw new Error(res.error.message);
  }
  return res.data;
};
