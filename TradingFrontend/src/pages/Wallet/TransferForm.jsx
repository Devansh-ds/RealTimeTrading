import React, { useState } from "react";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { DialogClose } from "../../components/dialog";

const TransferForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    recieverWalletId: "",
    purpose: "",
  });

  const handleChange = (e) => {
    if (e.target.name == "amount") {
      if (!isNaN(e.target.value)) {
        setFormData((prev) => ({
          ...prev,
          amount: e.target.value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = () => {
    console.log("submitting form");
  };

  return (
    <div className="pt-5 space-y-5">
      <div>
        <h1 className="pb-3">Enter Amount</h1>
        <Input type="text" name="amount" onChange={handleChange} value={formData.amount} placeholder="100" className="py-6" />
      </div>
      <div>
        <h1 className="pb-3">Reciever's Wallet Id</h1>
        <Input type="text" name="recieverWalletId" onChange={handleChange} value={formData.recieverWalletId} placeholder="#454DG9" className="py-6" />
      </div>
      <div>
        <h1 className="pb-3">Purpose</h1>
        <Input name="purpose" onChange={handleChange} value={formData.purpose} placeholder="gift for friend" className="py-6" />
      </div>
      <DialogClose className="w-full">
        <Button onClick={handleSubmit} className="w-full mt-4 py-6 text-2xl">
          Submit
        </Button>
      </DialogClose>
    </div>
  );
};

export default TransferForm;
