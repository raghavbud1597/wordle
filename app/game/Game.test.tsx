import { render, screen } from "@testing-library/react";
import GamePage from "./page";
import { describe, it, expect, vi } from "vitest";
import '@testing-library/jest-dom';

vi.mock("../components/WordleGame", () => {
  return {
    default: vi.fn(() => <div data-testid="mock-wordle-game">Wordle Game</div>),
  };
});

vi.mock("../components/Navbar", () => {
  return {
    default: vi.fn(() => <div data-testid="mock-navbar">Navbar</div>),
  };
});

vi.mock("../components/ToastProvider", () => {
  return {
    default: vi.fn(() => (
      <div data-testid="mock-toast-provider">Toast Provider</div>
    )),
  };
});

describe("GamePage", () => {
  it("renders the Navbar, WordleGame, and ToastProvider components", () => {
    render(<GamePage />);

    const navbar = screen.getByTestId("mock-navbar");
    const wordleGame = screen.getByTestId("mock-wordle-game");
    const toastProvider = screen.getByTestId("mock-toast-provider");

    expect(navbar).toBeInTheDocument();
    expect(wordleGame).toBeInTheDocument();
    expect(toastProvider).toBeInTheDocument();
  });
});
