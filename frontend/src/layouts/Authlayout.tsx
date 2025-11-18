import Navbar from "@/components/custom/Navbar";
import { Outlet } from "react-router-dom";



const Authlayout = () => {
  return (
   <>
   <Navbar/>
   <Outlet/>
   </>
  )
}

export default Authlayout ;