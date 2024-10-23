"use client";

import { useState } from "react";
import WordleBoard from "./WordleBoard";
import Keyboard from "./Keyboard";
import { validateWord } from "../api/validateWord";
import {MAX_ATTEMPTS, WORD_LENGTH} from "../constants/GameInfo";


export default function WordleGame() {
  const [attempts, setAttempts] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<number[][]>([]); // Array of score arrays

  const handleInput = (letter: string) => {
    if (gameOver || currentGuess.length >= WORD_LENGTH) return;
    setCurrentGuess((prev) => prev + letter);
  };

  const handleDelete = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const handleSubmit = async () => {
    if (currentGuess.length !== WORD_LENGTH) return;

    try {
      const { isvalidword, score } = await validateWord(currentGuess);
      if (!isvalidword) {
        alert("Invalid word");
        return;
      }

      setFeedback([...feedback, score]);
      setAttempts([...attempts, currentGuess]);
      setCurrentGuess("");

      if (score.every((s) => s === 2)) {
        setGameOver(true);
        alert("Congratulations, you guessed the word!");
      } else if (attempts.length + 1 === MAX_ATTEMPTS) {
        setGameOver(true);
        alert("Game over! You've used all attempts.");
      }
    } catch (error) {
      console.error("Error validating word:", error);
    }
  };

  return (
    <div className="h-full flex flex-col items-center">
      <WordleBoard attempts={attempts} feedback={feedback} currentGuess={currentGuess} />
      <Keyboard onKeyPress={handleInput} onDelete={handleDelete} onEnter={handleSubmit} />
    </div>
  );
}
