"use client";

import WordleCell from "./WordleCell";

interface WordleRowProps {
  word: string[]; // Word array
  feedback?: number[]; // Feedback array with scores
}

export default function WordleRow({ word, feedback = [] }: WordleRowProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {word.map((letter, index) => (
        <WordleCell key={index} letter={letter} score={feedback[index] || 0} />
      ))}
    </div>
  );
}
