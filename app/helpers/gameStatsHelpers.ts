// Define the shape of game stats
export interface GameStats {
  played: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[];
}

// Helper function to load game stats from localStorage
export const loadGameStats = (): GameStats | null => {
  if (typeof window !== "undefined") {
    const stats = localStorage.getItem("wordleGameStats");
    return stats ? (JSON.parse(stats) as GameStats) : null;
  }
  return null;
};

// Helper function to save game stats to localStorage
export const saveGameStats = (stats: GameStats): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("wordleGameStats", JSON.stringify(stats));
  }
};
