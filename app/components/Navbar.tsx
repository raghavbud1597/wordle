"use client";

import React from "react";
import useTheme from "../hooks/useTheme";
import Image from "next/image";
import WordleLogo from "../assets/wordle.svg";
import { TbKeyboard } from "react-icons/tb";
import { TbKeyboardOff } from "react-icons/tb";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex items-center justify-between w-100 border-b-2 p-2 border-black dark:border-white ">
      <span className="w-8 h-8">
        <Image src={WordleLogo} alt="Wordle Logo" />
      </span>
      <span className="font-secondary text-black text-4xl font-bold dark:text-white">
        Wordle
      </span>
      <span>
        <button>
          {true ? (
            <TbKeyboard onClick={()=>{}} className="w-8 h-8 animate-fadeIn" />
          ) : (
            <TbKeyboardOff onClick={()=>{}} className="w-8 h-8 animate-fadeIn" />
          )}
        </button>
        <button onClick={toggleTheme} className="mx-2">
          {theme === "dark" ? (
            <CiLight className="w-8 h-8 animate-fadeIn" />
          ) : (
            <CiDark className="w-8 h-8 animate-fadeIn" />
          )}
        </button>
      </span>
    </div>
  );
};

export default Navbar;
