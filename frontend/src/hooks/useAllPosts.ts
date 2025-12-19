import { useQuery } from "@tanstack/react-query";
import { getAllpost } from "@/lib/postApi";

const useAllPosts = ()=>{
    const {data , isPending , error}  = useQuery({
        queryKey :["posts"],
        queryFn : getAllpost
    });
    return {postsData : data , isPending , error}
}

export default useAllPosts ;