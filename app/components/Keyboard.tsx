/**
 * Keyboard.tsx
 *
 * This component renders an interactive keyboard for gameplay, allowing users to enter letters,
 * delete input, and submit guesses via the "Enter" button. Each key displays feedback indicating
 * whether the guessed letters are correct, misplaced, or absent, based on the `keyFeedback` prop.
 *
 * Props:
 * - `onKeyPress`: A function triggered when a letter key is pressed, passing the selected letter.
 * - `onDelete`: A function that executes when the "Delete" key is pressed.
 * - `onEnter`: A function that executes when the "Enter" key is pressed to submit a guess.
 * - `keyFeedback`: An object providing feedback scores (0, 1, or 2) for each letter, affecting the key's styling.
 *
 * Key Features:
 * - Renders three rows of letter keys (`topRow`, `middleRow`, `bottomRow`) styled based on feedback.
 * - Keys update styles dynamically based on `keyFeedback`:
 *   - Green for correct letters, yellow for misplaced, and gray for absent.
 * - Enter and Delete buttons are positioned with the bottom row.
 *
 */

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
        className={`md:rounded-md text-xs w-8 h-8 md:text-lg md:w-10 md:h-10 font-bold border-2 shadow-lg shadow-slate-300 dark:shadow-slate-800 ${getKeyClass(letter)}`}
        aria-label={`Key ${letter}`}
      >
        {letter}
      </button>
    ));
  };

  return (
    <div className="flex flex-col items-center md:space-y-2 mt-4 md:py-4">
      {/* Top row */}
      <div className="flex md:space-x-1 lg:space-x-2">{renderKeyRow(topRow)}</div>

      {/* Middle row */}
      <div className="flex md:space-x-1 lg:space-x-2">{renderKeyRow(middleRow)}</div>

      {/* Bottom row with Enter and Delete */}
      <div className="flex md:space-x-1 lg:space-x-2">
        <button
          onClick={onDelete}
          className="p-1 md:p-2 md:px-4 bg-red-500 text-white md:rounded-md shadow-lg shadow-slate-300 dark:shadow-slate-800"
          aria-label="Delete"
        >
          Delete
        </button>
        {renderKeyRow(bottomRow)}
        <button
          onClick={onEnter}
          className="p-1 md:p-2 md:px-4 bg-blue-500 text-white md:rounded-md shadow-lg shadow-slate-300 dark:shadow-slate-800"
          aria-label="Enter"
        >
          Enter
        </button>
      </div>
    </div>
  );
}
