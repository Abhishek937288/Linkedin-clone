import { Rocket } from "lucide-react";
import { Users } from "lucide-react";
import { TvMinimalPlay } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { Puzzle } from "lucide-react";
import { Laptop } from "lucide-react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const AuthNav = () => {
     const navigate = useNavigate();
  return (
    <header className="container flex flex-col md:flex-row items-center justify-between px-3">
      <div className="mb-3 md:mb-0">
        <img src={assets.lilogo} alt="Logo" className="w-20 md:w-28" />
      </div>

      <div className="w-full md:w-[60%] flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
        <div className="flex flex-wrap md:flex-row gap-4 md:gap-6 justify-center md:justify-start">
          <div className="flex flex-col items-center">
            <Rocket className="w-6 h-6 text-gray-700" />
            <p className="text-xs md:text-sm text-gray-700">Top Content</p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-6 h-6 text-gray-700" />
            <p className="text-xs md:text-sm text-gray-700">People</p>
          </div>
          <div className="flex flex-col items-center">
            <TvMinimalPlay className="w-6 h-6 text-gray-700" />
            <p className="text-xs md:text-sm text-gray-700">Learning</p>
          </div>
          <div className="flex flex-col items-center">
            <BriefcaseBusiness className="w-6 h-6 text-gray-700" />
            <p className="text-xs md:text-sm text-gray-700">Jobs</p>
          </div>
          <div className="flex flex-col items-center">
            <Puzzle className="w-6 h-6 text-gray-700" />
            <p className="text-xs md:text-sm text-gray-700">Games</p>
          </div>
          <div className="flex flex-col items-center">
            <Laptop className="w-6 h-6 text-gray-700" />
            <p className="text-xs md:text-sm text-gray-700">Get the job</p>
          </div>
        </div>

        <div className="flex gap-3 justify-center md:justify-end">
          <button className="border border-blue-600 rounded-3xl px-4 py-2 text-blue-700 font-semibold text-sm md:text-base">
            Join now
          </button>
          <button className="border border-blue-600 rounded-3xl px-4 py-2 text-white bg-blue-700 font-semibold text-sm md:text-base cursor-pointer" onClick={()=>{navigate("/signin")}}>
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
};

export default AuthNav;
