import React from "react";
import { useState } from "react";
import { Button } from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../state/Auth/Action.js";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    console.log("sending login request form");
    dispatch(login(form));
  };

  return (
    <div className="px-10 gap-5 py-2 flex flex-col items-center w-full">
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
        {auth?.login?.error && <p className="text-red-600 text-center">Email or password is incorrect</p>}
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
      <Button onClick={handleSubmit} className="text-xl mt-5 py-5 w-full active:bg-amber-800">
        SUBMIT
      </Button>
    </div>
  );
};

export default Login;
