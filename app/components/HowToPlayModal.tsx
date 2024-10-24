import React from "react";
import Modal from "./Modal";
import WordleRow from "./WordleRow"; // Assuming you already have WordleRow component

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="How To Play">
      <section>
        <p className="text-lg">Guess the Wordle in 6 tries.</p>
        <p className="text-lg">Each guess must be a valid 5-letter word.</p>
        <p className="text-lg">
          The color of the tiles will change to show how close your guess was to
          the word.
        </p>
        <h3 className="font-bold my-2 text-2xl">Examples</h3>

        {/* Word examples using WordleRow component */}

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
