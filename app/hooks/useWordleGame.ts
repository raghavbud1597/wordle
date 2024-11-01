/**
 * useWordleGame.ts
 *
 * Custom hook encapsulating the logic for the Wordle game. It handles the game state,
 * including current attempts, input handling, and keypress events. The game status is tracked
 * to prevent further input once the game is won or lost.
 */

import { useState, useEffect } from "react";
import { validateWord } from "../api/validateWord";
import {
  MAX_ATTEMPTS,
  HARD_MAX_ATTEMPT,
  WORD_LENGTH,
  DEFAULT_FEEDBACK,
} from "../constants/GameInfo";
import { toast } from "react-toastify";
import { saveGameState, loadGameState } from "../helpers/gameHelpers";
import { useGameStats } from "./useGameStats";

export const useWordleGame = () => {
  const { recordWin, recordLoss } = useGameStats();

  const [attempts, setAttempts] = useState<string[][]>(
    Array(HARD_MAX_ATTEMPT).fill(Array(WORD_LENGTH).fill(""))
  );
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentCol, setCurrentCol] = useState<number>(0);
  const [feedback, setFeedback] = useState<number[][]>([]);
  const [keyFeedback, setKeyFeedback] = useState<{ [key: string]: number }>(
    DEFAULT_FEEDBACK
  );
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  useEffect(() => {
    setIsClient(true);
    const savedState = loadGameState();
    if (savedState) {
      setAttempts(savedState.attempts || []);
      setCurrentRow(savedState.currentRow || 0);
      setCurrentCol(savedState.currentCol || 0);
      setFeedback(savedState.feedback || []);
      setKeyFeedback(savedState.keyFeedback || DEFAULT_FEEDBACK);
      setGameStatus(savedState.gameStatus || "playing");
    }
  }, []);

  // Store the updated state in localStorage whenever it changes, but only if we're on the client
  useEffect(() => {
    if (isClient) {
      saveGameState({
        attempts,
        currentRow,
        currentCol,
        feedback,
        keyFeedback,
        gameStatus,
      });
    }
  }, [
    attempts,
    currentRow,
    currentCol,
    feedback,
    keyFeedback,
    gameStatus,
    isClient,
  ]);

  // Handles letter input and updates the current column in the grid
  const handleInput = (letter: string) => {
    if (gameStatus !== "playing") return; 
    if (currentCol < WORD_LENGTH) {
      setAttempts((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[currentRow] = [...newGrid[currentRow]];
        newGrid[currentRow][currentCol] = letter;
        return newGrid;
      });
      setCurrentCol((prevCol) => prevCol + 1);
    }
  };

  // Handles deletion of the last letter in the current row
  const handleDelete = () => {
    if (gameStatus !== "playing") return;
    if (currentCol > 0) {
      setCurrentCol((prevCol) => prevCol - 1);
      setAttempts((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[currentRow] = [...newGrid[currentRow]];
        newGrid[currentRow][currentCol - 1] = "";
        return newGrid;
      });
    }
  };

  // Handles submission of the current word and validates it
  const handleSubmit = async () => {
    if (gameStatus !== "playing") return;

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
          setFeedback((prevFeedback) => [...prevFeedback, isValid.score]);

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
            setGameStatus("won"); 
            toast.success("Congratulations! You guessed the word!");
            recordWin(currentRow + 1); 
          } else if (currentRow === HARD_MAX_ATTEMPT - 1) {
            setGameStatus("lost"); 
            toast.error("Game Over! No more attempts.");
            recordLoss();
          } else {
            setCurrentRow((prevRow) => prevRow + 1); 
            setCurrentCol(0);
          }
        } else {
          toast.error("Invalid Word!"); 
        }
      } catch (error) {
        console.error(error);
        toast.error("Error validating word.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Handles key press events for the game (Enter, Backspace, letter keys)
  const handleKeyPress = (event: KeyboardEvent) => {
    if (gameStatus !== "playing") return;

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
