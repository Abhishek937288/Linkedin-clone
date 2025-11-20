import { authClient } from "../lib/authClient";

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

interface SignIn {
  email: string;
  password: string;
}

export const signUp = async (authForm: SignupForm) => {
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

export const signIn = async (authForm: SignIn) => {
  const res = await authClient.signIn.email({
    email: authForm.email,
    password: authForm.password,
  });
  if (res.error) {
    throw new Error(res.error.message);
  }
  return res.data;
};

export const getUserData = async () => {
  const { data, error } = await authClient.getSession();

  if (error) return null;
  if (!data) return null;

  return data.user;
};
