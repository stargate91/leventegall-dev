import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SwayaSimulator from "./SwayaSimulator";

describe("SwayaSimulator Component", () => {
  it("renders initial progress state and logs", () => {
    render(<SwayaSimulator />);

    expect(screen.getByText(/FASTAPI TASK QUEUE/i)).toBeInTheDocument();
    expect(screen.getByText(/\[ 68% \]/i)).toBeInTheDocument();
    expect(screen.getByText(/• TMDB API Sync/i)).toBeInTheDocument();
  });

  it("advances queue progress when clicking step button", () => {
    render(<SwayaSimulator />);

    const stepBtn = screen.getByRole("button", { name: /\+ Step Queue/i });
    fireEvent.click(stepBtn);

    expect(screen.getByText(/\[ 83% \]/i)).toBeInTheDocument();
  });

  it("resets queue progress when clicking reset button", () => {
    render(<SwayaSimulator />);

    const resetBtn = screen.getByRole("button", { name: /Reset/i });
    fireEvent.click(resetBtn);

    expect(screen.getByText(/\[ 25% \]/i)).toBeInTheDocument();
  });
});
