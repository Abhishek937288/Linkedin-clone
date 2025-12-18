import { userAuthstore } from "@/store/authStore";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader, MapPin, Plus } from "lucide-react";
import { assets } from "@/assets/assets";
import useUserUpdate from "@/hooks/useUserUpdate";

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

const Profilepage = () => {
  const { user } = userAuthstore();
  const { pending,  updateUser } = useUserUpdate();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    headline: user?.headline || "",
    bio: user?.bio || "",
    company: user?.company || "",
    designation: user?.designation || "",
    experience: user?.experience?.toString() || "",
    location: user?.location || "",
    image: user?.image || "",
    backgroundImg: user?.backgroundImg || "",
    skills: user?.skills?.join(", ") || "",
  });

  const uploadToCloudinary = async (
    file: File,
    type: "image" | "backgroundImg"
  ) => {
    if (!file) return;

    setUploading(true);

    const formDataCloud = new FormData();
    formDataCloud.append("file", file);
    formDataCloud.append("upload_preset", CLOUDINARY_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_URL, formDataCloud);

      setFormData((prev) => ({
        ...prev,
        [type]: res.data.secure_url,
      }));
    } catch (error) {
      console.error("Cloudinary upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (uploading) {
      alert("Image is uploading, please wait");
      return;
    }

    const payload = {
      name: formData.name,
      headline: formData.headline || undefined,
      bio: formData.bio || undefined,
      company: formData.company || undefined,
      designation: formData.designation || undefined,
      experience: formData.experience ? Number(formData.experience) : undefined,
      location: formData.location || undefined,
      image: formData.image || undefined,
      backgroundImg: formData.backgroundImg || undefined,
      skills: formData.skills
        ? formData.skills.split(",").map((s) => s.trim())
        : undefined,
    };
    updateUser(payload);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-center  bg-gray-100 min-h-[calc(100vh-64px)]  ">
      <div className="mt-5 flex flex-col gap-2 mb-5">
        <div className="mt-5 ">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="px-3  rounded-sm  flex items-center gap-1 border border-dotted bg-gray-50 text-center cursor-pointer hover:bg-gray-100 text-sm hover:text-md">
                <Plus size={10} /> Edit profile
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
          w-full   max-w-2xl
          bg-white
          rounded-xl
          p-6
          shadow-xl
          top-[50%]
          left-1/2 -translate-x-1/2

        "
            >
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  <div className="flex gap-4 items-center">
                    <img
                      src={user && user.image ? user.image : assets.lilogo}
                      className="h-10 w-10 rounded-full"
                      alt=""
                    />
                    <h4 className="text-lg font-semibold">
                      {user?.name
                        ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                        : ""}
                    </h4>
                  </div>
                </DialogTitle>

                <DialogDescription className="text-gray-700 font-md text-lg max-sm:text-sm">
                  Update your personal information and profile images.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-4 overflow-y-auto h-[65vh] "
              >
                <label className="block text-gray-700 font-medium ">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className=" border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-800"
                  required
                />

                <label className="block text-gray-700 font-medium ">
                  Headline
                </label>
                <input
                  name="headline"
                  value={formData.headline}
                  onChange={handleChange}
                  placeholder="Headline"
                  className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-800"
                />

                <label className="block text-gray-700 font-medium ">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Bio"
                  className="
   
    min-h-[180px]
    border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-800
    resize-y
    text-base
    leading-relaxed"
                />
                <label className="block text-gray-700 font-medium ">
                  Comany Name
                </label>
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company"
                  className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-800"
                />
                <label className="block text-gray-700 font-medium ">
                  Designation
                </label>
                <input
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="Designation"
                  className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-800"
                />
                <label className="block text-gray-700 font-medium ">
                  Experience
                </label>
                <input
                  name="experience"
                  type="number"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Experience (years)"
                  className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-800"
                />

                <label className="block text-gray-700 font-medium ">
                  Location
                </label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-800"
                />

                <label className="block text-gray-700 font-medium ">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files &&
                    uploadToCloudinary(e.target.files[0], "image")
                  }
                  className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-800"
                />

                <label className="block text-gray-700 font-medium ">
                  Background Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files &&
                    uploadToCloudinary(e.target.files[0], "backgroundImg")
                  }
                  className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-800"
                />

                <label className="block text-gray-700 font-medium ">
                  Skills
                </label>
                <input
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Skills (comma separated)"
                  className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-800"
                />

                <button
                  type="submit"
                  disabled={uploading || pending}
                  className="bg-blue-600 text-white flex justify-center py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
                >
                  {uploading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Save changes"
                  )}
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="border pb-5   border-gray-200 bg-white w-[90vw] sm:w-[60vw] rounded-2xl ">
          <div className="relative ">
            <img
              src={
                user?.backgroundImg ||
                "https://images.unsplash.com/photo-1521791136064-7986c2920216"
              }
              className="h-24 sm:h-33 w-full object-cover rounded-lg"
            />

            <img
              src={user?.image ? user.image : assets.li}
              className="w-15 sm:w-20 h-15  sm:h-20 rounded-full border-gray-50 absolute left-4 -bottom-10"
            />
          </div>
          <div className="flex flex-col mt-5 gap-1 pt-5 px-5 ">
            <h4 className="text-xl font-semibold">
              {user?.name
                ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                : ""}
            </h4>
            <p className="text-md ">
              {user?.headline
                ? user.headline
                : "mern stack developer testing my skills while doing project"}
            </p>
            <span className="text-md flex items-center">
              <MapPin color="#39d57d" size={20} />
              {user?.location ? user.location : "unknown"}
            </span>
            <p className="text-md text-blue-600">
              connections {user?.friends?.length}
            </p>
            <div className="flex flex-col items-center  sm:flex-row gap-2">
              <button className="sm:px-3 py-1 max-sm:w-20  cursor-pointer rounded-2xl bg-blue-600 text-white max-sm:text-sm ">
                Open to
              </button>

              <button className="sm:px-3 py-1 max-sm:w-35 max-sm:px-1 font-semibold  cursor-pointer rounded-2xl bg-white text-blue-600 border border-blue-600 max-sm:text-sm">
                Add profile section
              </button>

              <button className="sm:px-3 py-1 max-sm:w-35 max-sm:px-1 font-semibold  cursor-pointer rounded-2xl bg-white text-blue-600 border border-blue-600 max-sm:text-sm">
                Enhance profile
              </button>
              <button className="sm:px-3 py-1 max-sm:w-35 max-sm:px-1 font-semibold  cursor-pointer rounded-2xl bg-white text-gray-600 border border-gray-400 max-sm:text-sm">
                Resources
              </button>
            </div>
          </div>
        </div>
        <div className="border pb-5 pt-3  px-3  border-gray-200 bg-white w-[90vw] sm:w-[60vw] rounded-2xl ">
          <h4 className="max-sm:text-sm font-bold">About</h4>
          <div className="flex flex-col gap-2">
            <p className="text-center font-bold max-sm:text-lg text-xl">
              {" "}
              {user?.name}
            </p>
            <p className="text-center font-semibold opacity-90 max-sm:text-lg text-xl">
              {" "}
              {user?.headline}
            </p>
            <p className="text-md max-sm:text-sm opacity-80"> {user?.bio}</p>
          </div>
        </div>
        <div className="border pb-5 pt-3  px-3  border-gray-200 bg-white w-[90vw] sm:w-[60vw] rounded-2xl">
          <h4 className="max-sm:text-sm font-bold">Expereince & skills</h4>
          <div className="flex flex-col gap-2">
            <h5 className="text-center font-lg max-sm:text-lg text-xl">
              Experience
            </h5>
            <div className="flex gap-2 items-center ">
              <p className="max-sm:text-sm font-semibold text-lg"> company :</p>
              <p className="text-lg max-sm:text-sm"> {user?.company}</p>
            </div>
            <div className="flex gap-2 items-center ">
              <p className="max-sm:text-sm font-semibold text-lg">
                {" "}
                Desgnation :
              </p>
              <p className="text-lg max-sm:text-sm"> {user?.designation}</p>
            </div>
            <div className="flex gap-2 items-center ">
              <p className="max-sm:text-sm font-semibold text-lg">
                {" "}
                Experience :
              </p>
              <p className="text-lg max-sm:text-sm"> {user?.experience}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="text-center font-lg max-sm:text-lg text-xl">
              Skills
            </h5>
            <div className="">
              {user?.skills?.map((skill, idx) => (
                <p key={idx} className="text-lg max-sm:text-sm  font-semibold">
                  {skill}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
