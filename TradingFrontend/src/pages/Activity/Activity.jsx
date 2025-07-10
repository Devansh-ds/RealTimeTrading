import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../../components/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";

const Activity = () => {
  const assets = useSelector((store) => store.assets);

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
          {assets?.assetHistory?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <p>{item.timeStamp.split("T")[0]}</p>
                <p className="text-gray-400">{item.timeStamp.split("T")[1].split(".")[0]}</p>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage className="size-10" src={item?.orderItem?.coin?.image} />
                </Avatar>
                <span>{item?.orderItem?.coin?.name}</span>
              </TableCell>
              <TableCell>${item?.orderItem?.buyPrice}</TableCell>
              <TableCell>${item?.orderItem?.sellPrice}</TableCell>
              <TableCell>{item.orderType}</TableCell>
              <TableCell>-</TableCell>
              <TableCell className="">${item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Activity;
