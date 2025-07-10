import React, { useEffect } from "react";
import "./Auth.css";
import Signup from "./Signup";
import { useLocation, useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-screen relative authContainer">
      {/* Blurred/transparent background layer */}
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#030712]/50 z-0" />

      {/* Content layer */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-start items-start h-[35rem] w-[full] rounded-md z-10 bg-black/50 shadow-2xl shadow-white bgBlure sm:w-[60%] lg:w-[40%]">
        <h1 className="text-6xl sm:text-2xl font-bold pb-9 mt-7 text-center text-white w-full mx-auto">A-Z Trading</h1>
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
