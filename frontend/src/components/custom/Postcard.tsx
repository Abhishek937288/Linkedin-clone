import { ChevronRight, Heart, MessageCircle, Trash } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment, addLike, deleteComment, removeLike } from "@/lib/postApi";
import toast from "react-hot-toast";

import { userAuthstore } from "@/store/authStore";
import { assets } from "@/assets/assets";
import type { Post, Comment } from "@/types/postType";
import useDeletePost from "@/hooks/useDeletePost";

interface PostCardProps {
  post: Post;
}

const Postcard: React.FC<PostCardProps> = ({ post }) => {
  const queryClient = useQueryClient();
  const [showComments, setShowComments] = useState(false);
  const { user } = userAuthstore();
  const [comment, setComment] = useState("");
  const myUserId = user?.id;
  const { deletePost } = useDeletePost();

  // slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const media: string[] = post.image ? [...post.image] : [];
  if (post.video) media.push(post.video);

  const isLiked: boolean = post.likes.some((like) => like.userId === myUserId);

  const likeMutation = useMutation({
    mutationFn: isLiked ? removeLike : addLike,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
      toast.success(response.message);
      setComment("");
    },
    onError: (error) => {
      console.log("ON ERROR ", error);
    },
  });

  const handleOnCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
      toast.success(response.message);
      setComment("");
    },
    onError: (error) => {
      console.log(" ERROR", error);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
      toast.success(response.message);
    },
    onError: (error) => {
      console.log("ON ERROR 👉", error);
    },
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 mb-3">
          <img src={post.author.image} className="h-10 w-10 rounded-full" />
          <div>
            <h4 className="font-semibold">{post.author.name}</h4>
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toDateString()}
            </p>
          </div>
        </div>
        {user?.id == post.author.id && (
          <div>
            <Trash
              color="red"
              className="hover:h-8 w-8 cursor-pointer"
              onClick={() => deletePost(post.id)}
            />
          </div>
        )}
      </div>

      {/* title */}
      <p className="text-lg">{post.title}</p>

      {/* Content */}
      {post?.content && <p className="text-sm mb-3">{post.content}</p>}

      {/* Media Slider */}
      {media.length > 0 && (
        <div className="relative w-full mb-3">
          <div className="overflow-hidden rounded-lg">
            {media.map((item, index) => (
              <div
                key={index}
                className={`w-full transition-transform duration-300 ease-in-out ${
                  index === currentSlide ? "block" : "hidden"
                }`}
              >
                {item.endsWith(".mp4") ? (
                  <video src={item} controls className="w-full rounded-lg" />
                ) : (
                  <img src={item} className="w-full rounded-lg object-cover" />
                )}
              </div>
            ))}
          </div>

          {/* Prev / Next buttons */}
          {media.length > 1 && (
            <>
              <button
                onClick={() =>
                  setCurrentSlide(
                    currentSlide === media.length - 1 ? 0 : currentSlide + 1
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-1 opacity-80 hover:opacity-100"
              >
                <ChevronRight />
              </button>
            </>
          )}

          {/* Dots */}
          <div className="flex justify-center mt-2 gap-1">
            {media.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                } cursor-pointer`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Like / Comment */}
      <div className="flex justify-between text-sm text-gray-600 pt-2 border-t">
        <button
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => likeMutation.mutate(post.id)}
          disabled={likeMutation.isPending}
        >
          {isLiked ? (
            <Heart size={16} className="text-red-500 fill-red-500" />
          ) : (
            <Heart size={16} />
          )}
          {post.likes.length}
        </button>

        <span
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle size={16} />
          {post.comments.length}
        </span>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="mt-3 border-t pt-3">
          <div className="flex gap-2 mb-3">
            <img
              src={user?.image ?? assets.li}
              className="h-8 w-8 rounded-full"
              alt=""
            />
            <input
              type="text"
              placeholder="Write a comment..."
              className="w-full border rounded-full px-4 py-2 text-sm outline-none"
              onChange={handleOnCommentChange}
              value={comment}
            />
            <button
              className="px-3 max-sm:text-sm max-sm:px-2 bg-blue-600 text-white rounded-lg cursor-pointer"
              onClick={() =>
                addCommentMutation.mutate({ comment, id: post.id })
              }
              disabled={addCommentMutation.isPending}
            >
              Add
            </button>
          </div>

          {post.comments.length === 0 && (
            <p className="text-sm text-gray-400">No comments yet</p>
          )}

          {post.comments.map((comment: Comment) => (
            <div key={comment.id} className="flex gap-2 mb-2">
              <img src={comment.user.image} className="h-8 w-8 rounded-full" />
              <div className="bg-gray-100 rounded-xl px-3 py-2 flex items-center gap-2">
                <div className="flex flex-col">
                  <p className="font-semibold">{comment.user.name}</p>
                  <p className="text-sm">{comment.text}</p>
                </div>
                {user?.id === comment.user.id && (
                  <button
                    className="cursor-pointer"
                    onClick={() => deleteCommentMutation.mutate(comment.id)}
                    disabled={deleteCommentMutation.isPending}
                  >
                    <Trash color="red" size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Postcard;
