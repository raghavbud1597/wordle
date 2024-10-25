import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import WordleRow from '../WordleRow';

interface WordleCellProps {
    letter: string;
    score: number;
  }

vi.mock('./../WordleCell', () => {
    return {
      default: function MockWordleCell({ letter, score }: WordleCellProps) {
        return <div data-testid="mock-cell" data-score={score}>{letter}</div>;
      },
    };
  });

describe('WordleRow', () => {
  it('renders a row of letters with feedback correctly', () => {
    const word = ['H', 'E', 'L', 'L', 'O'];
    const feedback = [2, 1, 0, -1, -1]; 

    render(<WordleRow word={word} feedback={feedback} />);

    const cells = screen.getAllByTestId('mock-cell');
    expect(cells).toHaveLength(word.length);

    word.forEach((letter, index) => {
      expect(cells[index]).toHaveTextContent(letter); 
      expect(cells[index]).toHaveAttribute('data-score', feedback[index] !== undefined ? feedback[index].toString() : '-1'); 
    });
  });

  it('defaults score to -1 when feedback is not provided', () => {
    const word = ['A', 'B', 'C', 'D', 'E'];

    render(<WordleRow word={word} />); // No feedback provided

    const cells = screen.getAllByTestId('mock-cell');
    
    cells.forEach(cell => {
      expect(cell).toHaveAttribute('data-score', '-1'); // Default score check
    });
  });
});
