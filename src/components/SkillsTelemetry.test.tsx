import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SkillsTelemetry from "./SkillsTelemetry";

describe("SkillsTelemetry Component", () => {
  it("renders the section header and description", () => {
    render(<SkillsTelemetry />);

    expect(screen.getByText(/Skills & Technical Capabilities/i)).toBeInTheDocument();
    expect(screen.getByText(/Core Competencies/i)).toBeInTheDocument();
  });

  it("renders all 8 skill categories", () => {
    render(<SkillsTelemetry />);

    expect(screen.getByRole("heading", { name: "Languages" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Backend" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Frontend" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Database" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Testing & Code Quality" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Desktop & Native" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Mathematics & Modeling" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Verbal Branding & Creative" })).toBeInTheDocument();
  });

  it("renders verified technology tags for core competencies", () => {
    render(<SkillsTelemetry />);

    // Languages including C
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();

    // Backend
    expect(screen.getByText("FastAPI")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("GraphQL")).toBeInTheDocument();
    expect(screen.getByText("Asyncio")).toBeInTheDocument();

    // Frontend
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();

    // Database
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
    expect(screen.getByText("Redis")).toBeInTheDocument();

    // Testing & Code Quality
    expect(screen.getByText("Playwright")).toBeInTheDocument();
    expect(screen.getByText("Pytest")).toBeInTheDocument();
    expect(screen.getByText("Pyright")).toBeInTheDocument();
    expect(screen.getByText("Pyrefly")).toBeInTheDocument();

    // Desktop
    expect(screen.getByText("Electron")).toBeInTheDocument();
    expect(screen.getByText("MPV IPC")).toBeInTheDocument();

    // Mathematics & Modeling
    expect(screen.getByText("Analysis")).toBeInTheDocument();
    expect(screen.getByText("Differential Equations")).toBeInTheDocument();
    expect(screen.getByText("MATLAB")).toBeInTheDocument();
    expect(screen.getByText("Jupyter Notebook")).toBeInTheDocument();
    expect(screen.getByText("Gnuplot")).toBeInTheDocument();
    expect(screen.getByText("LaTeX")).toBeInTheDocument();

    // Branding
    expect(screen.getByText("Brand Naming")).toBeInTheDocument();
    expect(screen.getByText("Canva")).toBeInTheDocument();
    expect(screen.getByText("Photoshop")).toBeInTheDocument();
  });
});
