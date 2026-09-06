import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ContactForm from "./ContactForm";

describe("ContactForm Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders form inputs and labels", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Project Details/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send Message/i })).toBeInTheDocument();
  });

  it("shows client-side validation errors when submitting empty fields", async () => {
    render(<ContactForm />);

    const submitBtn = screen.getByRole("button", { name: /Send Message/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/CALLSIGN REQUIRED/i)).toBeInTheDocument();
    expect(await screen.findByText(/FREQUENCY REQUIRED/i)).toBeInTheDocument();
    expect(await screen.findByText(/PAYLOAD REQUIRED/i)).toBeInTheDocument();
  });

  it("submits the form successfully and displays telemetry acknowledgement", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        telemetryId: "TX-TEST-ACK-100",
        message: "Signal received",
      }),
    } as unknown as Response);

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: "Commander Shepard" } });
    fireEvent.change(screen.getByLabelText(/Your Email Address/i), { target: { value: "shepard@normandy.alliance" } });
    fireEvent.change(screen.getByLabelText(/Project Details/i), {
      target: { value: "We need an emergency full-stack telemetry uplink to Earth." },
    });

    const submitBtn = screen.getByRole("button", { name: /Send Message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Message Sent Successfully/i)).toBeInTheDocument();
      expect(screen.getByText(/Reference ID: TX-TEST-ACK-100/i)).toBeInTheDocument();
    });
  });
});
