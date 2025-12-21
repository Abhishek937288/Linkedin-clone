import { Heart, MessageCircle, Trash } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment, addLike, deleteComment, removeLike } from "@/lib/postApi";
import toast from "react-hot-toast";

import { userAuthstore } from "@/store/authStore";
import { assets } from "@/assets/assets";
import type { Post, Comment } from "@/types/postType";

interface PostCardProps {
  post: Post;
}

const Postcard: React.FC<PostCardProps> = ({ post }) => {
  const queryClient = useQueryClient();
  const [showComments, setShowComments] = useState(false);
  const { user } = userAuthstore();

  const [comment, setComment] = useState("");

  const myUserId = user?.id;

  const isLiked: boolean = post.likes.some((like) => like.userId === myUserId);

  const likeMutation = useMutation({
    mutationFn: isLiked ? removeLike : addLike,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
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
      toast.success(response.message);
      setComment("");
      console.log(response);
    },
    onError: (error) => {
      console.log("ON ERROR 👉", error);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success(response.message);
    },
    onError: (error) => {
      console.log("ON ERROR 👉", error);
    },
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <img src={post.author.image} className="h-10 w-10 rounded-full" />
        <div>
          <h4 className="font-semibold">{post.author.name}</h4>
          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toDateString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm mb-3">{post.content}</p>

      {/* Images */}
      {post.image?.length > 0 && (
        <div className="grid grid-cols-1 gap-2 mb-3">
          {post.image.map((img: string, index: number) => (
            <img
              key={index}
              src={img}
              className="rounded-lg object-cover w-full"
            />
          ))}
        </div>
      )}

      {/* Like */}
      <div className="flex justify-between text-sm text-gray-600 pt-2 border-t">
        <button
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => {
            likeMutation.mutate(post.id);
          }}
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
              onClick={() => {
                addCommentMutation.mutate({ comment, id: post.id });
              }}
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
                  {" "}
                  <p className="font-semibold">{comment.user.name}</p>
                  <p className="text-sm">{comment.text}</p>
                </div>
                {user?.id == comment.user.id && (
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
