"use client";

import WordleRow from "./WordleRow";

interface WordleBoardProps {
  attempts: string[][];
  feedback: number[][];
  currentGuess: number;
}

export default function WordleBoard({ attempts, feedback, currentGuess }: WordleBoardProps) {
  return (
    <div className="grid grid-rows-6 gap-2">
      {attempts.map((attempt:string[], index:number) => (
        <WordleRow key={index} word={attempt} feedback={feedback[index]} />
      ))}
    </div>
  );
}
