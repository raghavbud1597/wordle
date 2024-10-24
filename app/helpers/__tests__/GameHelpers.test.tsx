import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { saveGameState, loadGameState } from './../gameHelpers';

describe('Game Helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('saveGameState', () => {
    it('should save the game state to localStorage', () => {
      const gameState = { attempts: ['A', 'B'], feedback: [0, 1] };
      
      saveGameState(gameState);
      
      const savedState = localStorage.getItem('wordleGameState');
      expect(savedState).toBeDefined();
      expect(savedState).toBe(JSON.stringify(gameState));
    });
  });

  describe('loadGameState', () => {
    it('should load the game state from localStorage if it exists', () => {
      const gameState = { attempts: ['A', 'B'], feedback: [0, 1] };
      localStorage.setItem('wordleGameState', JSON.stringify(gameState));

      const loadedState = loadGameState();

      expect(loadedState).toEqual(gameState);
    });

    it('should return null if no game state exists in localStorage', () => {
      const loadedState = loadGameState();
      expect(loadedState).toBeNull();
    });

    it('should return null if not in a browser environment', () => {
      const originalWindow = global.window;
      global.window = undefined;

      const loadedState = loadGameState();
      expect(loadedState).toBeNull();

      global.window = originalWindow;
    });
  });
});
