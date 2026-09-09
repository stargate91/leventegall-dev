import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Avatar from "./Avatar";

describe("Avatar UI Component", () => {
  it("renders with image when src is provided with lazy loading and async decoding by default", () => {
    render(<Avatar src="/assets/profile.jpg" alt="Levente Gall" />);
    const img = screen.getByAltText("Levente Gall");
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("/_next/image");
    expect(img.getAttribute("src")).toContain(encodeURIComponent("/assets/profile.jpg"));
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveAttribute("decoding", "async");
  });

  it("renders initials fallback when src is missing", () => {
    render(<Avatar initials="LG" alt="Levente Gall" />);
    expect(screen.getByText("LG")).toBeInTheDocument();
  });

  it("renders custom fallback node when provided", () => {
    render(<Avatar fallback={<span data-testid="custom-fb">VIP</span>} />);
    expect(screen.getByTestId("custom-fb")).toBeInTheDocument();
  });

  it("falls back to initials/icon when image errors out", () => {
    render(<Avatar src="/invalid-image.jpg" alt="Broken User" initials="BU" />);
    const img = screen.getByAltText("Broken User");
    fireEvent.error(img);
    expect(screen.getByText("BU")).toBeInTheDocument();
  });

  it("applies circle, square, and rounded shape classes", () => {
    const { container: circleContainer } = render(<Avatar shape="circle" initials="C" />);
    expect(circleContainer.firstElementChild?.className).toContain("shapeCircle");

    const { container: squareContainer } = render(<Avatar shape="square" initials="S" />);
    expect(squareContainer.firstElementChild?.className).toContain("shapeSquare");

    const { container: roundedContainer } = render(<Avatar shape="rounded" initials="R" />);
    expect(roundedContainer.firstElementChild?.className).toContain("shapeRounded");
  });

  it("applies standard preset sizes and custom numeric dimensions", () => {
    const { container: smContainer } = render(<Avatar size="sm" initials="SM" />);
    expect(smContainer.firstElementChild?.className).toContain("sizeSm");

    const { container: customContainer } = render(<Avatar size={64} initials="64" />);
    const el = customContainer.firstElementChild as HTMLElement;
    expect(el.style.width).toBe("64px");
    expect(el.style.height).toBe("64px");
  });

  it("renders status beacon dot when status prop is provided", () => {
    const { container } = render(<Avatar status="online" initials="ON" />);
    const badge = container.querySelector("[aria-hidden='true']._statusBadge_5ca9fb, [class*='statusBadge']");
    expect(badge).toBeInTheDocument();
    expect(badge?.className).toContain("statusOnline");
  });
});
