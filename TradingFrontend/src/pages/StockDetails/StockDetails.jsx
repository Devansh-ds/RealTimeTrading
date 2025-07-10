import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { BookmarkFilledIcon, DotIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Button } from "../../components/button";
import { BookmarkIcon } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/dialog";
import TradingForm from "./TradingForm";
import StockChart from "../Home/StockChart";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCoinById } from "../../state/Coin/Action.js";
import { addRemoveCoinWatchlist } from "../../state/Watchlist/Action.js";

const StockDetails = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const currCoin = useSelector((store) => store.allCoins.currCoin);
  const watchlist = useSelector((store) => store.userWatchlist);
  const navigate = useNavigate();

  const changeBookmark = () => {
    dispatch(addRemoveCoinWatchlist({ coinId: currCoin.id, token: auth.token }));
    setIsBookmarked((prev) => !prev);
  };

  const { id } = useParams();

  useEffect(() => {
    console.log("id: ", id);
    dispatch(getCoinById({ id, token: auth.token }));

    const foundCoin = watchlist?.coins?.find((coin) => coin.id === id);
    setIsBookmarked(foundCoin != null);
  }, [id]);

  return (
    <div className="p-5 mt-5 space-y-6">
      <div className="flex justify-between">
        {/* heading left part */}
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
                <DialogTitle className="text-center">How much do you want to buy/sell?</DialogTitle>
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
