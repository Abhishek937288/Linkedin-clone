import { assets } from "@/assets/assets";
import UserFriends from "@/components/custom/UserFriends";
import useUserFriends from "@/hooks/useGetFriends";
import useSentReqs from "@/hooks/useGetSentReqs";
import { userAuthstore } from "@/store/authStore";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { Friend, ReceivedRequest, SentRequest } from "@/types/networkType";
import useGetrecommendedUsers from "@/hooks/useGetRecommendedUsers";
import RecommendedUsers from "@/components/custom/RecommendedUsers";
import RequestSent from "@/components/custom/RequestSent";
import useRecievedReqs from "@/hooks/useReceivedReqeust";
import RequestRecieved from "@/components/custom/RequestRecieved";
const Networkpage = () => {
  const { user } = userAuthstore();
  const { sentRequests } = useSentReqs();
  const { userFriends } = useUserFriends();
  const { recommendedUsers } = useGetrecommendedUsers();
  const { receivedReqs } = useRecievedReqs();

  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-gray-100 min-h-[calc(100vh-64px)] pb-5 sm:px-5 md:px-10  ">
      <div className=" md:grid grid-cols-6  pt-5 mx-3">
        <div className="col-span-2 sm:px-5  flex items-center flex-col gap-2  max-sm:mx-2">
          <div
            className="bg-white pt-3 pb-2  flex flex-col gap-2 
           rounded-lg shadow-2xl px-5 md:w-[80%] "
          >
            <h4 className="font-semibold text-lg">Network overview</h4>

            <ul className="flex flex-col gap-2 ">
              <div className="flex  justify-around">
                <div className=" flex items-center flex-col">
                  <p className="text-lg font-semibold"> 0</p>
                  <p className="text-sm">Invites sent</p>
                </div>
                <div className=" flex items-center flex-col">
                  <p className="text-lg font-semibold">
                    {" "}
                    {user?.friends?.length}
                  </p>
                  <p className="text-sm">connections</p>
                </div>
                <div className=" flex items-center flex-col">
                  <p className="text-lg font-semibold">
                    {sentRequests ? sentRequests?.length : 1}
                  </p>
                  <p className="text-sm">Invites sent</p>
                </div>
              </div>
              {!expanded && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="cursor-pointer bg-gray-100 rounded-md w-25 px-1 py-1 text-sm opacity-80 flex  items-center gap-1"
                >
                  show more <ChevronDown size={15} />{" "}
                </button>
              )}

              {expanded && (
                <ul className="flex flex-col gap-2">
                  <li className="text-md font-semibold opacity-90 hover:bg-gray-200 cursor-pointer px-3 max-sm:text-center max-sm:text-sm py-2 ">
                    <div className="flex justify-between ">
                      <p>Groups</p> <p className="opacity-80">0</p>
                    </div>
                  </li>
                  <li className="text-md font-semibold opacity-90 hover:bg-gray-200 cursor-pointer px-3 max-sm:text-center max-sm:text-sm py-2 ">
                    <div className="flex justify-between ">
                      <p>Events</p> <p className="opacity-80">0</p>
                    </div>
                  </li>
                  <li className="text-md font-semibold opacity-90 hover:bg-gray-200 cursor-pointer px-3 max-sm:text-center max-sm:text-sm py-2 ">
                    <div className="flex justify-between ">
                      <p>Pages</p> <p className="opacity-80">0</p>
                    </div>
                  </li>
                  <li className="text-md font-semibold opacity-90 hover:bg-gray-200 cursor-pointer px-3 max-sm:text-center max-sm:text-sm py-2 ">
                    <div className="flex justify-between ">
                      <p>Newsletters</p> <p className="opacity-80">0</p>
                    </div>
                  </li>
                </ul>
              )}
              {expanded && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="cursor-pointer bg-gray-100 rounded-md w-25 px-1 py-1 text-sm opacity-80 flex  items-center gap-1"
                >
                  show less <ChevronUp size={15} />
                </button>
              )}
            </ul>
          </div>
          <div className="flex  items-center flex-col gap-3 sm:sticky top-20 px-5">
            <div className="flex flex-wrap gap-2 pt-2 items-center justify-center">
              {" "}
              <a
                href=""
                className="text-xs hover:text-blue-600 hover:underline opacity-80"
              >
                About
              </a>
              <a
                href=""
                className="text-xs hover:text-blue-600 hover:underline opacity-80"
              >
                {" "}
                Accessblity
              </a>
              <a
                href=""
                className="text-xs hover:text-blue-600 hover:underline opacity-80"
              >
                Help center
              </a>
              <a
                href=""
                className="text-xs hover:text-blue-600 hover:underline opacity-80"
              >
                privacy & Terms
              </a>
              <a
                href=""
                className="text-xs hover:text-blue-600 hover:underline opacity-80"
              >
                Ad choise
              </a>
              <a
                href=""
                className="text-xs hover:text-blue-600 hover:underline opacity-80"
              >
                Advertising
              </a>
              <a
                href=""
                className="text-xs hover:text-blue-600 hover:underline opacity-80"
              >
                Business services
              </a>
              <a
                href=""
                className="text-xs hover:text-blue-600 hover:underline opacity-80"
              >
                Get linkedin app
              </a>
              <a
                href=""
                className="text-xs hover:text-blue-600 hover:underline opacity-80"
              >
                more
              </a>
            </div>

            <div className="flex text-center gap-2 pb-5 ">
              <img src={assets.lilogo} alt="" className="h-5" />
              <p className="text-sm">Linkedin Coroporation @ 2025</p>
            </div>
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-2  sm:px-3">
          <div className="">
            <h4 className="font-semibold text-lg mb-3">Friends</h4>
            <div className="flex flex-row flex-wrap gap-2">
              {userFriends?.map((friend: Friend) => {
                return <UserFriends key={friend.id} friendData={friend} />;
              })}
            </div>
          </div>
          <div className="">
            <div className="">
              <h4 className="font-semibold text-lg mb-3">Recommended users</h4>
              <div className="flex flex-row flex-wrap gap-2">
                {recommendedUsers?.map((friend: Friend) => {
                  return (
                    <RecommendedUsers key={friend.id} friendData={friend} />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="">
            <div className="">
              <h4 className="font-semibold text-lg mb-3">Sent Requests</h4>
              <div className="flex flex-row flex-wrap gap-2">
                {sentRequests?.length < 0 && (
                  <div>
                    <h4 className=" text-sm opacity-80 font-semibold text-center">
                      No Requset sent till now...{" "}
                    </h4>
                  </div>
                )}
                {sentRequests?.map((friend: SentRequest) => {
                  return <RequestSent key={friend.id} friendData={friend} />;
                })}
              </div>
            </div>
          </div>
          <div className="">
            <h4 className="font-semibold text-lg mb-3"> Requests recieved</h4>
            <div className="flex flex-row flex-wrap gap-2">
              {receivedReqs?.length === 0 && (
                <div>
                  <h4 className="text-sm opacity-80 font-semibold text-center">
                    No Request received till now...
                  </h4>
                </div>
              )}
              {receivedReqs?.map((friend: ReceivedRequest) => {
                return <RequestRecieved key={friend.id} friendData={friend} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Networkpage;
