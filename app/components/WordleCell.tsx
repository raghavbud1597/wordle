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
 *    - `0`: Letter is not present in the word (gray background).
 *    - `1`: Letter is present but in the wrong position (yellow background).
 *    - `2`: Letter is present and in the correct position (green background).
 *    - `3`: Represents the current attempt cell (highlighted for user input).
 */

"use client";

interface WordleCellProps {
  letter: string;
  score?: number;
}

export default function WordleCell({ letter, score }: WordleCellProps) {
  let cellColor:string = "border-black dark:border-white"; // Empty cell

  if(letter !== "") {
    if (score === 0) {
      cellColor = "text-white bg-slate-500"; // Not Present
    } else if (score === 1) {
      cellColor = "text-white bg-yellow-600"; // Misplaced
    } else if (score === 2) {
      cellColor = "text-white bg-green-600"; // Correct
    } else {
      cellColor = "text-black border-black dark: text-white dark:border-white"; // Current Attempt Cell
    }
  }
  

  return (
    <div className={`w-12 h-12 flex items-center justify-center border-2 rounded ${cellColor}`}>
      <span className="text-xl font-bold">{letter}</span>
    </div>
  );
}
