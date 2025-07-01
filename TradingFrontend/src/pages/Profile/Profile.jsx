import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/card";
import { Button } from "../../components/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogDescription, DialogTrigger, DialogTitle } from "../../components/dialog";
import AccountVerificationForm from "./AccountVerificationForm";

const Profile = () => {
  const handleEnable2 = () =>{

  }

  return (
    <div className="flex flex-col items-center mb-5 mx-10">
      <div className="pt-10 w-full space-y-6 lg:w-[60%]">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Your information</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="lg:flex-col flex">
              <div className="space-y-7 w-[50%]">
                <div className="flex">
                  <p className="w-[6rem]">Email: </p>
                  <p className="text-gray-500">user1@gmail.com</p>
                </div>
                <div className="flex">
                  <p className="w-[6rem]">Fullname: </p>
                  <p className="text-gray-500">John Cena</p>
                </div>
                <div className="flex">
                  <p className="w-[6rem]">DOB: </p>
                  <p className="text-gray-500">12/12/1988</p>
                </div>
                <div className="flex">
                  <p className="w-[6rem]">Nationality: </p>
                  <p className="text-gray-500">Mexican</p>
                </div>
              </div>
              <div className="space-y-7 w-[50%] ">
                <div className="flex">
                  <p className="w-[6rem]">Address: </p>
                  <p className="text-gray-500">New Delhi, Budh Vihar</p>
                </div>
                <div className="flex">
                  <p className="w-[6rem]">City: </p>
                  <p className="text-gray-500">Delhi</p>
                </div>
                <div className="flex">
                  <p className="w-[6rem]">Pincode: </p>
                  <p className="text-gray-500">110086</p>
                </div>
                <div className="flex">
                  <p className="w-[6rem]">Country: </p>
                  <p className="text-gray-500">India</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <CardTitle>2 Step Verification</CardTitle>
                  <div className="bg-red-500 px-2 py-1 rounded-md">Disabled</div>
                </div>
                <Dialog>
                  <DialogTrigger>
                    <Button className="w-[20rem]">Enable 2 Step Verification</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Verify your account</DialogTitle>
                    </DialogHeader>
                    <AccountVerificationForm handleSubmit={handleEnable2} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="w-[50%]">
                Enable 2 step authentication easily by verifying otp through the email which keeps your account secure and safe.
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
