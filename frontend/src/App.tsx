import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Signuppage from "./pages/Signuppage";
import Signinpage from "./pages/Signinpage";

import { Toaster } from "react-hot-toast";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Authlayout from "./layouts/Authlayout";
function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Homepage />} />
        </Route>
        <Route element={<Authlayout/>}>
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/signin" element={<Signinpage />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
