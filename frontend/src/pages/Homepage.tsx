import { assets } from "@/assets/assets";
import Postcard from "@/components/custom/Postcard";
import { useNavigate } from "react-router-dom";
import type { Post } from "@/types/postType";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogDescription,
} from "@/components/ui/dialog";
import { userAuthstore } from "@/store/authStore";

import {
  BookMarked,
  CalendarSearch,
  ChevronDown,
  ChevronUp,
  Group,
  Image,
  Newspaper,
  Plus,
  SquarePlay,
} from "lucide-react";
import { useState } from "react";
import useAllPosts from "@/hooks/useAllPosts";
import AddPostForm from "@/components/custom/AddPostForm";

const Homepage = () => {
  const { user } = userAuthstore();

  const navigate = useNavigate();
  const { postsData } = useAllPosts();
  const [boxOpen, setBoxOpen] = useState(false);

  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-gray-100 min-h-[calc(100vh-64px)] pb-5 ">
      <div className="grid grid-cols-1 h-full sm:grid-cols-4 gap-5 mx- sm:mx-10 mb-5   ">
        <div className="sm:col-span-1 h-160 w-[95%] mt-2  sm:sticky  max-sm:mt-5  top-20 flex flex-col items-center px-  ">
          <div className="border border-gray-200 bg-white pb-2  rounded-2xl ">
            <div className="relative  ">
              <img
                src={
                  user?.backgroundImg ||
                  "https://images.unsplash.com/photo-1521791136064-7986c2920216"
                }
                className="h-24 w-full object-cover rounded-lg"
              />

              <img
                src={user?.image ? user.image : assets.li}
                className="w-15 h-15 rounded-full border-gray-50 absolute left-4 -bottom-10"
              />
            </div>
            <div className="flex flex-col items-center gap-3 pt-5 px-2  ">
              <h4 className="text-lg font-semibold mt-3">
                {user?.name
                  ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                  : ""}
              </h4>
              <p className="text-sm">
                {user?.bio
                  ? user.bio
                  : "mern stack developer testing my skills while doing project"}
              </p>

              <button
                className="px-3  rounded-sm  flex items-center gap-1 border border-dotted bg-gray-50 text-center cursor-pointer hover:bg-gray-100 text-sm hover:text-md"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <Plus size={10} /> Edit profile
              </button>
            </div>
          </div>
          <div className="border flex flex-col px-5 pt-2 gap-1 border-gray-200  bg-white h-15 w-[95%] rounded-2xl hover:underline">
            <div className="flex  justify-between items-center">
              <p className="text-sm ">connections</p>{" "}
              <p className="text-xs text-blue-600 opacity-90">{user?.friends?.length}</p>
            </div>
            <p className="text-xs opacity-80 ">Grow your network</p>
          </div>
          <div className=" flex flex-col px-5 border border-gray-200 bg-white h-15 w-[95%] rounded-2xl pt-1 gap-1">
            <p className="text-xs  opacity-80">
              Access Exlusive tools & Insights
            </p>
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={assets.bussiness} className="h-5 w-5" alt="" />
              <p className="text-xs hover:text-blue-600 hover:underline">
                Try 1 month for 0
              </p>
            </div>
          </div>
          <div className="border flex flex-col gap-2 border-gray-200 bg-white h-33 w-[95%] rounded-2xl px-5 pt-3">
            <div className="flex items-center gap-2 cursor-pointer">
              <BookMarked size={15} className="opacity-90" />{" "}
              <p className="text-sm opacity-90 hover:underline hover:opacity-100">
                saved Items
              </p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <Group size={15} className="opacity-90" />{" "}
              <p className="text-sm opacity-90 hover:underline hover:opacity-100">
                Groups
              </p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <Newspaper size={15} className="opacity-90" />{" "}
              <p className="text-sm opacity-90 hover:underline hover:opacity-100">
                Newletters
              </p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <CalendarSearch size={15} className="opacity-90" />{" "}
              <p className="text-sm opacity-90 hover:underline hover:opacity-100">
                saved Items
              </p>
            </div>
          </div>
        </div>
        <div className="sm:col-span-2 mt-5 gap-5   flex  flex-col   ">
          <div className="border border-gray-300 shadow-lg w-full h-30 rounded-xl bg-white flex flex-col gap-5 ">
            <div className="flex gap-2 items-center px-2 pt-3 ">
              <img
                src={user?.image || assets.li}
                className="h-10 w-10 rounded-full"
                alt=""
              />
              <Dialog open={boxOpen} onOpenChange={setBoxOpen}>
                <DialogTrigger asChild>
                  <button className="w-full h-12 rounded-2xl px-3 border border-gray-500 text-left hover:bg-gray-50">
                    Start a post
                  </button>
                </DialogTrigger>

                <DialogOverlay
                  className="
      
         
          backdrop-blur-sm
          backdrop-brightness-100
        "
                />

                <DialogContent
                  className="
          w-full max-w-2xl
          bg-white
          rounded-xl
          p-6
          shadow-xl
          top-[50%]
          left-1/2 -translate-x-1/2
          max-h-[80vh]
          overflow-y-auto

        "
                >
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                      <div className="flex gap-4 items-center">
                        <img
                          src={user?.image || assets.li}
                          className="h-10 w-10 rounded-full"
                          alt=""
                        />
                        <h4 className="text-lg font-semibold">
                          {user?.name
                            ? user.name.charAt(0).toUpperCase() +
                              user.name.slice(1)
                            : ""}
                        </h4>
                      </div>
                    </DialogTitle>
                    <DialogDescription className="text-gray-700  flex flex-col justify-center font-md text-lg max-sm:text-sm">
                      Add post *Are mandatory
                    </DialogDescription>
                  </DialogHeader>
                  <AddPostForm closeDilog={() => setBoxOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex items-center justify-between px-2 sm:px-10">
              <span className="flex sm:gap-2 gap-1 cursor-pointer ">
                <SquarePlay size={25} color="#19ae2a" />
                <p className="sm:text-sm text-xs">video</p>
              </span>
              <span className="flex sm:gap-2 gap-1  cursor-pointer">
                <Image size={20} color="#195aae " />
                <p className="sm:text-sm text-xs">Image</p>
              </span>
              <span className="flex sm:gap-2 gap-1 cursor-pointer ">
                <Newspaper size={20} color="#b6611b" />
                <p className="sm:text-sm text-xs">write Article</p>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {postsData?.data.map((post: Post) => (
              <Postcard key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div className="sm:col-span-1 flex flex-col gap-2   mt-10">
          <div
            className="bg-white pt-3 pb-2 flex flex-col gap-2 
           rounded-lg shadow-2xl px-5"
          >
            <h4 className="font-semibold text-lg">LinkedIn News</h4>
            <p className="opacity-70  font-semibold text-md">Top stories</p>

            <ul className="flex flex-col gap-2">
              <li className="text-md font-semibold opacity-90 hover:bg-gray-200 cursor-pointer px-3 max-sm:text-center max-sm:text-sm py-2 ">
                Top newsletters of the week
              </li>
              <li className="text-md font-semibold opacity-90 hover:bg-gray-200 cursor-pointer px-3 max-sm:text-center max-sm:text-sm py-2 ">
                {" "}
                Silver prices hit 2 lakh
              </li>
              <li className="text-md font-semibold opacity-90 hover:bg-gray-200 cursor-pointer px-3 max-sm:text-center max-sm:text-sm py-2 ">
                Big tech bets big on india
              </li>
              <li className="text-md font-semibold opacity-90 hover:bg-gray-200 cursor-pointer px-3 max-sm:text-center max-sm:text-sm py-2 ">
                AP bus accident leaves 9 dead
              </li>
              <li className="text-md font-semibold opacity-90 hover:bg-gray-200 cursor-pointer px-3 max-sm:text-center max-sm:text-sm py-2 ">
                Thailand set for early elections
              </li>

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
                    Rular consumption booms
                  </li>
                  <li className="text-md font-semibold opacity-90 hover:bg-gray-200 cursor-pointer px-3 max-sm:text-center max-sm:text-sm py-2 ">
                    Global retail banks on India
                  </li>
                  <li className="text-md font-semibold opacity-90 hover:bg-gray-200 cursor-pointer px-3 max-sm:text-center max-sm:text-sm py-2 ">
                    Employee medical hotel revenue
                  </li>
                  <li className="text-md font-semibold opacity-90 hover:bg-gray-200 cursor-pointer px-3 max-sm:text-center max-sm:text-sm py-2 ">
                    Airlines face staffing crunch
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
          <div className="flex  items-center flex-col gap-3 sm:sticky top-20 px-3">
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

            <div className="flex text-center gap-2 pb-5">
              <img src={assets.lilogo} alt="" className="h-5" />
              <p className="text-sm">Linkedin Coroporation @ 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
