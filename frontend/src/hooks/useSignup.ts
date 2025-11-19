import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../lib/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useSignup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const signupUser = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Signup successfull")
    },
    onError : (error)=>{
      toast.error(error.message);
    }
  });
  return {
    isPending: signupUser.isPending,
    error: signupUser.error,
    signupMutation: signupUser.mutate,
  };
};

export default useSignup;
