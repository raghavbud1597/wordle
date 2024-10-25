import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import WordleCell from '../WordleCell';

describe('WordleCell Component', () => {
  it('renders the letter and applies correct styles based on score', () => {
    const { rerender } = render(<WordleCell letter="A" score={0} />);
    
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('A').parentElement).toHaveClass('bg-slate-500');
    
    rerender(<WordleCell letter="B" score={1} />);
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('B').parentElement).toHaveClass('bg-yellow-600');
    
    rerender(<WordleCell letter="C" score={2} />);
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('C').parentElement).toHaveClass('bg-green-600');
  });
});
