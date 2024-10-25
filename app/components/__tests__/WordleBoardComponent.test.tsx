import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import WordleBoard from '../WordleBoard';

vi.mock('./../WordleRow', () => {
  return {
    default: function MockWordleRow() {
      return <div data-testid="wordle-row" />;
    },
  };
});

describe('WordleBoard Component', () => {
  it('renders the correct number of WordleRow components', () => {
    const attempts = [
      ['w', 'o', 'r', 'd', '1'],
      ['w', 'o', 'r', 'd', '2'],
      ['w', 'o', 'r', 'd', '3'],
    ];
    const feedback = [
      [0, 1, 2, 0, 1],
      [2, 1, 0, 1, 0],
      [1, 0, 2, 0, 0],
    ];

    render(<WordleBoard attempts={attempts} feedback={feedback} />);
    const rows = screen.getAllByTestId('wordle-row');
    expect(rows).toHaveLength(attempts.length); 
  });
});
