import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { loadGameStats, saveGameStats, GameStats } from './../gameStatsHelpers';

describe('Game Stats Helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('saveGameStats', () => {
    it('should save the game stats to localStorage', () => {
      const gameStats: GameStats = { played: 10, wins: 5, currentStreak: 3, maxStreak: 7, guessDistribution: [1, 2, 3, 4, 5] };
      saveGameStats(gameStats);
      const savedStats = localStorage.getItem('wordleGameStats');
      expect(savedStats).toBeDefined();
      expect(savedStats).toBe(JSON.stringify(gameStats));
    });
  });

  describe('loadGameStats', () => {
    it('should load the game stats from localStorage if it exists', () => {
      const gameStats: GameStats = { played: 10, wins: 5, currentStreak: 3, maxStreak: 7, guessDistribution: [1, 2, 3, 4, 5] };
      localStorage.setItem('wordleGameStats', JSON.stringify(gameStats));
      const loadedStats = loadGameStats();
      expect(loadedStats).toEqual(gameStats);
    });

    it('should return null if no game stats exist in localStorage', () => {
      const loadedStats = loadGameStats();
      expect(loadedStats).toBeNull();
    });

    it('should return null if not in a browser environment', () => {
      const originalWindow = global.window;
      global.window = undefined;
      const loadedStats = loadGameStats();
      expect(loadedStats).toBeNull();
      global.window = originalWindow;
    });
  });
});
