import { assets } from "@/assets/assets";
import type { SentRequestProp } from "@/types/networkType";

import { useNavigate } from "react-router-dom";

const RequestSent = ({ friendData }: SentRequestProp) => {
  const navigate = useNavigate();
  return (
    <div className="border border-gray-200 bg-white pb-2  rounded-2xl w-full sm:w-45 ">
      <div className="relative  ">
        <img
          src={
            friendData?.recipient?.backgroundImg ||
            "https://images.unsplash.com/photo-1521791136064-7986c2920216"
          }
          className="h-15 w-full object-cover rounded-lg"
        />

        <img
          src={
            friendData?.recipient?.image
              ? friendData?.recipient?.image
              : assets.li
          }
          className="w-10 h-10 rounded-full border-gray-50 absolute left-4 -bottom-5"
        />
      </div>
      <div className="flex flex-col items-center gap-2 pt-2 px-2  ">
        <h4 className="text-sm font-semibold mt-3 cursor-pointer" onClick={() => {
            navigate(`/checkprofile/${friendData?.recipient?.id}`);
          }}>
          {friendData?.recipient?.name
            ? friendData?.recipient?.name.charAt(0).toUpperCase() +
              friendData?.recipient?.name.slice(1)
            : ""}
        </h4>

        <button
          className="px-3  rounded-lg text-white flex items-center gap-1 border border-dotted bg-blue-400 text-center cursor-pointer  text-sm hover:text-md "
          onClick={() => {
            navigate("/network");
          }}
          disabled={true}
        >
          Reqeust sent
        </button>
      </div>
    </div>
  );
};

export default RequestSent;
