import React from "react";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/card";
import { DollarSign, DownloadIcon, ShuffleIcon, UploadIcon, WalletIcon } from "lucide-react";
import { CopyIcon, ReloadIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/dialog";
import TopUpForm from "./TopUpForm";
import WithdrawalForm from "./WithdrawalForm";
import TransferForm from "./TransferForm";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

const Wallet = () => {
  return (
    <div className="flex flex-col items-center mx-20">
      <div className="pt-10 w-full lg:w-[60%]">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <WalletIcon size={40} />
                <div>
                  <CardTitle className="text-3xl mb-1">My Wallet</CardTitle>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-200 text-sm">#223JD3</p>
                    <CopyIcon className="cursor-pointer hover:text-slate-300" />
                  </div>
                </div>
              </div>
              <div>
                <ReloadIcon className="w-6 h-6 cursor-pointer hover:text-gray-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mt-1" />
              <span className="text-2xl font-semibold">2340</span>
            </div>
            <div className="flex gap-7 mt-5">
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-500 cursor-pointer flex flex-col justify-center items-center rounded-md shadow-amber-600 shadow-md">
                    <UploadIcon />
                    <span className="text-sm mt-2">Add money</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl">Add money to your wallet</DialogTitle>
                  </DialogHeader>
                  <TopUpForm />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-500 cursor-pointer flex flex-col justify-center items-center rounded-md shadow-amber-600 shadow-md">
                    <DownloadIcon />
                    <span className="text-sm mt-2">Withdrawal</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl">Request Withdrawal</DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-500 cursor-pointer flex flex-col justify-center items-center rounded-md shadow-amber-600 shadow-md">
                    <ShuffleIcon />
                    <span className="text-sm mt-2">Transfer</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl">Transfer money to other wallet</DialogTitle>
                  </DialogHeader>
                  <TransferForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className="py-5 pt-10">
          <div className="flex items-center gap-4 pb-5">
            <h1 className="text-3xl font-semibold">History</h1>
            <UpdateIcon className="size-7 mt-2 cursor-pointer hover:text-slate-600" />
          </div>

          <div className="space-y-5">
            {[1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
              <div key={index}>
                <Card className="bg-transparent px-5 flex flex-row justify-between items-center">
                  {/* left part of order type and date with logo */}
                  <div className="flex items-center gap-5">
                    <div className="bg-accent p-2 rounded-full">
                      <Avatar>
                        <AvatarFallback>
                          <ShuffleIcon className="size-6" />
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="space-y-1">
                      <h1>Buy Asset</h1>
                      <p className="text-sm text-gray-500">2025-04-15</p>
                    </div>
                  </div>
                  {/* right part shows amount */}
                  <div>
                    <p className="text-green-500 text-xl">493 USD</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
