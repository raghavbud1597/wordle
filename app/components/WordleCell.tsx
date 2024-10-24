/**
 * WordleCell.tsx
 * 
 * This component renders a single cell in the Wordle game grid. Each cell displays a letter from the player's
 * current attempt, and the background color of the cell reflects the correctness of the letter based on the 
 * score provided.
 * 
 * Props:
 * - `letter`: The letter to display inside the cell.
 * - `score`: Optional. A number representing feedback on the letter. It can be one of the following:
 *    - `-1`: Represents the current attempt cell (highlighted for user input).
 *    - `0`: Letter is not present in the word (gray background).
 *    - `1`: Letter is present but in the wrong position (yellow background).
 *    - `2`: Letter is present and in the correct position (green background).
 *    
 */

"use client";

import React from "react";

interface WordleCellProps {
  letter: string;
  score?: number;
}

const WordleCell = ({ letter, score }: WordleCellProps) => {
  const animationClass = letter ? "animate-growShrink" : "";
  
  const cellColor = {
    0: "text-white bg-slate-500 border-slate-400", // Not Present
    1: "text-white bg-yellow-600 animate-rotate border-yellow-800", // Misplaced
    2: "text-white bg-green-600 animate-rotate border-green-800", // Correct
    default: "text-black border-black dark:text-white dark:border-white", // Current attempt or empty
  }[score ?? "default"]; // fallback to default color for current attempt/empty

  return (
    <div className={`w-12 h-12 flex items-center justify-center border-2 rounded ${cellColor} ${animationClass}`}>
      <span className="text-xl font-bold">{letter}</span>
    </div>
  );
};

export default WordleCell;
