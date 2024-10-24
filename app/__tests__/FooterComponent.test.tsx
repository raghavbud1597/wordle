// Footer.test.tsx

import { render, screen } from "@testing-library/react";
import Footer from "./../components/Footer";
import { describe, it, expect } from "vitest";
import '@testing-library/jest-dom';

describe("Footer component", () => {
  it("renders the creator's name with a link to the portfolio", () => {
    render(<Footer />);

    const linkElement = screen.getByRole("link", { name: /raghav budhiraja/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "https://raghavbud1597.github.io/web-portfolio/");
    expect(linkElement).toHaveAttribute("target", "_blank");
    expect(linkElement).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the footer text", () => {
    render(<Footer />);
    
    const footerText = screen.getByText(/created by/i);
    expect(footerText).toBeInTheDocument();
  });
});
