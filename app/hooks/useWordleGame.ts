/**
 * useWordleGame.ts
 *
 * Custom hook encapsulating the logic for the Wordle game. It handles the game state,
 * including current attempts, input handling, and keypress events. The game status is tracked
 * to prevent further input once the game is won or lost.
 */
"use client";

import { useState, useEffect } from "react";
import { validateWord } from "../api/validateWord";
import {
  MAX_ATTEMPTS,
  WORD_LENGTH,
  DEFAULT_FEEDBACK,
} from "../constants/GameInfo";
import { toast } from "react-toastify";
import { saveGameState, loadGameState } from "../helpers/gameHelpers";
import { useGameStats } from "./useGameStats";

// Custom hook for managing the Wordle game state and logic with localStorage persistence
export const useWordleGame = () => {
  // Initialize the game state, either from localStorage or defaults
  const savedState = loadGameState();
  const { recordWin, recordLoss } = useGameStats(); // Get stats functions

  const [attempts, setAttempts] = useState<string[][]>(
    savedState?.attempts ||
      Array(MAX_ATTEMPTS).fill(Array(WORD_LENGTH).fill(""))
  );
  const [currentRow, setCurrentRow] = useState<number>(
    savedState?.currentRow || 0
  );
  const [currentCol, setCurrentCol] = useState<number>(
    savedState?.currentCol || 0
  );
  const [feedback, setFeedback] = useState<number[][]>(
    savedState?.feedback || []
  );
  const [keyFeedback, setKeyFeedback] = useState<{ [key: string]: number }>(
    savedState?.keyFeedback || DEFAULT_FEEDBACK
  );
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    savedState?.gameStatus || "playing"
  );

  const [loading, setLoading] = useState<boolean>(false);

  // Store the updated state in localStorage whenever it changes
  useEffect(() => {
    saveGameState({
      attempts,
      currentRow,
      currentCol,
      feedback,
      keyFeedback,
      gameStatus,
    });
  }, [attempts, currentRow, currentCol, feedback, keyFeedback, gameStatus]);

  // Handles letter input and updates the current column in the grid
  const handleInput = (letter: string) => {
    if (gameStatus !== "playing") return; // Prevent input if game is won or lost
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
    if (gameStatus !== "playing") return; // Prevent delete if game is won or lost
    if (currentCol > 0) {
      setCurrentCol((prevCol) => prevCol - 1); // Move back one column
      setAttempts((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[currentRow] = [...newGrid[currentRow]];
        newGrid[currentRow][currentCol - 1] = ""; // Clear the previous column
        return newGrid;
      });
    }
  };

  // Handles submission of the current word and validates it
  const handleSubmit = async () => {
    if (gameStatus !== "playing") return; // Prevent submission if game is won or lost

    // Check if an API call is already in progress
    if (loading) {
      toast.info("Word validation is already in progress. Please wait.");
      return;
    }

    if (currentCol === WORD_LENGTH) {
      try {
        const currentWord = attempts[currentRow].join("").toLowerCase();
        setLoading(true);

        // Validate the word via API call
        const isValid = await validateWord(currentWord);

        if (isValid?.is_valid_word) {
          setFeedback((prevFeedback) => [...prevFeedback, isValid.score]); // Update feedback

          // Update key feedback based on the score
          isValid.score.forEach((score: number, index: number) => {
            const letter = currentWord[index].toUpperCase();
            if (!keyFeedback[letter] || keyFeedback[letter] < score) {
              setKeyFeedback((prev) => ({ ...prev, [letter]: score }));
            } else if (score === 0) {
              setKeyFeedback((prev) => ({ ...prev, [letter]: score }));
            }
          });

          // Check if the word is correct (all letters have a score of 2)
          if (isValid.score.every((score: number) => score === 2)) {
            setGameStatus("won"); // Mark game as won
            toast.success("Congratulations! You guessed the word!");
            recordWin(currentRow + 1); // Record the win with attempts
          } else if (currentRow === MAX_ATTEMPTS - 1) {
            setGameStatus("lost"); // Mark game as lost if no attempts are left
            toast.error("Game Over! No more attempts.");
            recordLoss(); // Record the loss
          } else {
            setCurrentRow((prevRow) => prevRow + 1); // Move to the next row
            setCurrentCol(0); // Reset column for the new row
          }
        } else {
          toast.error("Invalid Word!"); // Handle invalid word case
        }
      } catch (error) {
        toast.error("Error validating word.");
      } finally {
        setLoading(false); // Reset loading after API call completes
      }
    }
  };

  // Handles key press events for the game (Enter, Backspace, letter keys)
  const handleKeyPress = (event: KeyboardEvent) => {
    if (gameStatus !== "playing") return; // Prevent further keypress if game is won or lost

    const key = event.key;
    if (key === "Enter") {
      handleSubmit();
    } else if (key === "Backspace") {
      handleDelete();
    } else if (/^[a-zA-Z]$/.test(key) && key.length === 1) {
      handleInput(key.toUpperCase());
    }
  };

  // Set up event listener for key press when component mounts
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => handleKeyPress(event);
    document.addEventListener("keydown", keyDownHandler);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [currentRow, currentCol, gameStatus]);

  return {
    attempts,
    feedback,
    keyFeedback,
    handleInput,
    handleDelete,
    handleSubmit,
  };
};
