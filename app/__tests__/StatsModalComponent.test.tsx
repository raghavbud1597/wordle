import { render, screen, fireEvent } from '@testing-library/react';
import StatsModal from '../components/StatsModal';
import * as useGameStatsHook from '../hooks/useGameStats';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('../hooks/useGameStats', () => ({
  __esModule: true,
  useGameStats: vi.fn(),
}));

describe('StatsModal Component', () => {
  const mockResetStats = vi.fn();

  beforeEach(() => {
    (useGameStatsHook.useGameStats as jest.Mock).mockReturnValue({
      played: 10,
      winPercentage: 50,
      currentStreak: 30,
      maxStreak: 500,
      guessDistribution: [1, 2, 3, 4, 5], 
      resetStats: mockResetStats,
    });
  });

  it('renders the stats modal correctly', () => {
    render(<StatsModal onClose={vi.fn()} />);
    
    expect(screen.getByText('Game Statistics')).toBeInTheDocument();
    
    expect(screen.getByText('Played')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    
    expect(screen.getByText('Win %')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    
    expect(screen.getByText('Current Streak')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    
    expect(screen.getByText('Max Streak')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();

    expect(screen.getByText('Guess Distribution')).toBeInTheDocument();
    expect(screen.getByText('Attempt 1:')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Attempt 2:')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Attempt 3:')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Attempt 4:')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Attempt 5:')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('does not call resetStats when the reset is canceled', () => {
    window.confirm = vi.fn().mockReturnValue(false);

    render(<StatsModal onClose={vi.fn()} />);


    fireEvent.click(screen.getByRole('button', { name: /reset stats/i }));

    expect(mockResetStats).toHaveBeenCalledTimes(0);
  });

  it('calls resetStats when the reset button is clicked and confirmed', () => {
    window.confirm = vi.fn().mockReturnValue(true);

    render(<StatsModal onClose={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /reset stats/i }));

    expect(mockResetStats).toHaveBeenCalledTimes(1);
  });
});
