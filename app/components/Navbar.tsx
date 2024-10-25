/**
 * Navbar.tsx
 *
 * This component renders the navigation bar for the Wordle game.
 * It includes the Wordle logo, game title, and several buttons for user interactions:
 * - A button to display the "How to Play" modal.
 * - A button to show game statistics.
 * - A button to reset the game with a confirmation modal.
 * - A button to toggle the on-screen keyboard visibility.
 * - A button to switch between light and dark themes.
 * 
 * The component utilizes localStorage to manage the game state and performs a page reload 
 * to reset the game. Modals are conditionally rendered based on the component's state.
 */

"use client";

import React, { useState } from "react";
import useTheme from "../hooks/useTheme";
import { redirect } from 'next/navigation';
import Image from "next/image";
import WordleLogo from "../assets/wordle.svg";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightbulb } from "react-icons/md";
import { IoMdStats } from "react-icons/io";
import { BiReset } from "react-icons/bi";
import Link from "next/link";
import Modal from "./Modal";
import HowToPlayModal from "./HowToPlayModal";
import StatsModal from "./StatsModal";

// Function to reset the game and clear localStorage
const resetGame = () => {
  localStorage.removeItem("wordleGameState"); 
  redirect('/');
};

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const [showHowToPlayModal, setShowHowToPlayModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  return (
    <div className="flex items-center justify-between w-100 border-b-2 p-2 border-black dark:border-white">
      <span className="flex-1">
        <Link href="/">
          <Image src={WordleLogo} alt="Wordle Logo" className="w-8 h-8" />
        </Link>
      </span>
      <span className="font-secondary text-black text-3xl font-bold dark:text-white flex-1 justify-center hidden md:flex">
        Wordle
      </span>
      <span className="flex-1 flex justify-end">
        {/* How to Play Button */}
        <button className="mx-2">
          <MdOutlineLightbulb
            onClick={() => setShowHowToPlayModal(true)}
            className="w-8 h-8"
          />
        </button>
        {/* Stats Button */}
        <button className="mx-2">
          <IoMdStats
            onClick={() => setShowStatsModal(true)}
            className="w-8 h-8"
          />
        </button>
        {/* Reset Game Button */}
        <button className="mx-2">
          <BiReset onClick={() => setShowResetModal(true)} className="w-8 h-8" />
        </button>
        {/* Theme Toggle Button */}
        <button onClick={toggleTheme} className="mx-2">
          {theme === "dark" ? (
            <MdOutlineLightMode className="w-8 h-8 animate-fadeIn" />
          ) : (
            <MdOutlineDarkMode className="w-8 h-8 animate-fadeIn" />
          )}
        </button>
      </span>

      {/* Render How to Play Modal */}
      {showHowToPlayModal && <HowToPlayModal onClose={() => setShowHowToPlayModal(false)} />}

      {/* Render Stats Modal */}
      {showStatsModal && <StatsModal onClose={() => setShowStatsModal(false)} />}

      {/* Render Reset Confirmation Modal */}
      {showResetModal && (
        <Modal onClose={() => setShowResetModal(false)} title="Reset Game">
          <p>Are you sure you want to reset the game?</p>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                resetGame();
                setShowResetModal(false);
              }}
              className="mx-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Reset
            </button>
            <button
              onClick={() => setShowResetModal(false)}
              className="mx-2 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Navbar;
