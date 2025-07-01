import React, { useState } from "react";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { DialogClose } from "@radix-ui/react-dialog";

const WithdrawalForm = () => {
  const [amount, setAmount] = useState("");

  const handleChange = (e) => {
    if (!isNaN(e.target.value)) {
      setAmount(e.target.value);
    }
  };

  const handleSubmit = () => {
    console.log("submit wihtdraaw request");
  };

  return (
    <div className="pt-10 space-y-5">
      <div className="flex justify-between items-center rounded-md bg-amber-700 text-xl font-bold px-5 py-4">
        <p>Available balance</p>
        <p>$4322</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <h1>Enter withdrawal amount</h1>
        <div className="flex items-center justify-center">
          <input
            onChange={handleChange}
            value={amount}
            className="withdrawalInput pt-2 border-none outline-none focus:outline-none px-0 text-2xl overflow-y-hidden text-center focus:overflow-y-hidden"
            placeholder="100"
          />
        </div>
      </div>
      <div>
        <p className="pb-2">Transfer to</p>
        <div className="flex items-center gap-5 border px-5 py-2 rounded-md">
          <img src="https://th.bing.com/th/id/OIP.NFRNGrcFfvr8Rmx_bMqybgHaGc?w=213&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" className="h-8 w-8" />
          <div>
            <p className="text-xl font-bold">Yes Bank</p>
            <p className="text-xs">***********435</p>
          </div>
        </div>
      </div>
      <DialogClose className="w-full">
        <Button variant="outline" onClick={handleSubmit} className="w-full py-7 text-xl">
          Withdraw
        </Button>
      </DialogClose>
    </div>
  );
};

export default WithdrawalForm;
