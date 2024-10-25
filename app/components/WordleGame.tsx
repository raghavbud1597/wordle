/**
 * WordleGame.tsx
 *
 * This component renders the Wordle game UI. It uses the custom hook `useWordleGame`
 * to manage the game logic such as input handling, deletion, and word submission.
 * The UI includes the game board and a keyboard for input.
 */

"use client";

import WordleBoard from "./WordleBoard";
import Keyboard from "./Keyboard";
import { useWordleGame } from "./../hooks/useWordleGame";

export default function WordleGame() {
  const {
    attempts,
    feedback,
    keyFeedback,
    handleInput,
    handleDelete,
    handleSubmit,
  } = useWordleGame();

  return (
    <div className="h-full flex flex-col items-center overflow-auto">
      {/* Render the Wordle game board */}
      <WordleBoard attempts={attempts} feedback={feedback} />

      {/* Render the keyboard with the appropriate event handlers */}
      <Keyboard
        onKeyPress={handleInput}
        onDelete={handleDelete}
        onEnter={handleSubmit}
        keyFeedback={keyFeedback}
      />
    </div>
  );
}
