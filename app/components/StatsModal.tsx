/**
 * StatsModal Component
 * 
 * This modal displays the game statistics for the Wordle game, including
 * the number of games played, win percentage, current streak, max streak,
 * and guess distribution. The modal is responsive and allows for scrolling
 * when content exceeds a certain height, ensuring the close button is always
 * accessible. Users can reset their game stats from this modal.
 */

"use client";

import React from "react";
import { useGameStats } from "../hooks/useGameStats";
import Modal from "./Modal";

type GameStats = {
  played: number;
  winPercentage: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
  resetStats: () => void;
};

const StatsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const {
    played,
    winPercentage,
    currentStreak,
    maxStreak,
    guessDistribution,
    resetStats,
  }: GameStats = useGameStats();

  // Function to handle resetting the stats
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your game stats?")) {
      resetStats();
    }
  };

  return (
    <Modal title="Game Statistics" onClose={onClose}>
      <div className="max-h-[70vh] overflow-y-auto mb-6">
        <div className="grid grid-cols-2 gap-4 text-center">
          {/* Stat Columns */}
          <StatCard label="Played" value={played} />
          <StatCard label="Win %" value={winPercentage} />
          <StatCard label="Current Streak" value={currentStreak} />
          <StatCard label="Max Streak" value={maxStreak} />
        </div>

        {/* Guess Distribution */}
        <h4 className="font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
          Guess Distribution
        </h4>
        <ul className="space-y-2">
          {guessDistribution.map((count, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-2 rounded-lg"
            >
              <span className="font-bold text-lg text-gray-800 dark:text-gray-200">
                Attempt {idx + 1}:
              </span>
              <span className="text-xl font-bold bg-gray-300 dark:bg-gray-600 py-1 px-4 rounded-md text-gray-900 dark:text-gray-100">
                {count}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Reset Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleReset}
          className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700"
        >
          Reset Stats
        </button>
      </div>
    </Modal>
  );
};

// StatCard component to encapsulate the logic for displaying individual stats
const StatCard: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
    <h4 className="font-bold text-gray-800 dark:text-gray-200">{label}</h4>
    <p className="text-2xl font-extrabold bg-gray-300 dark:bg-gray-600 rounded-md py-2 text-gray-900 dark:text-gray-100">
      {value}
    </p>
  </div>
);

export default StatsModal;
