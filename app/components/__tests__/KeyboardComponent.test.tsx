import { render, fireEvent, screen } from "@testing-library/react";
import Keyboard from "../Keyboard";
import { describe, it, expect, vi, beforeEach } from "vitest";
import '@testing-library/jest-dom';

describe("Keyboard component", () => {
  const mockOnKeyPress = vi.fn();
  const mockOnDelete = vi.fn();
  const mockOnEnter = vi.fn();
  const mockKeyFeedback = {
    A: 2, // Correct
    B: 1, // Misplaced
    C: 0, // Not present
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all keys correctly", () => {
    render(
      <Keyboard
        onKeyPress={mockOnKeyPress}
        onDelete={mockOnDelete}
        onEnter={mockOnEnter}
        keyFeedback={{}}
      />
    );

    expect(screen.getByLabelText("Key Q")).toBeInTheDocument();
    expect(screen.getByLabelText("Key A")).toBeInTheDocument();
    expect(screen.getByLabelText("Key Z")).toBeInTheDocument();
    expect(screen.getByLabelText("Delete")).toBeInTheDocument();
    expect(screen.getByLabelText("Enter")).toBeInTheDocument();
  });

  it("should call onKeyPress when a key is clicked", () => {
    render(
      <Keyboard
        onKeyPress={mockOnKeyPress}
        onDelete={mockOnDelete}
        onEnter={mockOnEnter}
        keyFeedback={{}}
      />
    );

    // Simulate a click on the "A" key
    fireEvent.click(screen.getByLabelText("Key A"));

    // Ensure onKeyPress is called with the correct letter
    expect(mockOnKeyPress).toHaveBeenCalledWith("A");
  });

  it("should call onDelete when the delete button is clicked", () => {
    render(
      <Keyboard
        onKeyPress={mockOnKeyPress}
        onDelete={mockOnDelete}
        onEnter={mockOnEnter}
        keyFeedback={{}}
      />
    );

    // Simulate a click on the delete button
    fireEvent.click(screen.getByLabelText("Delete"));

    // Ensure onDelete is called
    expect(mockOnDelete).toHaveBeenCalled();
  });

  it("should call onEnter when the enter button is clicked", () => {
    render(
      <Keyboard
        onKeyPress={mockOnKeyPress}
        onDelete={mockOnDelete}
        onEnter={mockOnEnter}
        keyFeedback={{}}
      />
    );

    fireEvent.click(screen.getByLabelText("Enter"));

    expect(mockOnEnter).toHaveBeenCalled();
  });

  it("should apply correct feedback styles for each key", () => {
    render(
      <Keyboard
        onKeyPress={mockOnKeyPress}
        onDelete={mockOnDelete}
        onEnter={mockOnEnter}
        keyFeedback={mockKeyFeedback}
      />
    );

    expect(screen.getByLabelText("Key A")).toHaveClass("bg-green-600");

    expect(screen.getByLabelText("Key B")).toHaveClass("bg-yellow-600");

    expect(screen.getByLabelText("Key C")).toHaveClass("bg-slate-700");
  });
});
