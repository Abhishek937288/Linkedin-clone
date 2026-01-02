import { assets } from "@/assets/assets";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  House,
  Users,
  BriefcaseBusiness,
  Bell,
  Search,
  ArrowDown,
  Grip,
  Compass,
  UsersRound,
  ChartColumnDecreasing,
  BanknoteArrowUp,
  HandPlatter,
  Goal,
  SquarePlay,
  Plus,
  X,
  BookCheck,
  Menu,
  ChevronDown,
  UserPen,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userAuthstore } from "@/store/authStore";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { user } = userAuthstore();
  return (
    <div className=" border-b border-gray-300 sticky top-0 bg-white z-10">
      <header className="max-w-7xl mx-auto flex max-sm:flex-row max-sm:items-center max-sm:gap-3 max-sm:justify-center flex-col md:flex-row items-center justify-between px-3 py-2  max-sm:h-16">
        <div className=" items-center md:mb-0 flex gap-2">
          <Link to={"/"}>
            <img src={assets.li} alt="Logo" className="w-8 md:w-10" />
          </Link>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type=" text"
              className="w-full border border-gray-400 rounded-xl pl-10 pr-4 py-1 focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="search"
            />
          </div>
        </div>

        <div className="w-full md:w-[60%] flex flex-wrap md:flex-nowrap items-center justify-between gap-4 max-sm:hidden">
          <div className="flex flex-wrap md:flex-row gap-4 md:gap-6 justify-center md:justify-start">
            <Link to={"/"} className="flex flex-col items-center">
              <House className="w-6 h-6 text-gray-700" />
              <p className="text-xs md:text-sm text-gray-700">Home</p>
            </Link>

            <Link to={"/network"} className="flex flex-col items-center">
              <Users className="w-6 h-6 text-gray-700" />
              <p className="text-xs md:text-sm text-gray-700">My network</p>
            </Link>

            <div className="flex flex-col items-center">
              <BriefcaseBusiness className="w-6 h-6 text-gray-700" />
              <p className="text-xs md:text-sm text-gray-700">Jobs</p>
            </div>

            <div className="flex flex-col items-center">
              <Bell className="w-6 h-6 text-gray-700" />
              <p className="text-xs md:text-sm text-gray-700">Notifications</p>
            </div>
            <div className="flex flex-col  items-center">
              <img
                src={user?.image ? user.image : assets.signin}
                className="rounded-full h-7 w-7"
                alt=""
              />
              <DropdownMenu
                open={profileDropdown}
                onOpenChange={setProfileDropdown}
              >
                <DropdownMenuTrigger className="flex justify-center items-center cursor-pointer">
                  <p className="opacity-80 text-xs cursor-pointer">me</p>
                  <ChevronDown size={15} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="h-120 w-65 max-sm:w-[90vw] bg-gray-50 max-sm:h-[65vh] max-sm:mx-5 border border-gray-200 shadow-xl rounded-xl sm:pt-5">
                  <div className="flex flex-col gap-4 ">
                    <div className="sm:hidden flex flex-row-reverse">
                      {" "}
                      <button
                        className="py-1 px-1 cursor-pointer rounded-full hover:bg-gray-200"
                        onClick={() => setProfileDropdown(false)}
                      >
                        <X />
                      </button>
                    </div>

                    {/** main div */}
                    <div className="flex flex-col gap-5 items-center  border-b  border-gray-200 ">
                      {/** upper div */}
                      <div className="grid grid-cols-4  gap-2 px-2">
                        <div className="col-span-1">
                          <img
                            src={user?.image ? user.image : assets.signin}
                            alt=""
                            className="rounded-full h-10 w-10"
                          />
                        </div>
                        <div className="col-span-3 grid gap-2 ">
                          <h4 className="text-lg font-semibold">
                            {user?.name
                              ? user.name.charAt(0).toUpperCase() +
                                user.name.slice(1)
                              : ""}
                          </h4>
                          <p className="text-sm opacity-80">
                            {user?.headline ? user.headline : "linkedIn user"}
                          </p>
                        </div>
                      </div>
                      <div className="">
                        {" "}
                        <button
                          className="px-18 py-1 rounded-xl border border-blue-500 text-sm cursor-pointer hover:bg-blue-100 hover:border-blue-800  hover:border-2 text-blue-500 mb-3"
                          onClick={() => navigate("/profile")}
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                    <div className="px-3 flex flex-col gap-2 border-b border-gray-200">
                      <p>Account</p>
                      <div className="flex gap-2">
                        {" "}
                        <img
                          src={assets.bussiness}
                          alt="Logo"
                          className="w-6 md:w-6"
                        />
                        <a className="text-sm opacity-80 cursor-pointer hover:border-b hover:border-blue-500">
                          Try premium for free
                        </a>
                      </div>
                      <ul className="mb-2">
                        <li>
                          <a
                            href=""
                            className="text-sm opacity-80 cursor-pointer hover:underline"
                          >
                            setting & privacy
                          </a>
                        </li>
                        <li>
                          <a
                            href=""
                            className="text-sm opacity-80 cursor-pointer hover:underline blue-500"
                          >
                            Help
                          </a>
                        </li>
                        <li>
                          <a
                            href=""
                            className="text-sm opacity-80 cursor-pointer hover:underline blue-500"
                          >
                            language
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-col  px-3 border-b border-gray-200">
                      <p>Manage</p>
                      <a
                        href=""
                        className="text-sm opacity-80 cursor-pointer hover:underline"
                      >
                        Post & Activity
                      </a>
                      <a
                        href=""
                        className="text-sm opacity-80 cursor-pointer hover:underline mb-2"
                      >
                        Job posting Account
                      </a>
                    </div>
                    <a href="" className="px-3">
                      Signout
                    </a>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex gap-5 justify-center md:justify-end">
            <div className="flex flex-col items-center justify-center">
              <Grip className="opacity-70" />
              <DropdownMenu>
                <div className="relative">
                  <DropdownMenuTrigger className="flex gap-1 items-center cursor-pointer  ">
                    <p className="text-xs opacity-80">For bussiness</p>
                    <ArrowDown className="size-3 cursor-pointer opacity-80" />
                  </DropdownMenuTrigger>
                </div>
                <DropdownMenuContent className="bg-white pt-5 mt-3  flex max-sm:flex-col w-[45vw] max-sm:w-[95vw] max-sm:mx-3 max-sm:px-5  h-[80vh] sm:justify-between sm:px-10 sm:absolute sm:right-5  border-gray-300 shadow-xl rounded-2xl">
                  <div className="sm:w-[50%] w-full flex flex-col gap-3  sm:border-r border-gray-200">
                    <h4 className="text-xl font-semibold">My Apps</h4>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-3 items-center">
                        <Compass size={35} color="#324ac3" />
                        <p className=" cursor-pointer text-sm font-semibold opacity-80 border border-transparent hover:border-b-blue-600">
                          Sell
                        </p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <UsersRound size={30} color="#324ac3" />
                        <p className=" cursor-pointer text-sm font-semibold opacity-80 border border-transparent hover:border-b-blue-600">
                          Groups
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-semibold opacity-80">Talent</p>
                      <div className="flex gap-3 items-center">
                        <ChartColumnDecreasing size={30} color="#324ac3" />
                        <p className=" cursor-pointer text-sm font-semibold opacity-80 border border-transparent hover:border-b-blue-600">
                          Talent Insights
                        </p>
                      </div>
                      <div className="flex gap-3 items-center">
                        <BanknoteArrowUp size={30} color="#324ac3" />
                        <p className=" cursor-pointer text-sm font-semibold opacity-80 border border-transparent hover:border-b-blue-600">
                          Hire with AI
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-semibold opacity-80">Sales</p>
                      <div className="flex gap-3 items-center">
                        <HandPlatter size={30} color="#324ac3" />
                        <p className=" cursor-pointer text-sm font-semibold opacity-80 border border-transparent hover:border-b-blue-600">
                          Services Marketplace
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-semibold opacity-80">
                        Marketing
                      </p>
                      <div className="flex gap-3 items-center">
                        <Goal size={30} color="#324ac3" />
                        <p className=" cursor-pointer text-sm font-semibold opacity-80 border border-transparent hover:border-b-blue-600">
                          Advertise
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-semibold opacity-80">
                        Learning
                      </p>
                      <div className="flex gap-3 items-center">
                        <SquarePlay size={30} color="#324ac3" />
                        <p className=" cursor-pointer text-sm font-semibold opacity-80 border border-transparent hover:border-b-blue-600">
                          Learning
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xl font-medium">
                      Explore more for business
                    </h4>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold ">Hire On LinkedIn</p>
                      <p className="text-xs cursor-pointer font-light border border-transparent hover:border-b-blue-600">
                        Find , attract and requirt Talent
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium ">Hire On LinkedIn</p>
                      <p className="text-xs cursor-pointer font-light border border-transparent hover:border-b-blue-600">
                        Find , attract and requirt Talent
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium ">
                        {" "}
                        Sales with Linkedin
                      </p>
                      <p className="text-xs cursor-pointer font-light border border-transparent hover:border-b-blue-600">
                        Unlock sales opportunties
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium ">
                        Port a Job for free
                      </p>
                      <p className="text-xs cursor-pointer font-light border border-transparent hover:border-b-blue-600">
                        Get qualified applicants quickly
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium ">
                        Advertise on Linkdin
                      </p>
                      <p className="text-xs cursor-pointer font-light border border-transparent hover:border-b-blue-600">
                        Acquire customers and grow your business
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium ">
                        Get started with premium
                      </p>
                      <p className="text-xs cursor-pointer font-light border border-transparent hover:border-b-blue-600">
                        Expand and leverage your network
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium ">Learn with Linkdin</p>
                      <p className="text-xs cursor-pointer font-light border border-transparent hover:border-b-blue-600">
                        Courses to develop your employees
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium ">Admin Center</p>
                      <p className="text-xs cursor-pointer font-light border border-transparent hover:border-b-blue-600">
                        Manage billing and account details
                      </p>
                    </div>
                    <div className="flex flex-col mb-5">
                      <span className="text-md font-semibold cursor-pointer ">
                        Create company page
                        <Plus />
                      </span>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-col  items-center justify-center">
              <img src={assets.bussiness} alt="Logo" className="w-6 md:w-6" />
              <DropdownMenu
                open={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
              >
                <div className="relative">
                  <DropdownMenuTrigger className="flex gap-1 items-center cursor-pointer border-none">
                    <p className="text-xs opacity-80">Try premium for 0</p>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-120 max-sm:w-[90vw]  max-sm:h-[90vh] h-90 sm:absolute right-80 bg-white rounded-2xl border border-gray-300 shadow-2xl max-sm:mx-3">
                    <div className="flex flex-row-reverse">
                      <button
                        className="py-2 px-2 cursor-pointer rounded-full hover:bg-gray-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="px-5 flex flex-col gap-2">
                      <h4 className="text-xl font-medium pb-2 ">
                        {user?.name
                          ? user.name.charAt(0).toUpperCase() +
                            user.name.slice(1)
                          : ""}
                        , close more deals{" "}
                      </h4>
                      <p className=" flex gap-2 text-md opacity-70">
                        <BookCheck color="#c4ae40" />
                        Engage leads with 50 monthly InMails
                      </p>
                      <p className=" flex gap-2 text-md opacity-70">
                        {" "}
                        <BookCheck color="#c4ae40" /> Identify key players in
                        target accounts
                      </p>
                      <p className=" flex gap-2 text-md opacity-70">
                        {" "}
                        <BookCheck color="#c4ae40" />
                        Find high-value leads with 50+ filters
                      </p>
                      <p className=" flex gap-2 text-md opacity-70">
                        <BookCheck color="#c4ae40" /> Get personalized lead
                        recommendations
                      </p>
                      <div className="flex flex-col gap-3">
                        <p className="  text-md opacity-90">
                          Millions of members use Premium
                        </p>
                        <button className="bg-amber-400 hover:bg-amber-500 cursor-pointer sm:w-70 w-[90%] py-2 text-center  font-semibold rounded-xl">
                          Try Sales Navigator for 0
                        </button>
                        <p className="text-sm opacity-70 ">
                          1 month free. Easy to cancel. No penalties or fees.
                        </p>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </div>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className="sm:hidden">
          <DropdownMenu>
            <div className="">
              <DropdownMenuTrigger className=" cursor-pointer  ">
                <Menu />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="top-3   relative mx-3 border-gray-200 rounded-2xl shadow-2xl">
              <div className="w-[80vw] h-[50vh] bg-white px-5 flex flex-col gap-3 pt-5 ">
                <Link to={"/"} className="flex gap-5 items-center">
                  <House className="w-6 h-6 text-gray-700" />
                  <p className="text-lg text-gray-700">Home</p>
                </Link>
                <Link to={"/network"} className="flex gap-5 items-center">
                  <Users className="w-6 h-6 text-gray-700" />
                  <p className="text-lg md:text-sm text-gray-700">My network</p>
                </Link>
                 <Link to={"/profile"} className="flex gap-5 items-center">
                  <UserPen  className="w-6 h-6 text-gray-700" />
                  <p className="text-lg md:text-sm text-gray-700">view profile</p>
                </Link>
                <div className="flex gap-5 items-center">
                  <BriefcaseBusiness className="w-6 h-6 text-gray-700" />
                  <p className="text-lg md:text-sm text-gray-700">Jobs</p>
                </div>

                <div className="flex gap-5 items-center">
                  <Bell className="w-6 h-6 text-gray-700" />
                  <p className="text-lg  text-gray-700">Notifications</p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
