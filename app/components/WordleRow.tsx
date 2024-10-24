/**
 * WordleRow.tsx
 *
 * This component is responsible for rendering a row of guessed letters in the Wordle game. It takes
 * the player's guessed word and corresponding feedback to provide a visual cue for each letter.
 * Feedback could indicate whether the letter is incorrect, correct but in the wrong position, or
 * correct and in the correct position.
 *
 * Props:
 * - `word`: An array of letters representing the guessed word.
 * - `feedback`: An optional array of numbers representing feedback for each letter. If no feedback
 *    is provided, the component defaults to a score of `-1` for that letter.
 */

"use client";

import WordleCell from "./WordleCell";

interface WordleRowProps {
  word: string[]; 
  feedback?: number[];
}

export default function WordleRow({ word, feedback = [] }: WordleRowProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {word.map((letter, index) => (
        <WordleCell key={index} letter={letter} score={index < feedback.length ? feedback[index] : -1} />
      ))}
    </div>
  );
}
