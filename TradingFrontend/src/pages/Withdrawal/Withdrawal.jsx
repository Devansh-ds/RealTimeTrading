import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../../components/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";

const Withdrawal = () => {
  return (
    <div className="lg:p-20 sm:p-8">
      <h1 className="font-bold text-3xl mb-6 text-amber-500">Withdrawal</h1>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="left py-4">DATE & TIME</TableHead>
            <TableHead>METHOD</TableHead>
            <TableHead>AMOUNT</TableHead>
            <TableHead className="text-center">STATUS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 1, 1, 1, 1].map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <p>2024/05/31</p>
                <p className="text-gray-400">12:39:15</p>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-2">Bank Account</TableCell>

              <TableCell>$67</TableCell>
              <TableCell className="flex justify-center">
                <div className="p-2 text-center font-bold rounded-md bg-green-500 w-20">Success</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Withdrawal;
