import { render, screen } from "@testing-library/react";
import ErrorPage from "./page"; 
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

describe("ErrorPage", () => {
  it("renders an error image", () => {
    render(<ErrorPage />);
    const image = screen.getByAltText(/error image/i);
    expect(image).toBeInTheDocument();
  });

  it("displays the correct error message", () => {
    render(<ErrorPage />);
    const errorMessage = screen.getByText(/oops! something went wrong/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders a link to navigate back to the homepage", () => {
    render(<ErrorPage />);
    const link = screen.getByRole("link", { name: /back to the homepage/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<ErrorPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
