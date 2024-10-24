/**
 * HowToPlayModal.tsx
 *
 * This component renders a modal dialog that provides instructions on how to play the Wordle game.
 * It utilizes the `Modal` component to display the content in a centered dialog.
 *
 * Props:
 * - `onClose`: A callback function to close the modal when triggered.
 *
 * The modal contains:
 * - An introductory paragraph explaining the goal of the game.
 * - A list of rules outlining how to make valid guesses and interpret feedback from the game.
 * - Examples of guesses displayed using the `WordleRow` component, which visually represents
 *   the feedback for each guess, indicating correct positions and letters that are included or excluded.
 *
 * The design is responsive and styled for both light and dark themes.
 */

import React from "react";
import Modal from "./Modal";
import WordleRow from "./WordleRow";

interface HowToPlayModalProps {
  onClose: () => void;
}

const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <Modal onClose={onClose} title="How To Play">
      <section>
        <p className="text-2xl">Guess the Wordle in 6 tries.</p>
        <ul>
          <li className="text-lg">Each guess must be a valid 5-letter word.</li>
          <li className="text-lg">
            The color of the tiles will change to show how close your guess was
            to the word.
          </li>
        </ul>

        <h3 className="font-bold my-2 text-2xl">Examples</h3>

        <div className="my-4">
          <WordleRow
            word={["W", "E", "A", "R", "Y"]}
            feedback={[2, 0, 0, 0, 0]}
          />

          <p className="text-xl mt-2">
            <strong>W</strong> is in the word and in the correct spot.
          </p>
        </div>

        <div className="my-4">
          <WordleRow
            word={["P", "I", "L", "L", "S"]}
            feedback={[0, 1, 0, 0, 0]}
          />

          <p className="text-xl mt-2">
            <strong>I</strong> is in the word but in the wrong spot.
          </p>
        </div>

        <div className="my-4">
          <WordleRow
            word={["U", "N", "I", "T", "E"]}
            feedback={[0, 0, 0, 0, 0]}
          />

          <p className="text-xl mt-2">
            <strong>U</strong> is not in the word in any spot.
          </p>
        </div>
      </section>
    </Modal>
  );
};

export default HowToPlayModal;
