"use client";

import { useState, useEffect } from "react";
import WordleBoard from "./WordleBoard";
import Keyboard from "./Keyboard";
import { validateWord } from "../api/validateWord";
import {MAX_ATTEMPTS, WORD_LENGTH} from "../constants/GameInfo";


export default function WordleGame() {
  const [attempts, setAttempts] = useState<string[][]>(Array(MAX_ATTEMPTS).fill(Array(WORD_LENGTH).fill('')));
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentCol, setCurrentCol] = useState<number>(0);
  const [feedback, setFeedback] = useState<number[][]>([]); // Array of score arrays

  const handleInput = (letter: string) => {
    
  };

  const handleDelete = () => {
    
  };

  const handleSubmit = async () => {
    
  };

  // Function to handle key press
  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === 'Enter') {
      // Handle 'Enter' key logic here
      console.log('Enter pressed');
      if (currentCol === 5) {
        setCurrentRow((prevRow) => Math.min(prevRow + 1, 5));
        setCurrentCol(0);
      }
    } else if (key === 'Backspace') {
      // Handle 'Backspace' key logic here
      console.log('Backspace pressed');
      if (currentCol > 0) {
        setCurrentCol((prevCol) => prevCol - 1);
        updateGrid('', currentRow, currentCol - 1); // Clear previous column
      }
    } else if (/^[a-zA-Z]$/.test(key) && key.length === 1) {
      // Handle letter input (a-z)
      console.log(`${key.toUpperCase()} pressed`);
      if (currentCol < 5) {
        updateGrid(key.toUpperCase(), currentRow, currentCol);
        setCurrentCol((prevCol) => Math.min(prevCol + 1, 5));
      }
    }
  };

  // Function to update the grid
  const updateGrid = (letter: string, row: number, col: number) => {
    setAttempts((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[row] = [...newGrid[row]];
      newGrid[row][col] = letter;
      return newGrid;
    });
  };

  // Add event listener for key press when component mounts
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => handleKeyPress(event);

    document.addEventListener('keydown', keyDownHandler);

    // Cleanup listener when component unmounts
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [currentRow, currentCol]);

  return (
    <div className="h-full flex flex-col items-center">
      <WordleBoard attempts={attempts} feedback={feedback} />
      <Keyboard onKeyPress={handleInput} onDelete={handleDelete} onEnter={handleSubmit} />
    </div>
  );
}
