/**
 * useWordleGame.ts
 * 
 * This custom hook encapsulates the logic for the Wordle game. It handles the game state, 
 * including the current attempts, input handling, and keypress events. It is designed to 
 * separate the game logic from the UI, providing clean and reusable functionality.
 */

import { useState, useEffect } from 'react';
import { validateWord } from '../api/validateWord';
import { MAX_ATTEMPTS, WORD_LENGTH } from '../constants/GameInfo';
import { toast } from 'react-toastify';

const DEFAULT_FEEDBACK = Object.fromEntries(
    Array.from("abcdefghijklmnopqrstuvwxyz").map((char) => [char, -1]));

// Custom hook for managing the Wordle game state and logic
export const useWordleGame = () => {
  // Initialize the game board with empty values for MAX_ATTEMPTS and WORD_LENGTH
  const [attempts, setAttempts] = useState<string[][]>(
    Array(MAX_ATTEMPTS).fill(Array(WORD_LENGTH).fill(''))
  );
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentCol, setCurrentCol] = useState<number>(0);
  const [feedback, setFeedback] = useState<number[][]>([]);
  const [keyFeedback, setKeyFeedback] = useState<{ [key: string]: number }>(DEFAULT_FEEDBACK);

  // Handles letter input and updates the current column in the grid
  const handleInput = (letter: string) => {
    if (currentCol < WORD_LENGTH) {
      setAttempts((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[currentRow] = [...newGrid[currentRow]];
        newGrid[currentRow][currentCol] = letter;
        return newGrid;
      });
      setCurrentCol((prevCol) => prevCol + 1); // Move to the next column
    }
  };

  // Handles deletion of the last letter in the current row
  const handleDelete = () => {
    if (currentCol > 0) {
      setCurrentCol((prevCol) => prevCol - 1); // Move back one column
      setAttempts((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[currentRow] = [...newGrid[currentRow]];
        newGrid[currentRow][currentCol - 1] = ''; // Clear the previous column
        return newGrid;
      });
    }
  };

  // Handles submission of the current word and validates it
  const handleSubmit = async () => {
    if (currentCol === WORD_LENGTH) {
      const currentWord = attempts[currentRow].join('').toLowerCase();

      // Validate the word via API call
      const isValid = await validateWord(currentWord);

      if (isValid.is_valid_word) {
        setFeedback((prevFeedback) => [...prevFeedback, isValid.score]); // Update feedback
        
        // Update key feedback based on the score
        isValid.score.forEach((score:number, index:number) => {
          const letter = currentWord[index].toUpperCase();
          // Update key feedback only if it's better than current score
          if (!keyFeedback[letter] || keyFeedback[letter] < score) {
            setKeyFeedback((prev) => ({ ...prev, [letter]: score }));
          } else if(score === 0) {
            setKeyFeedback((prev) => ({ ...prev, [letter]: score }));
          }
        });

        setCurrentRow((prevRow) => prevRow + 1); // Move to the next row
        setCurrentCol(0); // Reset column for the new row
      } else {
        toast.error("Invalid Word!"); // Handle invalid word case
        
      }
    }
  };

  // Handles key press events for the game (Enter, Backspace, letter keys)
  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;

    if (key === 'Enter') {
      handleSubmit(); 
    } else if (key === 'Backspace') {
      handleDelete(); 
    } else if (/^[a-zA-Z]$/.test(key) && key.length === 1) {
      handleInput(key.toUpperCase()); 
    }
  };

  // Set up event listener for key press when component mounts
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => handleKeyPress(event);
    document.addEventListener('keydown', keyDownHandler);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [currentRow, currentCol]);

  return {
    attempts,
    feedback,
    keyFeedback,
    handleInput,
    handleDelete,
    handleSubmit,
  };
};
