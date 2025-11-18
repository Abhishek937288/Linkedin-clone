import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Signuppage from "./pages/Signuppage";
import Signinpage from "./pages/Signinpage";
import Authlayout from "./layouts/Authlayout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Authlayout />}>
          <Route path="/" element={<Homepage />} />
        </Route>

        <Route path="/signup" element={<Signuppage />} />
        <Route path="/signin" element={<Signinpage />} />
      </Routes>
    </>
  );
}

export default App;
