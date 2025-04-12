import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import React from "react";
import { Button } from "./button";

function Navbar() {
  return (
    <div className="pl-5 pr-5">
      <div className="flex flex-row items-center  justify-between gap-4 h-15">
        <h1>
          <a href="/">SANYUK</a>
        </h1>
        <div className="flex gap-2">
          <Button variant="default" size="sm">
            Sign In
          </Button>
          <Button variant="secondary" size="sm">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
