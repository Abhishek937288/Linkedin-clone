import { getUserFriends } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useUserFriends = () => {
  const {
    data: data,
    isPending: fetchingFriends,
    error: fetchingFriendsError,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return { userFriends :data?.data, fetchingFriends, fetchingFriendsError };
};

export default useUserFriends;
