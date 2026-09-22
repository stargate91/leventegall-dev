import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ContactForm, {
  contactFormReducer,
  initialFormState,
  type ContactFormState,
} from "./ContactForm";

describe("contactFormReducer", () => {
  it("handles SET_FIELD and clears field error", () => {
    const stateWithErrors: ContactFormState = {
      ...initialFormState,
      errors: { name: "NAME REQUIRED" },
    };

    const nextState = contactFormReducer(stateWithErrors, {
      type: "SET_FIELD",
      field: "name",
      value: "Arthur Dent",
    });

    expect(nextState.formData.name).toBe("Arthur Dent");
    expect(nextState.errors.name).toBeUndefined();
  });

  it("handles SET_TIER", () => {
    const nextState = contactFormReducer(initialFormState, {
      type: "SET_TIER",
      tier: "naming",
    });

    expect(nextState.formData.tier).toBe("naming");
  });

  it("handles SET_ERRORS and CLEAR_ERROR", () => {
    const stateWithErrors = contactFormReducer(initialFormState, {
      type: "SET_ERRORS",
      errors: { name: "NAME REQUIRED", email: "EMAIL REQUIRED" },
    });

    expect(stateWithErrors.errors.name).toBe("NAME REQUIRED");
    expect(stateWithErrors.errors.email).toBe("EMAIL REQUIRED");

    const clearedState = contactFormReducer(stateWithErrors, {
      type: "CLEAR_ERROR",
      field: "name",
    });

    expect(clearedState.errors.name).toBeUndefined();
    expect(clearedState.errors.email).toBe("EMAIL REQUIRED");
  });

  it("handles SUBMIT_START, SUBMIT_SUCCESS, and SUBMIT_ERROR", () => {
    const submittingState = contactFormReducer(initialFormState, {
      type: "SUBMIT_START",
    });
    expect(submittingState.status).toBe("transmitting");

    // Guard against duplicate start transitions
    const duplicateState = contactFormReducer(submittingState, {
      type: "SUBMIT_START",
    });
    expect(duplicateState).toBe(submittingState);

    const successState = contactFormReducer(submittingState, {
      type: "SUBMIT_SUCCESS",
      telemetryId: "TX-999-ACK",
    });
    expect(successState.status).toBe("success");
    expect(successState.telemetryId).toBe("TX-999-ACK");

    const errorState = contactFormReducer(submittingState, {
      type: "SUBMIT_ERROR",
      error: "Rate limit exceeded",
    });
    expect(errorState.status).toBe("error");
    expect(errorState.serverError).toBe("Rate limit exceeded");
  });

  it("handles RESET_FORM", () => {
    const modifiedState: ContactFormState = {
      formData: {
        name: "Test",
        email: "test@example.com",
        tier: "web-dev",
        timeline: "1-week",
        brief: "Short brief",
      },
      errors: { name: "Some error" },
      status: "error",
      telemetryId: "TX-123",
      serverError: "Server error",
    };

    const resetState = contactFormReducer(modifiedState, {
      type: "RESET_FORM",
    });

    expect(resetState.status).toBe("idle");
    expect(resetState.telemetryId).toBe("");
    expect(resetState.serverError).toBeUndefined();
    expect(resetState.formData.name).toBe("");
    expect(resetState.formData.email).toBe("");
    expect(resetState.formData.brief).toBe("");
    expect(resetState.formData.tier).toBe("web-dev");
  });
});

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

    expect(await screen.findByText(/Please enter your name/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please enter your email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/Please describe your project goals/i)).toBeInTheDocument();
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

    // Resetting form
    const resetBtn = screen.getByRole("button", { name: /Send Another Message/i });
    fireEvent.click(resetBtn);

    expect(screen.getByLabelText(/Your Name/i)).toHaveValue("");
  });

  it("handles transmission failure gracefully and displays specific backend error message", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        error: "Too many transmissions. Please wait before sending another message.",
      }),
    } as unknown as Response);

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: "Commander Shepard" } });
    fireEvent.change(screen.getByLabelText(/Your Email Address/i), { target: { value: "shepard@normandy.alliance" } });
    fireEvent.change(screen.getByLabelText(/Project Details/i), {
      target: { value: "Emergency uplink payload." },
    });

    const submitBtn = screen.getByRole("button", { name: /Send Message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Too many transmissions. Please wait before sending another message./i)).toBeInTheDocument();
    });
  });

  it("syncs selected package tier from custom window event", () => {
    render(<ContactForm />);

    const select = screen.getByRole("combobox", { name: /Project Scope/i });
    expect(select).toHaveTextContent(/Full-Stack & Web Development/i);

    fireEvent(
      window,
      new CustomEvent("select-package-tier", { detail: { tierId: "discord-bot" } }),
    );

    expect(select).toHaveTextContent(/Discord Bot Development/i);
  });

  it("syncs selected package tier from URL search parameter on load", () => {
    window.history.pushState({}, "", "/?tier=discord-bot#contact");

    render(<ContactForm />);

    const select = screen.getByRole("combobox", { name: /Project Scope/i });
    expect(select).toHaveTextContent(/Discord Bot Development/i);
  });
});
