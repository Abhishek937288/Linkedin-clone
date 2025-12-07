import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Signuppage from "./pages/Signuppage";
import Signinpage from "./pages/Signinpage";
import { io } from "socket.io-client";

import { Toaster } from "react-hot-toast";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Authlayout from "./layouts/Authlayout";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const token = localStorage.getItem("authToken");
console.log(token);

const socket = io(backendUrl, {
  auth: {
    token, // this will be available as socket.handshake.auth.token on the server
  },
  withCredentials: true,
});

// Listen for connection
socket.on("connect", () => {
  console.log("Connected to server with id:", socket.id);
});

// Listen for disconnect
socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Homepage />} />
        </Route>
        <Route element={<Authlayout />}>
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/signin" element={<Signinpage />} />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
