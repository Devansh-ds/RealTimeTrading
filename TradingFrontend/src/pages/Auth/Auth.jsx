import React from "react";
import "./Auth.css";
import Signup from "./Signup";
import { Button } from "../../components/button";
import { useLocation, useNavigate } from "react-router-dom";
import { LogIn, Section } from "lucide-react";
import NotFound from "../NotFound/NotFound";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";

// const Auth = () => {
//   return (
//     <div className="h-screen relative authContainer">
//       <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#030712] opacity-50">
//         <div className="bgBlure absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center h-[35rem] w-[30rem] rounded-md z-50 bg-black bg-opacity-50 shadow-2xl shadow-white ">
//           <h1 className="text-6xl font-bold pb-9">A-Z Trading</h1>
//         </div>
//       </div>
//     </div>
//   );
// };

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen relative authContainer">
      {/* Blurred/transparent background layer */}
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#030712]/50 z-0" />

      {/* Content layer */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-start items-start h-[35rem] w-[full] rounded-md z-10 bg-black/50 shadow-2xl shadow-white bgBlure">
        <h1 className="text-6xl font-bold pb-9 mt-7 mx-20 text-center text-white">A-Z Trading</h1>
        {location.pathname == "/signup" ? (
          <section className="w-full">
            <Signup />
            <div className="flex items-center gap-2 justify-center">
              <span>Already have an account?</span>
              <button onClick={() => navigate("/signin")} className="text-blue-500 hover:text-blue-600 active:text-white">
                Login
              </button>
            </div>
          </section>
        ) : location.pathname == "/forgot-password" ? (
          <section className="w-full">
            <ForgotPassword />
            <div className="flex items-center gap-2 justify-center">
              <span>Back to login</span>
              <button onClick={() => navigate("/signin")} className="text-blue-500 hover:text-blue-600 active:text-white">
                Login
              </button>
            </div>
          </section>
        ) : (
          <section className="w-full">
            <Login />
            <div className="flex items-center gap-2 justify-center">
              <span>Don't have an account?</span>
              <button onClick={() => navigate("/signup")} className="text-blue-500 hover:text-blue-600 active:text-white">
                Register
              </button>
            </div>
            <div className="mt-5">
              <button onClick={() => navigate("/forgot-password")} className="text-blue-500 hover:text-blue-600 active:text-white w-full text-center">
                Forgot Password?
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Auth;
