import { useQuery } from "@tanstack/react-query";
import { getReceivedReqs } from "@/lib/api";

const useRecievedReqs = () => {
  const {
    data: data,
    isPending: fetchingReceivedReqs,
    error: receivedReqError,
  } = useQuery({
    queryKey: ["received-requests"],
    queryFn: getReceivedReqs,
  });
  return { receivedReqs: data?.data, fetchingReceivedReqs, receivedReqError };
};

export default useRecievedReqs;
