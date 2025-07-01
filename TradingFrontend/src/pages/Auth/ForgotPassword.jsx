import React from 'react'
import { useState } from "react";
import { Button } from "../../components/button";

const ForgotPassword = () => {
    const [form, setForm] = useState({
      email: "",
    });

    const handleChange = (e) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = () => {
      console.log("handle submit");
      console.log(form);
    };

    return (
      <div className="px-10 gap-5 py-2 flex flex-col items-center w-full">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-lg">Enter your email</p>
          <input
            value={form.email}
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="your email"
            className="border p-3 px-5 rounded-md w-full"
          />
        </div>
        <Button onClick={handleSubmit} className="text-xl mt-5 py-5 w-full active:bg-amber-800">
          SUBMIT
        </Button>
      </div>
    );
}

export default ForgotPassword
