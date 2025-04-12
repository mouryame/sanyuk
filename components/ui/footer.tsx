import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoIosPhonePortrait } from "react-icons/io";

function Footer() {
  return (
    <>
      <div className="flex text-sm flex-row justify-between gap-2">
        <div className="flex flex-col">
          <h3>Contact</h3>
          <div className="flex items-center flex-row gap-2">
            <IoIosPhonePortrait />
            <p>91+ 9999999999999</p>
          </div>
          <div className="flex items-center flex-row gap-2">
            <HiOutlineMailOpen />
            <a href="mailto:cornia@gmail.com">Cornia@gmail.com</a>
          </div>

          <div className="flex flex-row gap-2">
            <FaLinkedin />
            <a href="https://www.linkedin.com/in/vamsi-bannu-996/">LinkedIn</a>
          </div>
        </div>
        <div>
          <p>Powered by Cornia</p>
          <div className="font-thin">
            Copyright © 2025 SANYUK. Copyrights reserved.
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
