"use client";

interface KeyboardProps {
  onKeyPress: (letter: string) => void;
  onDelete: () => void;
  onEnter: () => void;
}

export default function Keyboard({
  onKeyPress,
  onDelete,
  onEnter,
}: KeyboardProps) {
  const topRow = "QWERTYUIOP".split("");
  const middleRow = "ASDFGHJKL".split("");
  const bottomRow = "ZXCVBNM".split("");

  return (
    <div className="flex flex-col items-center space-y-2 mt-4">
      {/* Top row */}
      <div className="flex space-x-2">
        {topRow.map((letter) => (
          <button
            key={letter}
            onClick={() => onKeyPress(letter)}
            className="p-2 w-10 h-10 bg-gray-300 text-black rounded-md text-lg font-bold"
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Middle row */}
      <div className="flex space-x-2">
        {middleRow.map((letter) => (
          <button
            key={letter}
            onClick={() => onKeyPress(letter)}
            className="p-2 w-10 h-10 bg-gray-300 text-black rounded-md text-lg font-bold"
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Bottom row with Enter and Delete */}
      <div className="flex space-x-2">
        <button
          onClick={onDelete}
          className="p-2 px-4 bg-red-500 text-white rounded-md"
        >
          Delete
        </button>
        {bottomRow.map((letter) => (
          <button
            key={letter}
            onClick={() => onKeyPress(letter)}
            className="p-2 w-10 h-10 bg-gray-300 text-black rounded-md text-lg font-bold"
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
