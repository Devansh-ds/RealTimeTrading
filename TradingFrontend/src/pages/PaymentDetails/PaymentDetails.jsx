import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/dialog";
import { Button } from "../../components/button";
import PaymentDetailsForm from "./PaymentDetailsForm";

const PaymentDetails = () => {
  return (
    <div className="px-20">
      <h1 className="text-3xl text-amber-500 font-bold py-10">Payment Details</h1>
      {true ? (
        <Card>
          <CardHeader>
            <CardTitle>Yes Bank</CardTitle>
            <CardDescription>A/C No.: *****************343</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <p className="w-25">A/C Holder:</p>
              <p className="text-gray-500">John Cena</p>
            </div>
            <div className="flex items-center">
              <p className="w-25">IFSC Code:</p>
              <p className="text-gray-500">IBKL3450</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Dialog>
          <DialogTrigger>
            <Button>Add payment details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Payment Details</DialogTitle>
            </DialogHeader>
            <PaymentDetailsForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentDetails;
