import { Outlet, Navigate } from "react-router-dom";
import { authClient } from "../lib/authClient";
import { useEffect, useState } from "react";
import { userAuthstore } from "@/store/authStore";

const Authlayout = () => {
  const { user, setUser } = userAuthstore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await authClient.getSession();

      if (data?.user) {
        setUser(data.user);
      }

      setLoading(false);
    };

    checkSession();
  }, [setUser]);

  if (loading) return null;

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default Authlayout;
