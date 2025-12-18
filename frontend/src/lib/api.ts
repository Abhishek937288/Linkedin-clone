import axios from "axios";
import { authClient } from "../lib/authClient";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

interface SignIn {
  email: string;
  password: string;
}

interface UpdateUserData {
  name: string;
  headline?: string;
  bio?: string;
  company?: string;
  designation?: string;
  experience?: number;
  location?: string;
  image?: string;
  backgroundImg?: string;
  skills?: string[];
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
  if (res.data?.token) {
    localStorage.setItem("authToken", res.data.token);
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
  if (res.data?.token) {
    localStorage.setItem("authToken", res.data.token);
  }

  return res.data;
};

// export const getUserData = async () => {
//   const { data, error } = await authClient.getSession();
//   console.log("data from :", data);

//   if (error) return null;
//   if (!data) return null;

//   return data.user;
// };

export const getUserData = async () => {
  const res = await axios.get(`${backendUrl}/api/user`, {
    withCredentials: true,
  });
  const data = res.data.data;
  return data;
};

export const updateUserData = async (data: UpdateUserData) => {
  const res = await axios.put(`${backendUrl}/api/user/updateuser`, data, {
    withCredentials: true,
  });
  const updateuser = res.data;
  return updateuser;
};
