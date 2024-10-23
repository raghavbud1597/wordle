/**
 * WordleBoard.tsx
 * 
 * This component is responsible for rendering the game board of Wordle. It displays the rows of 
 * attempted words along with feedback for each row. The feedback provides hints or visual cues 
 * based on the correctness of the player's guess.
 * 
 * Props:
 * - `attempts`: A 2D array representing the player's attempts (each word is an array of letters).
 * - `feedback`: A 2D array of numbers representing feedback for each attempt. Feedback could be used 
 *    to indicate correct, incorrect, or misplaced letters (e.g., 0 for wrong letter, 1 for correct 
 *    letter but wrong position, 2 for correct letter and position).
 */

"use client"; 

import WordleRow from "./WordleRow";

interface WordleBoardProps {
  attempts: string[][]; 
  feedback: number[][];
}

export default function WordleBoard({ attempts, feedback }: WordleBoardProps) {
  return (
    <div className="grid grid-rows-6 gap-2"> 
      {/* Map over the attempts array to render each attempt as a WordleRow */}
      {attempts.map((attempt: string[], index: number) => (
        // Each row is passed the word (attempt) and feedback for that row
        <WordleRow key={index} word={attempt} feedback={feedback[index]} />
      ))}
    </div>
  );
}
