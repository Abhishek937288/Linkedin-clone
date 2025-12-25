import { useQuery } from "@tanstack/react-query";
import { getRecommendedUsers } from "@/lib/api";

const useGetrecommendedUsers = () => {
  const {
    data: data,
    isPending: gettingRecommendeUsers,
    error: recommendedUserError,
  } = useQuery({
    queryKey: ["recommended-users"],
    queryFn: getRecommendedUsers,
  });

  return { recommendedUsers : data?.data, gettingRecommendeUsers, recommendedUserError };
};

export default useGetrecommendedUsers;
