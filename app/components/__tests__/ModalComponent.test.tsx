import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../Modal";
import { describe, it, expect, vi, beforeEach } from "vitest";
import '@testing-library/jest-dom';

describe("Modal component", () => {
  const onCloseMock = vi.fn();
  
  const titleText = "Test Modal Title";
  const childrenContent = <p>This is a test content for the modal.</p>;

  beforeEach(() => {
    render(
      <Modal onClose={onCloseMock} title={titleText}>
        {childrenContent}
      </Modal>
    );
  });

  it("renders the modal with title and children content", () => {
    const titleElement = screen.getByText(titleText);
    expect(titleElement).toBeInTheDocument();
    
    const contentElement = screen.getByText(/this is a test content/i);
    expect(contentElement).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const closeButton = screen.getByRole("button", { name: "" });
    
    fireEvent.click(closeButton);
    
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("calls onClose when the overlay is clicked", () => {
    const overlayElement = screen.getByTestId("overlay");
    
    fireEvent.click(overlayElement);
    
    expect(onCloseMock).toHaveBeenCalled();
  });
});
