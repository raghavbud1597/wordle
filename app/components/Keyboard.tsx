"use client";

import React, { useMemo } from "react";

interface KeyboardProps {
  onKeyPress: (letter: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  keyFeedback: { [key: string]: number };
}

export default function Keyboard({
  onKeyPress,
  onDelete,
  onEnter,
  keyFeedback,
}: KeyboardProps) {
  const topRow = "QWERTYUIOP".split("");
  const middleRow = "ASDFGHJKL".split("");
  const bottomRow = "ZXCVBNM".split("");

  // Memoized function to determine the class of each key based on feedback
  const getKeyClass = useMemo(
    () => (letter: string) => {
      const score = keyFeedback[letter] ?? -1; // Default to -1 if no score
      switch (score) {
        case 2:
          return "bg-green-600 text-white border-green-800"; // Correct
        case 1:
          return "bg-yellow-600 text-white border-yellow-800"; // Misplaced
        case 0:
          return "bg-slate-700 text-white border-slate-500"; // Not Present
        default:
          return "bg-slate-300 text-black dark:bg-slate-500 dark:text-white border-slate-400"; // Default
      }
    },
    [keyFeedback]
  );

  // Reusable function to render a row of keys
  const renderKeyRow = (letters: string[]) => {
    return letters.map((letter) => (
      <button
        key={letter}
        onClick={() => onKeyPress(letter)}
        className={`rounded-md text-sm w-8 h-8 md:text-lg md:w-10 md:h-10 font-bold border-2 shadow-lg shadow-slate-300 dark:shadow-slate-800 ${getKeyClass(letter)}`}
        aria-label={`Key ${letter}`}
      >
        {letter}
      </button>
    ));
  };

  return (
    <div className="flex flex-col items-center space-y-2 mt-4 md:py-4">
      {/* Top row */}
      <div className="flex space-x-1 md:space-x-2">{renderKeyRow(topRow)}</div>

      {/* Middle row */}
      <div className="flex space-x-1 md:space-x-2">{renderKeyRow(middleRow)}</div>

      {/* Bottom row with Enter and Delete */}
      <div className="flex space-x-1 md:space-x-2">
        <button
          onClick={onDelete}
          className="p-1 px-2 md:p-2 md:px-4 bg-red-500 text-white rounded-md shadow-lg shadow-slate-300 dark:shadow-slate-800"
          aria-label="Delete"
        >
          Delete
        </button>
        {renderKeyRow(bottomRow)}
        <button
          onClick={onEnter}
          className="p-2 px-4 bg-blue-500 text-white rounded-md shadow-lg shadow-slate-300 dark:shadow-slate-800"
          aria-label="Enter"
        >
          Enter
        </button>
      </div>
    </div>
  );
}
