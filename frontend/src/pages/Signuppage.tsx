import AuthNav from "@/components/custom/AuthNav";
import { assets } from "../assets/assets";
import useSignup from "@/hooks/useSignup";
import { Loader } from "lucide-react";

import { useState } from "react";

interface AuthForm {
  name: string;
  email: string;
  password: string;
}

const Signuppage = () => {
  const { isPending, signupMutation } = useSignup();
  const [authForm, setAuthForm] = useState<AuthForm>({
    name: "",
    email: "",
    password: "",
  });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation(authForm);
  };

  return (
    <div className="w-full mt-5">
      <AuthNav />

      <main className="mt-20 container flex gap-20 flex-col sm:flex-row px-3">
        <div className="">
          <h1 className="text-3xl mb-5 font-semibold text-gray-700">
            Explore jobs and grow your professional network
          </h1>
          <form
            action=""
            className="flex flex-col w-[90vw] md:w-[30vw]"
            onSubmit={handleSubmit}
          >
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="John doe "
              className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              name="name"
              value={authForm.name}
              onChange={handleOnchange}
            />
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="text"
              placeholder="...@gamil.com "
              className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              name="email"
              value={authForm.email}
              onChange={handleOnchange}
            />
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="**** "
              className="w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              name="password"
              value={authForm.password}
              onChange={handleOnchange}
            />

            <button
              className="mt-5 py-3 rounded-2xl bg-blue-700 text-white font-semibold border border-black cursor-pointer text-center flex items-center justify-center"
              type="submit"
            >
              {isPending ? <Loader /> : "Create Account"}
            </button>
          </form>
        </div>
        <div className="w-full">
          <img src={assets.linkedinsales} alt="" className="rounded-3xl" />
        </div>
      </main>
      <footer className="mt-6 px-3"></footer>
    </div>
  );
};

export default Signuppage;
