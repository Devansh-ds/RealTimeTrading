import React, { useState } from "react";
import { Button } from "../../components/button";
import { DialogClose } from "@radix-ui/react-dialog";

const PaymentDetailsForm = () => {
  const [form, setForm] = useState({
    holderName: "",
    ifscCode: "",
    accountN: "",
    confirmAN: "",
    bankName: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    console.log("handle submit")
  }

  return (
    <div className="px-10 gap-5 py-2 flex flex-col items-center">
      <div className="flex flex-col gap-2 w-full">
        <p className="text-lg">Account holder name</p>
        <input
          value={form.holderName}
          name="holderName"
          onChange={handleChange}
          type="text"
          placeholder="John cena"
          className="border p-3 px-5 rounded-md w-full"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className="text-lg">IFSC code</p>
        <input
          value={form.ifscCode}
          name="ifscCode"
          onChange={handleChange}
          type="text"
          placeholder="IBKL0043"
          className="border p-3 px-5 rounded-md w-full"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className="text-lg">Account Number</p>
        <input
          value={form.accountN}
          name="accountN"
          onChange={handleChange}
          type="text"
          placeholder="**********343"
          className="border p-3 px-5 rounded-md w-full"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className="text-lg">Confirm Account Number</p>
        <input
          value={form.confirmAN}
          name="confirmAN"
          onChange={handleChange}
          type="text"
          placeholder="**********343"
          className="border p-3 px-5 rounded-md w-full"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className="text-lg">Bank Name</p>
        <input
          value={form.bankName}
          name="bankName"
          onChange={handleChange}
          type="text"
          placeholder="IDBI Bank"
          className="border p-3 px-5 rounded-md w-full"
        />
      </div>
      <DialogClose className="w-full">
        <Button onSubmit={handleSubmit} className="text-xl py-5 w-full">SUBMIT</Button>
      </DialogClose>
    </div>
  );
};

export default PaymentDetailsForm;
