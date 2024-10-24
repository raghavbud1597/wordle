"use client";

interface KeyboardProps {
  onKeyPress: (letter: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  keyFeedback: { [key: string]: number };
}

export default function Keyboard({
  onKeyPress,
  onDelete,
  onEnter,
  keyFeedback,
}: KeyboardProps) {
  const topRow = "QWERTYUIOP".split("");
  const middleRow = "ASDFGHJKL".split("");
  const bottomRow = "ZXCVBNM".split("");
  console.log(keyFeedback);
  const getKeyClass = (letter: string) => {
    const score = keyFeedback[letter]; // Default to -1 if no score
    if (score === 2) {
      return "bg-green-600 text-white"; // Correct
    } else if (score === 1) {
      return "bg-yellow-600 text-white"; // Misplaced
    } else if (score === 0) {
      return "bg-slate-700 text-white"; // Not Present
    } else {
      return "bg-slate-300 text-black"; // Default
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2 mt-4 md:p-1">
      {/* Top row */}
      <div className="flex space-x-1 md:space-x-2">
        {topRow.map((letter) => (
          <button
            key={letter}
            onClick={() => onKeyPress(letter)}
            className={`rounded-md text-sm w-8 h-8 md:text-lg md:w-10 md:h-10 font-bold ${getKeyClass(letter)}`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Middle row */}
      <div className="flex space-x-1 md:space-x-2">
        {middleRow.map((letter) => (
          <button
            key={letter}
            onClick={() => onKeyPress(letter)}
            className={`rounded-md text-sm w-8 h-8 md:text-lg md:w-10 md:h-10 font-bold ${getKeyClass(letter)}`}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Bottom row with Enter and Delete */}
      <div className="flex space-x-1 md:space-x-2">
        <button
          onClick={onDelete}
          className="p-1 px-2 md:p-2 md:px-4 bg-red-500 text-white rounded-md"
        >
          Delete
        </button>
        {bottomRow.map((letter) => (
          <button
            key={letter}
            onClick={() => onKeyPress(letter)}
            className={`rounded-md text-sm w-8 h-8 md:text-lg md:w-10 md:h-10 font-bold ${getKeyClass(letter)}`}
          >
            {letter}
          </button>
        ))}
        <button
          onClick={onEnter}
          className="p-2 px-4 bg-blue-500 text-white rounded-md"
        >
          Enter
        </button>
      </div>
    </div>
  );
}
