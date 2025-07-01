import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { BookmarkFilledIcon, DotIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { Button } from "../../components/button";
import { BookmarkIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/dialog";
import TradingForm from "./TradingForm";
import StockChart from "../Home/StockChart";

const StockDetails = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const changeBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className="p-5 mt-5 space-y-6">
      <div className="flex justify-between">
        {/* heading left part */}
        <div className="flex gap-5 items-center">
          <div>
            <Avatar>
              <AvatarImage src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" className="size-15" />
            </Avatar>
          </div>
          <div className="flex gap-1 flex-col">
            <div className="flex items-center gap-2">
              <p>BTC</p>
              <DotIcon />
              <p>Bitcoin</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold">$6554</p>
              <p>
                <span className="text-red-600">
                  <span>-13284348932.433</span>
                  <span>(-0.342242%)</span>
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* heading right part */}
        <div className="flex items-center gap-3 mr-4">
          <Button onClick={changeBookmark} variant="outline">
            {isBookmarked ? <BookmarkFilledIcon className="size-6" /> : <BookmarkIcon className="size-6" />}
          </Button>
          <Dialog>
            <DialogTrigger>
              <Button className="text-xl px-8">Trade</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>How much do you want to spend?</DialogTitle>
              </DialogHeader>
              <TradingForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <StockChart />
    </div>
  );
};

export default StockDetails;
