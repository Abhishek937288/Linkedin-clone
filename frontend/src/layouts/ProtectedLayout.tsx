import { Outlet, Navigate } from "react-router-dom";
import { authClient } from "../lib/authClient";
import { useEffect, useState } from "react";
import { userAuthstore } from "@/store/authStore";
import Navbar from "@/components/custom/Navbar";

const ProtectedLayout = () => {
  const { setUser, user } = userAuthstore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await authClient.getSession();
      console.log(data?.user);

      if (data?.user) {
        setUser(data.user);
      }

      setLoading(false);
    };

    checkSession();
  }, [setUser]);

  console.log(user);

  if (loading) return null;

  if (!user) return <Navigate to="/signup" replace />;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
