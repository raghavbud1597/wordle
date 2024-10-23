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
    } else if (score === 3) {
      cellColor = "text-black border-black dark: text-white dark:border-white"; // Current Attempt Cell
    }
  }
  

  return (
    <div className={`w-12 h-12 flex items-center justify-center border-2 rounded ${cellColor}`}>
      <span className="text-xl font-bold">{letter}</span>
    </div>
  );
}
