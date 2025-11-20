import { signIn } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useSignin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const signInUser = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/");
      toast.success("SignIn successful");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return {
    isPending: signInUser.isPending,
    error: signInUser.error,
    signupMutation: signInUser.mutate,
  };
};

export default useSignin;
