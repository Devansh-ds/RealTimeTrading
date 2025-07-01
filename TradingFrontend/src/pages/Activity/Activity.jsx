import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../../components/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";

const Activity = () => {
  return (
    <div className="lg:p-20 sm:p-8">
      <h1 className="font-bold text-3xl mb-6 text-amber-500">Trading History</h1>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="left py-4">DATE & TIME</TableHead>
            <TableHead>COIN</TableHead>
            <TableHead>BUY PRICE</TableHead>
            <TableHead>SELL PRICE</TableHead>
            <TableHead>ORDER TYPE</TableHead>
            <TableHead>PROFIT/LOSS</TableHead>
            <TableHead className="">VALUE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 1, 1, 1, 1].map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <p>2024/05/31</p>
                <p className="text-gray-400">12:39:15</p>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage className="size-10" src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" />
                </Avatar>
                <span>Bitcoin</span>
              </TableCell>
              <TableCell>$456.3422</TableCell>
              <TableCell>$0</TableCell>
              <TableCell>BUY</TableCell>
              <TableCell>-</TableCell>
              <TableCell className="">$560</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Activity;
