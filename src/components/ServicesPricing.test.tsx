import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ServicesPricing from "./ServicesPricing";

describe("ServicesPricing Component", () => {
  it("renders all package tiers with pricing and deliverables", () => {
    render(<ServicesPricing />);

    expect(screen.getByRole("heading", { name: "Brand Naming & Identity" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Complete Product Launch" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Full-Stack Development" })).toBeInTheDocument();

    expect(screen.getByText(/From \$490/i)).toBeInTheDocument();
    expect(screen.getByText(/From \$1,850/i)).toBeInTheDocument();
    expect(screen.getByText(/From \$1,450/i)).toBeInTheDocument();
  });

  it("dispatches select-package-tier custom window event and pushes deep link URL on package selection", () => {
    const dispatchSpy = vi.spyOn(window, "dispatchEvent");
    const pushStateSpy = vi.spyOn(window.history, "pushState");
    render(<ServicesPricing />);

    const selectButtons = screen.getAllByRole("button", { name: /Select Package/i });
    const firstButton = selectButtons[0];
    expect(firstButton).toBeDefined();
    if (firstButton) {
      fireEvent.click(firstButton);
    }

    expect(dispatchSpy).toHaveBeenCalled();
    const event = dispatchSpy.mock.calls[0]?.[0] as CustomEvent<{ tierId: string }>;
    expect(event?.type).toBe("select-package-tier");
    expect(event?.detail?.tierId).toBe("naming");

    expect(pushStateSpy).toHaveBeenCalledWith(
      {},
      "",
      expect.stringContaining("tier=naming#contact"),
    );
  });
});
