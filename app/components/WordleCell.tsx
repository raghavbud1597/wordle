"use client";

interface WordleCellProps {
  letter: string;
  score?: number;
}

export default function WordleCell({ letter, score }: WordleCellProps) {
  let bgColor = "bg-gray-300";

  if (score === 1) {
    bgColor = "bg-yellow-400"; // Misplaced
  } else if (score === 2) {
    bgColor = "bg-green-500"; // Correct
  }

  return (
    <div className={`w-12 h-12 flex items-center justify-center border rounded ${bgColor}`}>
      <span className="text-xl font-bold">{letter}</span>
    </div>
  );
}
