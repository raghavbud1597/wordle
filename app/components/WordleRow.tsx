"use client";

import WordleCell from "./WordleCell";

interface WordleRowProps {
  word: string;
  feedback?: number[]; // Feedback array with scores
}

export default function WordleRow({ word, feedback = [] }: WordleRowProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: 5 }).map((_, idx) => (
        <WordleCell key={idx} letter={word[idx] || ""} score={feedback[idx]} />
      ))}
    </div>
  );
}
