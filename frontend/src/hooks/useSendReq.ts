import { sendFriendReq } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useSendReq = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const data = useMutation({
    mutationFn: sendFriendReq,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["recommended-users"] });
      queryClient.invalidateQueries({ queryKey: ["sent-requests"] });
      toast.success(response.message);
      navigate("/network");
    },
    onError: (error) => {
      console.log("ON ERROR", error);
      toast.error("Failed to create post");
    },
  });
  return { sendReq: data.mutate, reqPending: data.isPending };
};

export default useSendReq;
