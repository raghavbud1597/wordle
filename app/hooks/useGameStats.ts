import { useState, useEffect } from 'react';
import { loadGameStats, saveGameStats, GameStats } from './../helpers/gameStatsHelpers';

export const useGameStats = () => {
  const initialStats: GameStats = loadGameStats() || {
    played: 0,
    wins: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: Array(6).fill(0),
  };

  const [played, setPlayed] = useState<number>(initialStats.played);
  const [wins, setWins] = useState<number>(initialStats.wins);
  const [currentStreak, setCurrentStreak] = useState<number>(initialStats.currentStreak);
  const [maxStreak, setMaxStreak] = useState<number>(initialStats.maxStreak);
  const [guessDistribution, setGuessDistribution] = useState<number[]>(initialStats.guessDistribution);

  // Calculate win percentage
  const winPercentage = played > 0 ? Math.round((wins / played) * 100) : 0;

  // Effect to save the stats to localStorage when they change
  useEffect(() => {
    const stats: GameStats = {
      played,
      wins,
      currentStreak,
      maxStreak,
      guessDistribution,
    };
    saveGameStats(stats);
  }, [played, wins, currentStreak, maxStreak, guessDistribution]);

  // Function to update statistics when a game is won
  const recordWin = (attempts: number): void => {
    setPlayed((prev) => prev + 1);
    setWins((prev) => prev + 1);
    setCurrentStreak((prev) => prev + 1);
    setMaxStreak((prev) => Math.max(prev, currentStreak + 1));
    setGuessDistribution((prev) => {
      const updatedDistribution = [...prev];
      updatedDistribution[attempts - 1] += 1;
      return updatedDistribution;
    });
  };

  // Function to update statistics when a game is lost
  const recordLoss = (): void => {
    setPlayed((prev) => prev + 1);
    setCurrentStreak(0); 
  };

  // Function to reset all stats
  const resetStats = (): void => {
    setPlayed(0);                        
    setWins(0);                          
    setCurrentStreak(0);                 
    setMaxStreak(0);                     
    setGuessDistribution(Array(6).fill(0)); 
  };

  return {
    played,
    winPercentage,
    currentStreak,
    maxStreak,
    guessDistribution,
    recordWin,
    recordLoss,
    resetStats,
  };
};
