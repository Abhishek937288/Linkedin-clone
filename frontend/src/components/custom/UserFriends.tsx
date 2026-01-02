import { assets } from "@/assets/assets";

import type { UserFriendsProps } from "@/types/networkType";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserFriends = ({ friendData }: UserFriendsProps) => {
  const navigate = useNavigate();
  return (
    <div className="border border-gray-200 bg-white pb-2  rounded-2xl w-full sm:w-45 ">
      <div className="relative  ">
        <img
          src={
            friendData?.backgroundImg ||
            "https://images.unsplash.com/photo-1521791136064-7986c2920216"
          }
          className="h-24 w-full object-cover rounded-lg"
        />

        <img
          src={friendData?.image ? friendData.image : assets.li}
          className="w-20 h-20 rounded-full border-gray-50 absolute left-4 -bottom-10"
        />
      </div>
      <div className="flex flex-col items-center gap-3 pt-5 px-2  ">
        <h4
          className="text-lg font-semibold mt-3 hover:underline  cursor-pointer"
          onClick={() => {
            navigate(`/checkprofile/${friendData.id}`);
          }}
        >
          {friendData?.name
            ? friendData.name.charAt(0).toUpperCase() + friendData.name.slice(1)
            : ""}
        </h4>
        <p className="text-sm">
          {friendData?.headline ? friendData.headline : "Hey i m new user"}
        </p>

        <button
          className="px-3  rounded-lg text-white flex items-center gap-1 border border-dotted bg-blue-600 text-center cursor-pointer hover:bg-blue-700 text-sm hover:text-md "
          onClick={() => {
            navigate(`/message/${friendData.id}`);
          }}
        >
          <Plus size={10} /> Message
        </button>
      </div>
    </div>
  );
};

export default UserFriends;
