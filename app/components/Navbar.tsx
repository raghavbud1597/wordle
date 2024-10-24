"use client";

import React from "react";
import useTheme from "../hooks/useTheme";
import Image from "next/image";
import WordleLogo from "../assets/wordle.svg";
import { TbKeyboard } from "react-icons/tb";
import { TbKeyboardOff } from "react-icons/tb";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightbulb } from "react-icons/md";
import { IoMdStats } from "react-icons/io";
import Link from "next/link";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex items-center justify-between w-100 border-b-2 p-2 border-black dark:border-white ">
      <span className="flex-1">
        <Link href="/">
          <Image src={WordleLogo} alt="Wordle Logo" className="w-8 h-8" />
        </Link>
      </span>
      <span className="font-secondary text-black text-3xl font-bold dark:text-white flex-1 flex justify-center">
        Wordle
      </span>
      <span className="flex-1 flex justify-end">
        <button className="mx-2">
          <MdOutlineLightbulb onClick={() => {}} className="w-8 h-8" />
        </button>
        <button className="mx-2">
          <IoMdStats onClick={() => {}} className="w-8 h-8" />
        </button>
        <button className="mx-2">
          {false ? (
            <TbKeyboard onClick={() => {}} className="w-8 h-8 animate-fadeIn" />
          ) : (
            <TbKeyboardOff
              onClick={() => {}}
              className="w-8 h-8 animate-fadeIn"
            />
          )}
        </button>
        <button onClick={toggleTheme} className="mx-2">
          {theme === "dark" ? (
            <MdOutlineLightMode className="w-8 h-8 animate-fadeIn" />
          ) : (
            <MdOutlineDarkMode className="w-8 h-8 animate-fadeIn" />
          )}
        </button>
      </span>
    </div>
  );
};

export default Navbar;
