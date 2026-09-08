import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Tooltip from "./Tooltip";

describe("Tooltip UI Primitive", () => {
  it("renders trigger element without crashing", () => {
    render(
      <Tooltip content="Helper text">
        <button type="button">Hover me</button>
      </Tooltip>,
    );

    expect(screen.getByRole("button", { name: /hover me/i })).toBeInTheDocument();
  });

  it("renders trigger directly when content is empty", () => {
    render(
      <Tooltip content="">
        <button type="button">No tooltip</button>
      </Tooltip>,
    );

    expect(screen.getByRole("button", { name: /no tooltip/i })).toBeInTheDocument();
  });

  it("displays tooltip content on hover", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Telemetry status OK" delayDuration={0}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    const button = screen.getByRole("button", { name: /trigger/i });
    await user.hover(button);

    expect(await screen.findByText("Telemetry status OK")).toBeInTheDocument();
  });

  it("supports different variants and custom classNames", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Cyan highlight" variant="cyan" className="custom-tooltip" delayDuration={0}>
        <button type="button">Cyan Button</button>
      </Tooltip>,
    );

    const button = screen.getByRole("button", { name: /cyan button/i });
    await user.hover(button);

    const tooltipEl = await screen.findByText("Cyan highlight");
    expect(tooltipEl).toBeInTheDocument();
    expect(tooltipEl.className).toContain("custom-tooltip");
  });
});
