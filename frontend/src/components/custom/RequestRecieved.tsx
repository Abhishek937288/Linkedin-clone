import { assets } from "@/assets/assets";
import type { RecievedRequestProp } from "@/types/networkType";
import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptReqs } from "@/lib/api";
import toast from "react-hot-toast";

const RequestRecieved = ({ friendData }: RecievedRequestProp) => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: acceptReqs,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["received-requests"] });
      toast.success(response.message);
    },
    onError: (error) => {
      console.log("ON ERROR", error);
      toast.error("Failed to accept request");
    },
  });
  return (
    <div className="border border-gray-200 bg-white pb-2  rounded-2xl w-full sm:w-45 ">
      <div className="relative  ">
        <img
          src={
            friendData?.sender?.backgroundImg ||
            "https://images.unsplash.com/photo-1521791136064-7986c2920216"
          }
          className="h-15 w-full object-cover rounded-lg"
        />

        <img
          src={
            friendData?.sender?.image ? friendData?.sender?.image : assets.li
          }
          className="w-10 h-10 rounded-full border-gray-50 absolute left-4 -bottom-5"
        />
      </div>
      <div className="flex flex-col items-center gap-2 pt-2 px-2  ">
        <h4 className="text-sm font-semibold mt-3">
          {friendData?.sender?.name
            ? friendData?.sender?.name.charAt(0).toUpperCase() +
              friendData?.sender?.name.slice(1)
            : ""}
        </h4>

        <button
          disabled={isPending}
          className="px-3  rounded-lg text-white flex items-center gap-1 border border-dotted bg-blue-600 text-center cursor-pointer hover:bg-blue-700 text-sm hover:text-md "
          onClick={() => {
            mutate(friendData.id);
          }}
        >
          <Plus size={15} />
          Accept
        </button>
      </div>
    </div>
  );
};

export default RequestRecieved;
