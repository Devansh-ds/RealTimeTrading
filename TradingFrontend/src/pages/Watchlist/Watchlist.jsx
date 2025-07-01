import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../../components/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";

const Watchlist = () => {
  const handleRemoveToWatchlist = (value) => {
    console.log(value);
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
          {[1, 1, 1, 1, 1].map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage className="size-10" src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" />
                </Avatar>
                <span>Bitcoin</span>
              </TableCell>
              <TableCell>BTC</TableCell>
              <TableCell>43252453</TableCell>
              <TableCell>3241324242341</TableCell>
              <TableCell>-0.43453%</TableCell>
              <TableCell>$0.3432430</TableCell>
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
