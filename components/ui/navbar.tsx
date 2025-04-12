import React from "react";
import { Button } from "./button";
import Image from "next/image";

function Navbar() {
  return (
    <div className="pl-5 pr-5">
      <div className="flex flex-row items-center  justify-between gap-4 h-15">
        <a href="/">
          <Image
            src="/sanyuk-logo.png" // Make sure the image is in the public folder
            alt="Sanyuk Logo"
            width={150}
            height={40}
            priority
          />
        </a>
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
