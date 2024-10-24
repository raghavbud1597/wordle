import { render, screen, fireEvent } from "@testing-library/react";
import WordleGame from "./../components/WordleGame";
import { useWordleGame } from "./../hooks/useWordleGame";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";

vi.mock("./../hooks/useWordleGame", () => ({
  useWordleGame: vi.fn(),
}));

vi.mock("./../components/WordleBoard", () => {
  return {
    default: vi.fn(({ attempts, feedback }) => (
      <div data-testid="mock-board">
        {attempts.map((attempt, index) => (
          <div key={index} data-testid={`attempt-${index}`}>
            {attempt.map((letter, letterIndex) => (
              <span key={letterIndex}>{letter}</span>
            ))}
          </div>
        ))}
      </div>
    )),
  };
});

vi.mock("./../components/Keyboard", () => {
  return {
    default: vi.fn(({ onKeyPress, onDelete, onEnter }) => (
      <div>
        <button onClick={() => onKeyPress("Z")}>Z</button>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onEnter}>Enter</button>
      </div>
    )),
  };
});

describe("WordleGame", () => {
  beforeEach(() => {
    (useWordleGame as jest.Mock).mockReturnValue({
      attempts: [["A", "B", "C", "D", "E"]],
      feedback: [0, 1, 2],
      keyFeedback: {},
      handleInput: vi.fn(),
      handleDelete: vi.fn(),
      handleSubmit: vi.fn(),
    });
  });

  it("renders WordleBoard and Keyboard components", () => {
    render(<WordleGame />);

    const board = screen.getByTestId("mock-board");
    expect(board).toBeInTheDocument();

    expect(screen.getByTestId("attempt-0")).toHaveTextContent("A");
    expect(screen.getByTestId("attempt-0")).toHaveTextContent("B");
    expect(screen.getByTestId("attempt-0")).toHaveTextContent("C");

    expect(screen.getByText("Z")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Enter")).toBeInTheDocument();
  });

  it("handles key press, delete, and submit actions", () => {
    const { handleInput, handleDelete, handleSubmit } = useWordleGame();

    render(<WordleGame />);

    fireEvent.click(screen.getByText("Z"));
    expect(handleInput).toHaveBeenCalledWith("Z");

    fireEvent.click(screen.getByText("Delete"));
    expect(handleDelete).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Enter"));
    expect(handleSubmit).toHaveBeenCalled();
  });
});
