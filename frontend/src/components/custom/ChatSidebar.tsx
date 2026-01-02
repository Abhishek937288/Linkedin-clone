import useUserFriends from "@/hooks/useGetFriends";
import type { Friend } from "@/types/networkType";
import { useNavigate } from "react-router-dom";

const ChatSidebar = () => {
  const { userFriends } = useUserFriends();
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-gray-100  px-5">
      <div className="sticky top-15 z-10 bg-gray-100 pt-5 h-15">
        {" "}
        <h4 className="font-semibold text-xl">Friends</h4>
      </div>
      <div className="flex-1 flex flex-col gap-3 mt-5  ">
        {userFriends?.map((frnd: Friend) => (
          <div onClick={()=>navigate(`/message/${frnd.id}`)} className="flex gap-5 items-center text-md font-semibold opacity-90 hover:bg-gray-300 cursor-pointer px-3 max-sm:text-center max-sm:text-sm py-2 ">
            <img src={frnd.image} className="w-10 h-10 rounded-full" alt="" />
            <div className="flex flex-col">
              <p>{frnd.name}</p>
              <p className="text-sm opacity-80">{frnd.headline}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
