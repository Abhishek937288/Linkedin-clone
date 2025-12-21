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
    { text: comment },
    { withCredentials: true }
  );
  if (!res.data.success) {
    const errorMsg =
      res.data.message?.properties?.text?.errors?.[0] || "Something went wrong";
    throw new Error(errorMsg);
  }

  return res.data;
};

export const addLike = async (id: string) => {
  const res = await axios.post(
    `${backendUrl}/api/post/like/${id}`,
    {}, // no body needed here
    {
      withCredentials: true,
    }
  );
  return res.data;
};
;

export const removeLike = async (id: string) => {
  const res = await axios.delete(`${backendUrl}/api/post/like/${id}`, {
    withCredentials: true,
  });
  const data = res.data;
  return data;
};
