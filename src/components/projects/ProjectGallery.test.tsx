import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProjectGallery from "./ProjectGallery";

const mockItems = [
  {
    id: "organizer",
    src: "/projects/swaya/organizer.webp",
    title: "Media Organizer & Renaming Pipeline",
  },
  {
    id: "library",
    src: "/projects/swaya/library.webp",
    title: "Media Library & Poster Grid",
  },
  {
    id: "detail",
    src: "/projects/swaya/detail.webp",
    title: "Media Details & Metadata Inspector",
  },
];

describe("ProjectGallery Component", () => {
  it("renders screenshot thumbnails with accessible titles", () => {
    render(<ProjectGallery items={mockItems} previewCaption="Test Preview" />);

    expect(screen.getByRole("button", { name: /Media Organizer & Renaming Pipeline/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Media Library & Poster Grid/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Media Details & Metadata Inspector/i })).toBeInTheDocument();
  });

  it("opens Lightbox modal upon clicking a thumbnail and closes on close button", () => {
    render(<ProjectGallery items={mockItems} previewCaption="Test Preview" />);

    const thumbnailBtn = screen.getByRole("button", { name: /Media Organizer & Renaming Pipeline/i });
    fireEvent.click(thumbnailBtn);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Test Preview")).toBeInTheDocument();

    const closeBtn = screen.getByRole("button", { name: /Close viewer/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes Lightbox modal upon pressing Escape key", () => {
    render(<ProjectGallery items={mockItems} previewCaption="Test Preview" />);

    const thumbnailBtn = screen.getByRole("button", { name: /Media Library & Poster Grid/i });
    fireEvent.click(thumbnailBtn);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("navigates between screenshots with next and previous buttons across items", () => {
    render(<ProjectGallery items={mockItems} previewCaption="Test Preview" />);

    const thumbnailBtn = screen.getByRole("button", { name: /Media Organizer & Renaming Pipeline/i });
    fireEvent.click(thumbnailBtn);

    expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument();

    const nextBtn = screen.getByRole("button", { name: /Next image/i });
    fireEvent.click(nextBtn);

    expect(screen.getByText(/2 \/ 3/)).toBeInTheDocument();

    fireEvent.click(nextBtn);
    expect(screen.getByText(/3 \/ 3/)).toBeInTheDocument();

    const prevBtn = screen.getByRole("button", { name: /Previous image/i });
    fireEvent.click(prevBtn);

    expect(screen.getByText(/2 \/ 3/)).toBeInTheDocument();
  });

  it("returns null when items array is empty", () => {
    const { container } = render(<ProjectGallery items={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
