import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Testimonials from "./Testimonials";

describe("Testimonials Component", () => {
  it("renders the section header and social proof rating badge", () => {
    render(<Testimonials />);

    expect(screen.getByText(/Client Reviews & Track Record/i)).toBeInTheDocument();
    expect(screen.getByText(/Client Feedback/i)).toBeInTheDocument();
    expect(screen.getByText(/4\.8 TOP-RATED ON FIVERR/i)).toBeInTheDocument();
  });

  it("renders the verified client testimonials with quotes and clients", () => {
    render(<Testimonials />);

    expect(screen.getByText(/Fintech Startup Founder/i)).toBeInTheDocument();
    expect(screen.getByText(/SaaS Platform Director/i)).toBeInTheDocument();
    expect(screen.getByText(/The names delivered weren't just creative/i)).toBeInTheDocument();
    expect(screen.getByText(/Clear communication, fast turnaround/i)).toBeInTheDocument();
  });
});
