import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/lib/api";
import toast from "react-hot-toast";

const useDeletePost = () => {
  const queryClient = useQueryClient();
  const deletedPost = useMutation({
    mutationFn: deletePost,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log(response);
      toast.success(response.message);
    },
    onError: (error) => {
      console.log("ON ERROR", error);
      toast.error("Failed to create post");
    },
  });

  return {
    deletePost: deletedPost.mutate,
    pendingDelete: deletedPost.isPending,
    deletePostError: deletedPost.error,
  };
};

export default useDeletePost;
