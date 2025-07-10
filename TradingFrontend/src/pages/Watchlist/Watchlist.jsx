import React, { useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../../components/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { addRemoveCoinWatchlist, getWatchlist } from "../../state/Watchlist/Action.js";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const watchlist = useSelector((store) => store.userWatchlist);
  const navigate = useNavigate();

  console.log("watchlist: ", watchlist)

  useEffect(() => {
    dispatch(getWatchlist({token: auth.token}))
  }, [auth.token])

  const handleRemoveToWatchlist = (coinId) => {
    dispatch(addRemoveCoinWatchlist({coinId: coinId, token: auth.token}))
  };

  return (
    <div className="lg:p-20 sm:p-8">
      <div className="flex items-center mb-6 gap-4">
        <BookmarkFilledIcon className="size-8 text-amber-500" />
        <h1 className="font-bold text-3xl text-amber-500">Watchlist</h1>
      </div>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="left py-4">COIN</TableHead>
            <TableHead>SYMBOL</TableHead>
            <TableHead>VOLUME</TableHead>
            <TableHead>MARKET CAP</TableHead>
            <TableHead>24H</TableHead>
            <TableHead>PRICE</TableHead>
            <TableHead className="text-right text-red-600">REMOVE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlist?.coins?.map((item, index) => (
            <TableRow key={index} onClick={() => navigate("/market/" + item.id)}>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage className="size-10" src={item?.image} />
                </Avatar>
                <span>{item?.name}</span>
              </TableCell>
              <TableCell>{item?.symbol}</TableCell>
              <TableCell>{item?.total_volume}</TableCell>
              <TableCell>{item?.market_cap_change_24h}</TableCell>
              <TableCell className={item.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"}>
                {item?.price_change_percentage_24h}%
              </TableCell>
              <TableCell>${item.current_price}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => handleRemoveToWatchlist(item.id)}>
                  <BookmarkFilledIcon className="w-10 h-10" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Watchlist;
