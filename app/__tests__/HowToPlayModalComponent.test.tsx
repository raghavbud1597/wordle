// HowToPlayModal.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import HowToPlayModal from "./../components/HowToPlayModal";
import { describe, it, expect, vi, beforeEach } from "vitest";
import '@testing-library/jest-dom';

describe("HowToPlayModal", () => {
  const onCloseMock = vi.fn();

  beforeEach(() => {
    render(<HowToPlayModal onClose={onCloseMock} />);
  });

  it("renders the modal with title and content", () => {
    const titleElement = screen.getByText("How To Play");
    expect(titleElement).toBeInTheDocument();

    const introText = screen.getByText(/Guess the Wordle in 6 tries/i);
    expect(introText).toBeInTheDocument();

    const rule1 = screen.getByText(/Each guess must be a valid 5-letter word/i);
    expect(rule1).toBeInTheDocument();

    const rule2 = screen.getByText(/The color of the tiles will change/i);
    expect(rule2).toBeInTheDocument();

    const exampleText1 = screen.getByText(/is in the word and in the correct spot/i);
    expect(exampleText1).toBeInTheDocument();

    const exampleText2 = screen.getByText(/is in the word but in the wrong spot/i);
    expect(exampleText2).toBeInTheDocument();

    const exampleText3 = screen.getByText(/is not in the word in any spot/i);
    expect(exampleText3).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const closeButton = screen.getByRole("button");
    
    fireEvent.click(closeButton);
    
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("calls onClose when the overlay is clicked", () => {
    const overlay = screen.getByTestId("overlay");
    
    fireEvent.click(overlay);
    
    expect(onCloseMock).toHaveBeenCalled();
  });
});
