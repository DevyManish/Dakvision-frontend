"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import {
  LogOut,
  CircleUserRound,
  Ticket,
  IndianRupee,
  Package,
} from "lucide-react";

const UserAvatar = () => {
  const { user, logout } = useAuth();

  const nameShorter = (name) => {
    const namePart = name.split(" ");
    const firstChar = namePart[0]?.charAt(0).toUpperCase() || "";
    const lastChar = namePart[1]?.charAt(0).toUpperCase() || "";
    return firstChar + lastChar;
  };

  const shortName = user?.name ? nameShorter(user.name) : "";
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <Avatar className="h-9 w-9 border-2 ">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{shortName}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {" "}
            <button>
              <div className="flex items-center space-x-3">
                <CircleUserRound size={18} className="mt-1" />
                <div className="">Profile</div>
              </div>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button onClick={logout}>
              <div className="flex items-center space-x-3">
                <LogOut size={16} className="mt-1" />
                <div className="">Logout</div>
              </div>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {" "}
            <button>
              <div className="flex items-center space-x-3">
                <Ticket size={18} className="mt-1" />
                <div className="">Bookings</div>
              </div>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {" "}
            <button>
              <div className="flex items-center space-x-3">
                <IndianRupee size={18} className="mt-1" />
                <div className="">Transactions</div>
              </div>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {" "}
            <button>
              <div className="flex items-center space-x-3">
                <Package size={18} className="mt-1" />
                <div className="">Parcels</div>
              </div>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserAvatar;
