import type { AddPostFormProps } from "@/types/postType";
import { useState } from "react";
import axios from "axios";
import useAddPost from "@/hooks/useAddPost";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

const AddPostForm = ({ closeDilog }: AddPostFormProps) => {
  const navigate = useNavigate();
  const { addPost, addingPost } = useAddPost();
  const [uploading, setUploading] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    images: [] as string[], // for multiple images
    video: "" as string | "",
  });

  const uploadToCloudinary = async (file: File, type: "image" | "video") => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    try {
      const res = await axios.post(CLOUDINARY_URL, formData);

      if (type === "image") {
        setPostData((prev) => ({
          ...prev,
          images: [...prev.images, res.data.secure_url],
        }));
      }

      if (type === "video") {
        setPostData((prev) => ({
          ...prev,
          video: res.data.secure_url, // only one video
        }));
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const payload = {
    title: postData.title,
    content: postData.content || undefined,
    image: postData.images.length === 1 ? postData.images[0] : postData.images,
    video: postData.video || undefined,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!postData.title) {
      toast.error("Title is required");
      return;
    }

    addPost(payload);
    closeDilog();
    navigate("/");
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit} className=" flex flex-col gap-3 ">
        <label className="block text-gray-700 font-medium ">Title*</label>
        <input // title madatory
          type="text"
          placeholder="Title (min 5 char)"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
        <label className="block text-gray-700 font-medium ">Description</label>
        <textarea // content is optional
          placeholder="Content"
          value={postData.content}
          onChange={(e) =>
            setPostData({ ...postData, content: e.target.value })
          }
          className="w-full border border-gray-400 rounded-md px-3 py-5 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
        <label className="block text-gray-700 font-medium ">Add image*</label>
        <input // here we can uplaod one or more images
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (!e.target.files) return;
            Array.from(e.target.files).forEach((file) =>
              uploadToCloudinary(file, "image")
            );
          }}
          className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />

        <label className="block text-gray-700 font-medium ">Add video</label>
        <input // video is optional and only one video
          type="file"
          accept="video/*"
          onChange={(e) =>
            e.target.files && uploadToCloudinary(e.target.files[0], "video")
          }
          className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />

        {(postData.images.length > 0 || postData.video) && (
          <div className="mt-1 flex flex-wrap space-y-2 ">
            {/* Images */}
            {postData.images.length > 0 &&
              postData.images.map((img) => (
                <img
                  src={img}
                  className="h-full w-full object-cover rounded-md"
                />
              ))}

            {/* Video */}
            {postData.video && (
              <p className="text-sm text-gray-600 truncate">
                🎥{" "}
                <video
                  src={postData.video}
                  controls
                  className="h-32 rounded-md"
                />
              </p>
            )}
          </div>
        )}

        <div className="flex flex-row-reverse">
          <button
            disabled={uploading || addingPost}
            type="submit"
            className="px-5 rounded-xl py-1 border border-gray-200 cursor-pointer bg-blue-500 text-white font-semibold hover:px-6"
          >
            {uploading || addingPost ? "Uploading..." : "Post"}
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;
