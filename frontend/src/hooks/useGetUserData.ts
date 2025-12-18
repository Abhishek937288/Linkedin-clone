import { getUserData } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const useGetUserData = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: getUserData,
  });

  return { userData: data, isPending, error };
};

export default useGetUserData;
