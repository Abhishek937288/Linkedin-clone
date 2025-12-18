import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../lib/api";

import toast from "react-hot-toast";

const useUserUpdate = () => {

  const queryClient = useQueryClient();
  const updatedUser = useMutation({
    mutationFn: updateUserData,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {
    pending: updatedUser.isPending,
    error: updatedUser.error,
    updateUser: updatedUser.mutate,
  };
};

export default useUserUpdate;
