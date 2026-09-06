import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Select, { type SelectOption } from "./Select";

const mockOptions: SelectOption[] = [
  { value: "option-1", label: "First Option", subtext: "Sub 1" },
  { value: "option-2", label: "Second Option", subtext: "Sub 2" },
  { value: "option-3", label: "Disabled Option", disabled: true },
];

describe("Select UI Component", () => {
  it("renders with placeholder and closed dropdown initially", () => {
    render(
      <Select
        id="test-select"
        label="Test Select Label"
        options={mockOptions}
        placeholder="Choose an option"
      />,
    );

    expect(screen.getByText("Test Select Label")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveTextContent("Choose an option");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens dropdown menu on click and selects an option", () => {
    const handleChange = vi.fn();
    render(
      <Select
        id="test-select"
        label="Test Select"
        options={mockOptions}
        onChange={handleChange}
      />,
    );

    const trigger = screen.getByRole("combobox");
    fireEvent.click(trigger);

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByText("First Option")).toBeInTheDocument();
    expect(screen.getByText("Second Option")).toBeInTheDocument();

    const secondOpt = screen.getByRole("option", { name: /Second Option/i });
    fireEvent.click(secondOpt);

    expect(handleChange).toHaveBeenCalledWith("option-2");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not select disabled options", () => {
    const handleChange = vi.fn();
    render(
      <Select
        id="test-select"
        options={mockOptions}
        onChange={handleChange}
      />,
    );

    fireEvent.click(screen.getByRole("combobox"));
    const disabledOpt = screen.getByRole("option", { name: /Disabled Option/i });
    fireEvent.click(disabledOpt);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("closes dropdown when clicking outside", () => {
    render(
      <div>
        <div data-testid="outside">Outside Area</div>
        <Select id="test-select" options={mockOptions} />
      </div>,
    );

    fireEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("handles keyboard navigation: Enter, Escape, ArrowDown, ArrowUp", () => {
    const handleChange = vi.fn();
    render(
      <Select
        id="test-select"
        options={mockOptions}
        value="option-1"
        onChange={handleChange}
      />,
    );

    const trigger = screen.getByRole("combobox");

    // Open with Enter
    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    // Close with Escape
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    // ArrowDown to open & navigate
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    expect(handleChange).toHaveBeenCalledWith("option-2");

    fireEvent.keyDown(trigger, { key: "ArrowUp" });
    expect(handleChange).toHaveBeenCalledWith("option-1");
  });

  it("renders error message when error prop is provided", () => {
    render(
      <Select
        id="test-select"
        options={mockOptions}
        error="Selection is required"
      />,
    );

    expect(screen.getByText("Selection is required")).toBeInTheDocument();
  });

  it("does not open when disabled", () => {
    render(
      <Select
        id="test-select"
        options={mockOptions}
        disabled
      />,
    );

    const trigger = screen.getByRole("combobox");
    expect(trigger).toBeDisabled();

    fireEvent.click(trigger);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
