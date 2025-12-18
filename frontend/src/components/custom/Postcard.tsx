import { assets } from "@/assets/assets";
import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";

const Postcard = () => {
  const [showComments, setShowComments] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
          className="h-10 w-10 rounded-full"
          alt=""
        />
        <div>
          <h4 className="font-semibold">Ganesh</h4>
          <p className="text-xs text-gray-500"></p>
        </div>
      </div>

      <p className="text-sm mb-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sint
        reiciendis Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
        veniam provident explicabo non, facilis ipsa ullam nisi cupiditate a
        architecto dolorum ipsam deserunt officia. Culpa dolorum similique qui!
        Quasi, nihil!{" "}
      </p>

      <div className="grid grid-cols-1 gap-2 mb-3">
        <img src={assets.signin} className="rounded-lg object-cover w-full" />
      </div>

      <div className="flex justify-between text-sm text-gray-600 pt-2 border-t">
        <span className="flex items-center gap-1 cursor-pointer">
          <Heart size={16} />
        </span>

        <span
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle size={16} />
        </span>
      </div>

      {showComments && (
        <div className="mt-3 border-t pt-3">
          <div className="flex gap-2 mb-3">
            <img src={assets.signin} className="h-8 w-8 rounded-full" alt="" />
            <input
              type="text"
              placeholder="Write a comment..."
              className="w-full border rounded-full px-4 py-2 text-sm outline-none"
            />
          </div>

          <div className="flex gap-2">
            <img src={assets.signin} className="h-8 w-8 rounded-full" alt="" />
            <div className="bg-gray-100 rounded-xl px-3 py-2">
              <p className="text-xs font-semibold">Abhishek</p>
              <p className="text-sm">Nice post 🔥</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Postcard;
