import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

type AddCommentVariables = { comment: string; id: string };

export const getAllpost = async () => {
  const res = await axios.get(`${backendUrl}/api/post`, {
    withCredentials: true,
  });
  const data = res.data;
  return data;
};

export const deleteComment = async (id: string) => {
  const res = await axios.delete(`${backendUrl}/api/comment/${id}`, {
    withCredentials: true,
  });
  const data = res.data;
  return data;
};

export const addComment = async ({ comment, id }: AddCommentVariables) => {
  const res = await axios.post(
    `${backendUrl}/api/comment/${id}`,
    { text :comment },
    { withCredentials: true }
  );
  return res.data;
};
