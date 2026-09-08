import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Lightbox from "./Lightbox";

describe("Lightbox UI Primitive", () => {
  const sampleItem = {
    src: "/projects/swaya/organizer.webp",
    alt: "Sample Alt Text",
    title: "Sample Title",
    caption: "Sample Caption",
  };

  it("does not render when isOpen is false", () => {
    render(
      <Lightbox
        isOpen={false}
        onClose={vi.fn()}
        activeItem={sampleItem}
      />,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders via portal when isOpen is true with accessibility attributes", () => {
    render(
      <Lightbox
        isOpen={true}
        onClose={vi.fn()}
        activeItem={sampleItem}
        currentIndex={0}
        totalCount={2}
      />,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("Sample Title")).toBeInTheDocument();
    expect(screen.getByText("[ 1 / 2 ]")).toBeInTheDocument();
    expect(screen.getByText("Sample Caption")).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked or Escape key is pressed", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(
      <Lightbox
        isOpen={true}
        onClose={handleClose}
        activeItem={sampleItem}
        closeLabel="Close preview"
      />,
    );

    const closeBtn = screen.getByLabelText("Close preview");
    await user.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);

    await user.keyboard("{Escape}");
    expect(handleClose).toHaveBeenCalledTimes(2);

    rerender(
      <Lightbox
        isOpen={false}
        onClose={handleClose}
        activeItem={sampleItem}
      />,
    );
  });

  it("navigates through items with navigation buttons and arrow keys", async () => {
    const handlePrev = vi.fn();
    const handleNext = vi.fn();
    const user = userEvent.setup();

    render(
      <Lightbox
        isOpen={true}
        onClose={vi.fn()}
        activeItem={sampleItem}
        currentIndex={0}
        totalCount={2}
        onPrev={handlePrev}
        onNext={handleNext}
        prevLabel="Previous screenshot"
        nextLabel="Next screenshot"
      />,
    );

    const prevBtn = screen.getByLabelText("Previous screenshot");
    const nextBtn = screen.getByLabelText("Next screenshot");

    await user.click(nextBtn);
    expect(handleNext).toHaveBeenCalledTimes(1);

    await user.click(prevBtn);
    expect(handlePrev).toHaveBeenCalledTimes(1);

    await user.keyboard("{ArrowRight}");
    expect(handleNext).toHaveBeenCalledTimes(2);

    await user.keyboard("{ArrowLeft}");
    expect(handlePrev).toHaveBeenCalledTimes(2);
  });
});
