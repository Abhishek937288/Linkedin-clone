import { useQuery } from "@tanstack/react-query";
import { getSentReqs } from "@/lib/api";

const useSentReqs = () => {
  const {
    data,
    isPending: gettingSentReqs,
    error: sentReqsError,
  } = useQuery({
    queryKey: ["sent-requests"],
    queryFn: getSentReqs,
  });
  return { sentRequests: data?.data, gettingSentReqs, sentReqsError };
};

export default useSentReqs;
