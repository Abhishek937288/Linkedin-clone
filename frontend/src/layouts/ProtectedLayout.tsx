import { Outlet, Navigate } from "react-router-dom";
import { authClient } from "../lib/authClient";
import { useEffect, useState } from "react";
import { userAuthstore } from "@/store/authStore";
import Navbar from "@/components/custom/Navbar";

import useGetUserData from "@/hooks/useGetUserData";

const ProtectedLayout = () => {
  const { setUser, user } = userAuthstore();
  const [loading, setLoading] = useState(true);
  const { userData } = useGetUserData();

  useEffect(() => {
    const init = async () => {
      // 1️⃣ Check auth ONLY
      const { data } = await authClient.getSession();
      if (!data?.user) {
        setLoading(false);
        return;
      }

      if (userData) {
        setUser(userData);
      }

      setLoading(false);
    };

    init();
  }, [setUser , userData]);

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
