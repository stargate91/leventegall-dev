import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CardMetaBar from "./CardMetaBar";

describe("CardMetaBar UI Primitive", () => {
  it("renders badge and telemetry text with prefix", () => {
    render(
      <CardMetaBar
        badge="PRODUCTION ARTIFACT"
        telemetry="DESKTOP SYSTEM ARCHITECTURE"
      />,
    );

    expect(screen.getByText("PRODUCTION ARTIFACT")).toBeInTheDocument();
    expect(screen.getByText("DESKTOP SYSTEM ARCHITECTURE")).toBeInTheDocument();
    expect(screen.getByText("//")).toBeInTheDocument();
  });

  it("renders custom badge node and custom right node", () => {
    render(
      <CardMetaBar
        badge={<span data-testid="custom-badge">Custom</span>}
        right={<span data-testid="custom-right">Custom Right</span>}
      />,
    );

    expect(screen.getByTestId("custom-badge")).toBeInTheDocument();
    expect(screen.getByTestId("custom-right")).toBeInTheDocument();
  });
});
