import React, { useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../../components/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { allWithdrawals } from "../../state/Money/Action.js";

const Withdrawal = () => {
  const auth = useSelector((store) => store.auth);
  const withdrawals = useSelector((store) => store.withdrawals);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allWithdrawals({ token: auth.token }));
  }, [auth.token, withdrawals.currentWithdrawal]);

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
          {withdrawals?.allWithdrawals?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <p>{item.dateTime.split("T")[0]}</p>
                <p className="text-gray-400">{item.dateTime.split("T")[1].split(".")[0]}</p>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-2">Bank Account</TableCell>

              <TableCell>${item.amount}</TableCell>
              <TableCell className="flex justify-center">
                <div className={item.status == "SUCCESS"? "p-2 text-center font-bold rounded-md bg-green-500 w-20": "p-2 text-center font-bold rounded-md bg-red-500 w-20"}>{item.status}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Withdrawal;
