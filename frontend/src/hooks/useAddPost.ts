import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { addPost } from "../lib/api";
import toast from "react-hot-toast";

const useAddPost = () => {
  const queryClient = useQueryClient();
  //   const navigate = useNavigate();

  const post = useMutation({
    mutationFn: addPost,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success(response.message);
     
    },
    onError: (error) => {
      console.log("ON ERROR", error);
      toast.error("Failed to create post");
    },
  });

  return {
    addPost: post.mutate,
    addingPost: post.isPending,
    postError: post.error,
  };
};

export default useAddPost;
