import { render, screen } from "@testing-library/react";
import Home from "./page";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

describe("Home component", () => {
  it("renders the Wordle logo", () => {
    render(<Home />);
    const logo = screen.getByAltText("Wordle Logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders the heading", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", { name: /wordle/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<Home />);
    const description = screen.getByText(/get 6 chances to guess/i);
    expect(description).toBeInTheDocument();
  });

  it("renders the 'Play' button with link to game", () => {
    render(<Home />);
    const playLink = screen.getByRole("link", {
      name: /play the wordle game/i,
    });
    expect(playLink).toBeInTheDocument();
    expect(playLink).toHaveAttribute("href", "/game");
  });

  it("renders the 'Code' button with link to GitHub", () => {
    render(<Home />);
    const codeLink = screen.getByRole("link", {
      name: /view the wordle code on github/i,
    });
    expect(codeLink).toBeInTheDocument();
    expect(codeLink).toHaveAttribute(
      "href",
      "https://github.com/raghavbud1597/wordle"
    );
    expect(codeLink).toHaveAttribute("target", "_blank");
  });

  it("renders the Footer", () => {
    render(<Home />);
    const footer = screen.getByText(/Created by/i);
    expect(footer).toBeInTheDocument();
  });
});
