"use client";

import WordleRow from "./WordleRow";

interface WordleBoardProps {
  attempts: string[];
  feedback: number[][];
  currentGuess: string;
}

export default function WordleBoard({ attempts, feedback, currentGuess }: WordleBoardProps) {
  return (
    <div className="grid grid-rows-6 gap-2">
      {attempts.map((attempt, index) => (
        <WordleRow key={index} word={attempt} feedback={feedback[index]} />
      ))}
      {attempts.length < 6 && <WordleRow word={currentGuess} />}
    </div>
  );
}
