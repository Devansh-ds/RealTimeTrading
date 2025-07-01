import React from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../../../components/sheet";
import { DragHandleHorizontalIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "../../../components/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Sidebar from "../Sidebar/Sidebar";

const Navbar = () => {
  return (
    <>
      <div className="px-2 py-3 border-b z-50 bg-background sticky top-0 left-0 right- flex justify-between items-center pr-5">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger>
              <Button variant="ghost" size="icon" className="rounded-full h-11 w-11 p-0">
                <DragHandleHorizontalIcon className="h-7 w-7 size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-72 border-r-0 flex flex-col justify-start mt-2" side="left">
              <SheetHeader>
                <SheetTitle>
                  <div className="text-3xl flex justify-center items-center gap-1">
                    <Avatar className="w-10 mr-2">
                      <AvatarImage src="https://cdn.pixabay.com/photo/2022/02/22/22/19/btcore-snail-7029697_1280.png" />
                    </Avatar>
                    <div>
                      <span className="font-bold text-orange-500">AZ </span>
                      <span>Trading</span>
                    </div>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <Sidebar />
            </SheetContent>
          </Sheet>
          <p className="lg:text-base cursor-pointer">AZ Trading</p>
          <div className="p-0 ml-5">
            <Button variant="outline" className="flex items-center gap-3">
              <MagnifyingGlassIcon />
              <span>Search</span>
            </Button>
          </div>
        </div>
        <div>
          <Avatar>
            <AvatarFallback>AZ</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
};

export default Navbar;
