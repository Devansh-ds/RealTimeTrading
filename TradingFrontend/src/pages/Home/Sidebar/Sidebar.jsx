import { ActivityLogIcon, BookmarkIcon, DashboardIcon, ExitIcon, HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "../../../components/button";
import { SheetClose } from "../../../components/sheet";
import { CreditCardIcon, LandmarkIcon, Wallet, Wallet2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../../state/Auth/ActionType.js";

const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className="size-5" /> },
  { name: "Portfolio", path: "/portfolio", icon: <DashboardIcon className="size-5" /> },
  { name: "Watchlist", path: "/watchlist", icon: <BookmarkIcon className="size-5" /> },
  { name: "Activity", path: "/activity", icon: <ActivityLogIcon className="size-5" /> },
  { name: "Wallet", path: "/wallet", icon: <Wallet2Icon className="size-5" /> },
  { name: "Payment Details", path: "/payment-details", icon: <LandmarkIcon className="size-5" /> },
  { name: "Withdrawal", path: "/withdrawal", icon: <CreditCardIcon className="size-5" /> },
  { name: "Profile", path: "/profile", icon: <PersonIcon className="size-5" /> },
  { name: "Logout", action: "logout", icon: <ExitIcon className="size-5" /> },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (item) => {
    if (item.action && item.action === "logout") {
      dispatch({ type: LOGOUT });
      localStorage.removeItem("authToken");
    } else {
      navigate(item.path);
    }
  };

  return (
    <div className="mt-2 space-y-5 mx-5">
      {menu.map((item) => (
        <div key={item.name}>
          <SheetClose className="w-full">
            <Button variant="outline" className="flex items-center justify-start py-[23px] w-full gap-10 px-5" onClick={() => handleClick(item)}>
              <span className="">{item.icon}</span>
              <p className="text-[20px]">{item.name}</p>
            </Button>
          </SheetClose>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
