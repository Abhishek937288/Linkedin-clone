import { assets } from "@/assets/assets";
import Postcard from "@/components/custom/Postcard";
import useSendReq from "@/hooks/useSendReq";
import { getProfileData } from "@/lib/api";
import { userAuthstore } from "@/store/authStore";
import type { SentReqData } from "@/types/networkType";

import type { Post } from "@/types/postType";
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const CheckProfilePage = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>();
  const id = params.id!;

  const { user } = userAuthstore();
  const { sendReq } = useSendReq();

  const { data } = useQuery({
    queryKey: ["profileData", id],
    queryFn: () => getProfileData(id as string),
    enabled: !!id,
  });
  const postsData = data?.data.posts;
  const profileInfo = data?.data;
  console.log(profileInfo);
  const isFriend = profileInfo?.friends?.includes(user?.id) ?? false;
  const requestSent =
    profileInfo?.receivedRequests?.some(
      (req: SentReqData) => req.senderId === user?.id && req.recipientId === id
    ) ?? false;

  const requestRecieved =
    profileInfo?.sentRequests?.some(
      (req: SentReqData) => req.senderId === id && req.recipientId === user?.id
    ) ?? false; // here data should be changed bt it data type is same so used

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-64px)]  pb-5">
      <div className="grid grid-cols-1 h-full sm:grid-cols-5 gap-5 mx-2 sm:mx-10 mb-5 ">
        <div className="col-span-2  ">
          <div className="mt-5 flex flex-col   gap-2 mb-5 sm:sticky top-10 ">
            <div className="border pb-5   border-gray-200 bg-white   rounded-2xl ">
              <div className="relative ">
                <img
                  src={
                    profileInfo?.backgroundImg ||
                    "https://images.unsplash.com/photo-1521791136064-7986c2920216"
                  }
                  className="h-24 sm:h-33 w-full object-cover rounded-lg"
                />

                <img
                  src={profileInfo?.image ? profileInfo.image : assets.li}
                  className="w-15 sm:w-20 h-15  sm:h-20 rounded-full border-gray-50 absolute left-4 -bottom-10"
                />
              </div>
              <div className="flex flex-col mt-5 gap-1 pt-5 px-5 ">
                <h4 className="text-xl font-semibold">
                  {profileInfo?.name
                    ? profileInfo.name.charAt(0).toUpperCase() +
                      profileInfo.name.slice(1)
                    : ""}
                </h4>
                <p className="text-md ">
                  {profileInfo?.headline
                    ? profileInfo.headline
                    : "mern stack developer testing my skills while doing project"}
                </p>
                <span className="text-md flex items-center">
                  <MapPin color="#39d57d" size={20} />
                  {profileInfo?.location ? profileInfo.location : "unknown"}
                </span>
                <p className="text-md text-blue-600">
                  connections {profileInfo?.friends?.length}
                </p>
                <div className="flex flex-col items-center  sm:flex-row gap-2">
                  {isFriend && (
                    <button className="sm:px-3 py-1 max-sm:w-20  cursor-pointer rounded-2xl bg-blue-600 text-white max-sm:text-sm "onClick={() => {
            navigate(`/message/${id}`);
          }}>
                      message
                    </button>
                  )}

                  {requestSent && (
                    <button
                      className="sm:px-3 py-1 max-sm:w-20  cursor-pointer rounded-2xl bg-blue-400 text-white max-sm:text-sm "
                      disabled={true}
                    >
                      Request sent
                    </button>
                  )}

                  {requestRecieved && (
                    <button
                      className="sm:px-3 py-1 max-sm:w-20  cursor-pointer rounded-2xl bg-blue-400 text-white max-sm:text-sm "
                      disabled={true}
                    >
                      received
                    </button>
                  )}

                  {!isFriend && !requestRecieved && !requestSent && (
                    <button
                      className="sm:px-3 py-1 max-sm:w-20 cursor-pointer rounded-2xl bg-blue-600 text-white max-sm:text-sm"
                      onClick={() => {
                        sendReq(id);
                      }}
                    >
                      Add Friend
                    </button>
                  )}

                  <button className="sm:px-3 py-1 max-sm:w-35 max-sm:px-1 font-semibold  cursor-pointer rounded-2xl bg-white text-blue-600 border border-blue-600 max-sm:text-sm">
                    Add profile section
                  </button>
                </div>
              </div>
            </div>
            <div className="border pb-5 pt-3  px-3  border-gray-200 bg-white  rounded-2xl ">
              <h4 className="max-sm:text-sm font-bold">About</h4>
              <div className="flex flex-col gap-2">
                <p className="text-center font-bold max-sm:text-lg text-xl">
                  {" "}
                  {profileInfo?.name}
                </p>
                <p className="text-center font-semibold opacity-90 max-sm:text-lg text-xl">
                  {" "}
                  {profileInfo?.headline}
                </p>
                <p className="text-md max-sm:text-sm opacity-80">
                  {" "}
                  {profileInfo?.bio}
                </p>
              </div>
            </div>
            <div className="border pb-5 pt-3  px-3  border-gray-200 bg-white rounded-2xl ">
              <h4 className="max-sm:text-sm font-bold">Expereince & skills</h4>
              <div className="flex flex-col gap-2">
                <h5 className="text-center font-lg max-sm:text-lg text-xl">
                  Experience
                </h5>
                <div className="flex gap-2 items-center ">
                  <p className="max-sm:text-sm font-semibold text-lg">
                    {" "}
                    company :
                  </p>
                  <p className="text-lg max-sm:text-sm">
                    {" "}
                    {profileInfo?.company}
                  </p>
                </div>
                <div className="flex gap-2 items-center ">
                  <p className="max-sm:text-sm font-semibold text-lg">
                    {" "}
                    Desgnation :
                  </p>
                  <p className="text-lg max-sm:text-sm">
                    {" "}
                    {profileInfo?.designation}
                  </p>
                </div>
                <div className="flex gap-2 items-center ">
                  <p className="max-sm:text-sm font-semibold text-lg">
                    {" "}
                    Experience :
                  </p>
                  <p className="text-lg max-sm:text-sm">
                    {" "}
                    {profileInfo?.experience}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="text-center font-lg max-sm:text-lg text-xl">
                  Skills
                </h5>
                <div className="">
                  {profileInfo?.skills?.map((skill: string, idx: number) => (
                    <p
                      key={idx}
                      className="text-lg max-sm:text-sm  font-semibold"
                    >
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex flex-col gap-3 mt-3">
            {!postsData || postsData.length === 0 ? (
              <div>
                <h4 className="text-sm opacity-80 font-semibold text-center">
                  No post
                </h4>
              </div>
            ) : (
              postsData.map((post: Post) => (
                <Postcard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckProfilePage;
