import { Outlet, Navigate } from "react-router-dom";
import { authClient } from "../lib/authClient";
import { useEffect, useState } from "react";
import { userAuthstore } from "@/store/authStore";
import { getUserData } from "@/lib/api";

const Authlayout = () => {
  const { user, setUser } = userAuthstore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data } = await authClient.getSession(); // this will check user is authenticated or not 

      if (data?.user) {
        const fullUser = await getUserData();
        setUser(fullUser);
      }

      setLoading(false);
    };

    init();
  }, [setUser]);

  if (loading) return null;

  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default Authlayout;
