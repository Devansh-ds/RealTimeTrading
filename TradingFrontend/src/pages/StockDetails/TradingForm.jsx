import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { DotIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { Button } from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { buyAsset } from "../../state/Asset/Action.js";
import { getWallet } from "../../state/Auth/Action";
import { DialogClose } from "../../components/dialog";

const TradingForm = () => {
  const [orderType, setOrderType] = useState("SELL");
  const [quantity, setQuantity] = useState(0);
  const auth = useSelector((store) => store.auth);
  const currCoin = useSelector((store) => store.allCoins.currCoin);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (!isNaN(e.target.value)) {
      setQuantity(e.target.value);
    }
  };
  const handleChangeOrderType = () => {
    setOrderType((prev) => (prev == "BUY" ? "SELL" : "BUY"));
  };

  const handleBuySell = async () => {
    if (quantity > 0) {
      try {
        await dispatch(
          buyAsset({
            token: auth.token,
            req: {
              coinId: currCoin.id,
              quantity: quantity,
              orderType: orderType,
            },
          })
        );

        // Now refresh the wallet
        dispatch(getWallet({ token: auth.token }));
      } catch (error) {
        console.error("Buy/Sell failed:", error);
      }
    }
  };

  return (
    <div className="space-y-8 p-5">
      {/* quantity and its price */}
      <div>
        <div className="flex items-center gap-2 justify-between">
          <input
            type="text"
            className=" text-xl focus:outline-none py-2 rounded-md border px-4 w-full"
            placeholder="Enter quantity..."
            onChange={handleChange}
            name="amount"
            value={quantity}
          />
          <div>
            <p className="border text-xl p-2 flex justify-center items-center w-36 h-12 rounded-md" placeholder="Quantity...">
              ${(currCoin?.market_data.current_price.usd * quantity).toFixed(2)}
            </p>
          </div>
        </div>
        {orderType == "BUY" && auth?.userWallet?.balance < currCoin?.market_data.current_price.usd * quantity && (
          <h1 className="text-center text-red-600 pt-4">Insufficient wallet balance to buy</h1>
        )}
      </div>

      {/* 2nd part (coin details) */}
      <div>
        <div className="flex gap-5 items-center">
          <div>
            <Avatar>
              <AvatarImage src={currCoin?.image.large} className="size-15" />
            </Avatar>
          </div>
          <div className="flex gap-1 flex-col">
            <div className="flex items-center gap-2">
              <p>{currCoin?.symbol.toUpperCase()}</p>
              <DotIcon />
              <p>{currCoin?.name}</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold">${currCoin?.market_data.current_price.usd}</p>
              <p>
                <span className={currCoin?.market_data.price_change_24h_in_currency.usd < 0 ? "text-red-500" : "text-green-500"}>
                  <span>{currCoin?.market_data.price_change_24h_in_currency.usd}</span>
                  <span>({currCoin?.market_data.price_change_percentage_24h_in_currency.usd}%)</span>
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
          <p>{orderType == "BUY" ? `$${auth?.userWallet?.balance}` : "984"}</p>
        </div>
      </div>

      {/* buy and sell option buttons */}
      <div className="w-full space-y-4">
        <DialogClose className="w-full">
          <Button
            className={orderType == "BUY" ? "bg-green-600 hover:bg-green-700 text-xl py-5 w-full" : "bg-red-600 w-full hover:bg-red-700 text-xl py-5"}
            onClick={handleBuySell}
          >
            {orderType == "BUY" ? "BUY" : "SELL"}
          </Button>
        </DialogClose>
        <button onClick={handleChangeOrderType} className="w-full text-center hover:underline" variant="ghost">
          or {orderType == "BUY" ? "SELL" : "BUY"}
        </button>
      </div>
    </div>
  );
};

export default TradingForm;
