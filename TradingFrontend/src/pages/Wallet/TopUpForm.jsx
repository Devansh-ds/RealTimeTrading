import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../../components/radio-group";
import { Input } from "../../components/input";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { Label } from "../../components/label";
import { Button } from "../../components/button";
import { DialogClose } from "../../components/dialog";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addMoney } from "../../state/Money/Action";

const TopUpForm = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const handlePyamentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const handleChange = (e) => {
    if (!isNaN(e.target.value)) {
      setAmount(e.target.value);
    }
  };

  const handleSubmit = () => {
    dispatch(addMoney({token: auth.token, money: amount}))
  };

  return (
    <div className="pt-10 space-y-5">
      <div>
        <h1 className="pb-3">Enter Amount</h1>
        <Input className="py-5 text-lg" placeholder="1" onChange={handleChange} value={amount} />
      </div>
      <div>
        <h1 className="pb-4">Select payment method</h1>
        <RadioGroup onValueChange={(value) => handlePyamentMethodChange(value)} className="flex justify-between" defaultValue="RAZORPAY">
          <div className="flex w-[50%] items-center space-x-5 border p-3 px-5 rounded-md">
            <RadioGroupItem icon={DotFilledIcon} className="size-6" value="RAZORPAY" id="r1" />
            <Label htmlFor="r1">
              <div className="bg-white rounded-md px-5 py-2 w-32">
                <img
                  className=""
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png?20171127075036"
                />
              </div>
            </Label>
          </div>
          <div className="flex w-[50%] items-center space-x-5 border p-3 px-5 rounded-md">
            <RadioGroupItem icon={DotFilledIcon} className="size-6" value="STRIPE" id="s1" />
            <Label htmlFor="s1">
              <div className="bg-white rounded-md px-5 py-2 w-32">
                <img
                  className=" h-5"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/768px-Stripe_Logo%2C_revised_2016.svg.png?20240909030005"
                />
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
      <DialogClose className="w-full">
        <Button variant="outline" onClick={handleSubmit} className="w-full py-7 text-xl">
          Submit
        </Button>
      </DialogClose>
    </div>
  );
};

export default TopUpForm;
