import { useQuery } from "@tanstack/react-query";
import { getRecommendedUsers } from "@/lib/api";

const useGetrecommendedUsers = () => {
  const {
    data: recommendedUsers,
    isPending: gettingRecommendeUsers,
    error: recommendedUserError,
  } = useQuery({
    queryKey: ["recommended-users"],
    queryFn: getRecommendedUsers,
  });

  return { recommendedUsers, gettingRecommendeUsers, recommendedUserError };
};

export default useGetrecommendedUsers;
