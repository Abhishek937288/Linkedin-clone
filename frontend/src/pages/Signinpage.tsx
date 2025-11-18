import AuthNav from "@/components/custom/AuthNav";
import { assets } from "@/assets/assets";

const Signinpage = () => {
  return (
    <div className="w-full mt-5">
      <AuthNav />
      <main className="mt-20 container flex gap-20 flex-col sm:flex-row px-3">
        <div className="">
          <h1 className="text-3xl mb-5 font-semibold text-gray-700">
            {" "}
            Stay connected with your community and career updates.
          </h1>
          <form action="" className="flex flex-col w-[90vw] md:w-[30vw]">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="text"
              placeholder="...@gamil.com "
              className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="**** "
              className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />

            <button className="mt-5 py-3 rounded-2xl bg-blue-700 text-white font-semibold border border-black cursor-pointer">
              Sign in
            </button>
          </form>
        </div>
        <div className="w-full">
          <img src={assets.signin} alt="" className="rounded-3xl" />
        </div>
      </main>
    </div>
  );
};

export default Signinpage;
