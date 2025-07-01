import { Dialog, DialogClose, DialogContent, DialogHeader, DialogDescription, DialogTrigger, DialogTitle } from "../../components/dialog";
import React, { useState } from "react";
import { Button } from "../../components/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../../components/input-otp";

const AccountVerificationForm = ({ handleEnable2 }) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {

  }

  return (
    <div className="flex justify-center">
      <div className="space-y-5 mt-5 w-full">
        <div className="flex justify-between items-center">
          <div className="gap-4 flex">
            <p>Email:</p>
            <p>user1@gmail.com</p>
          </div>
          <Dialog>
            <DialogTrigger>
                <Button className="">Send OTP</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter OTP</DialogTitle>
              </DialogHeader>
              <div className="py-5 gap-10 flex justify-center items-center">
                <InputOTP value={value} onChange={(value) => setValue(value)} maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <DialogClose>
                  <Button onClick={handleSubmit}>Submit</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AccountVerificationForm;
