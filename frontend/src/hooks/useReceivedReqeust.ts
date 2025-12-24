import { useQuery } from "@tanstack/react-query";
import { getReceivedReqs } from "@/lib/api";

const useRecievedReqs = () => {
  const {
    data: receivedReqs,
    isPending: fetchingReceivedReqs,
    error: receivedReqError,
  } = useQuery({
    queryKey: ["received-requests"],
    queryFn: getReceivedReqs,
  });
  return { receivedReqs, fetchingReceivedReqs, receivedReqError };
};

export default useRecievedReqs;
