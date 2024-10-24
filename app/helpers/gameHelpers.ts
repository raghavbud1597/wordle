/**
 * gameHelpers.ts
 *
 * Helper functions for managing the Wordle game logic, such as saving and loading
 * the game state to and from localStorage.
 */

// Helper function to save game state to localStorage
export const saveGameState = (state: any) => {
  localStorage.setItem("wordleGameState", JSON.stringify(state));
};

// Helper function to load game state from localStorage
export const loadGameState = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const savedState = localStorage.getItem("wordleGameState");
    return savedState ? JSON.parse(savedState) : null;
  }
  return null; // Return null if not in the browser environment
};
