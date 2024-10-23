"use client";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => toggleTheme("light")}
        className={`px-4 py-2 rounded ${
          theme === "light" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        Light
      </button>

      <button
        onClick={() => toggleTheme("dark")}
        className={`px-4 py-2 rounded ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        Dark
      </button>

      <button
        onClick={() => toggleTheme("high-contrast")}
        className={`px-4 py-2 rounded ${
          theme === "high-contrast" ? "bg-black text-yellow-500" : "bg-white text-black"
        }`}
      >
        High Contrast
      </button>
    </div>
  );
}
