import React, { useEffect, useState } from "react";
import { Button } from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../state/Auth/Action.js";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    console.log("handle submit register form");
    dispatch(register(form));
  };

  return (
    <div className="px-10 gap-5 py-2 flex flex-col items-center w-[100%]">
      <div className="flex flex-col gap-2 w-full">
        <p className="text-lg">Your name</p>
        <input
          value={form.fullname}
          name="fullname"
          onChange={handleChange}
          type="text"
          placeholder="John cena"
          className="border p-3 px-5 rounded-md w-full"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className="text-lg">Email</p>
        <input
          value={form.email}
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="user@gmail.com"
          className="border p-3 px-5 rounded-md w-full"
        />
        {auth.register?.error && <p className="text-red-500">Email already exist</p>}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className="text-lg">Password</p>
        <input
          value={form.password}
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="test123"
          className="border p-3 px-5 rounded-md w-full"
        />
      </div>
      <Button onClick={handleSubmit} className="text-xl py-5 w-full active:bg-amber-800">
        SUBMIT
      </Button>
    </div>
  );
};

export default Signup;
