import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { DotIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { Button } from "../../components/button";

const TradingForm = () => {
  const [orderType, setOrderType] = useState("SELL");

  const handleChange = () => {};
  const handleChangeOrderType = () => {
    setOrderType((prev) => (prev == "BUY" ? "SELL" : "BUY"));
  };

  return (
    <div className="space-y-8 p-5">
      {/* amount and quantity */}
      <div>
        <div className="flex items-center gap-2 justify-between">
          <input
            type="text"
            className=" text-xl focus:outline-none py-2 rounded-md border px-2 w-full"
            placeholder="Enter amount..."
            onChange={handleChange}
            name="amount"
          />
          <div>
            <p className="border text-xl flex justify-center items-center w-36 h-12 rounded-md">3453</p>
          </div>
        </div>
        {false && <h1 className="text-center text-red-600 pt-4">Insufficient wallet balance to buy</h1>}
      </div>

      {/* 2nd part (coin details) */}
      <div>
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
      </div>

      {/* order type and balance remaining */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <p>Order Type</p>
          <p>{orderType}</p>
        </div>

        <div className="flex items-center justify-between">
          <p>{orderType == "BUY" ? "Available Balance" : "Available Quantity"}</p>
          <p>{orderType == "BUY" ? "$4324" : "984"}</p>
        </div>
      </div>

      {/* buy and sell option buttons */}
      <div className="w-full space-y-4">
        <Button className={orderType == "BUY" ? "bg-green-600 hover:bg-green-700 text-xl py-5 w-full" : "bg-red-600 w-full hover:bg-red-700 text-xl py-5"}>
          {orderType == "BUY" ? "BUY" : "SELL"}
        </Button>
        <button onClick={handleChangeOrderType} className="w-full text-center hover:underline" variant="ghost">
          or {orderType == "BUY" ? "SELL" : "BUY"}
        </button>
      </div>
    </div>
  );
};

export default TradingForm;
