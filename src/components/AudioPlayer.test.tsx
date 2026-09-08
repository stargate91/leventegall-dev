import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AudioPlayer from "./AudioPlayer";
import { LocaleProvider } from "@/locales";

describe("AudioPlayer Component", () => {
  it("renders collapsed floating pill initially with active track code and accessible labels", () => {
    render(
      <LocaleProvider>
        <AudioPlayer />
      </LocaleProvider>,
    );

    const toggleButton = screen.getByTestId("audio-player-pill");
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(within(toggleButton).getByText(/Mix 07/i)).toBeInTheDocument();
    expect(within(toggleButton).getByText(/174 BPM/i)).toBeInTheDocument();
  });

  it("expands HUD console upon click and displays track metadata, playlist, and controls", () => {
    render(
      <LocaleProvider>
        <AudioPlayer />
      </LocaleProvider>,
    );

    const toggleButton = screen.getByTestId("audio-player-pill");
    fireEvent.click(toggleButton);

    expect(screen.getByRole("dialog", { name: /Mix 07 - Critical x Shogun DnB/i })).toBeInTheDocument();
    expect(screen.getByText(/Music Player/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Critical x Shogun DnB/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Play$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Mute$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Next track$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Previous track$/i })).toBeInTheDocument();

    // Verify all Mix tracks are listed in the playlist
    expect(screen.getByRole("option", { name: /Mix 08/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /Mix 01/i })).toBeInTheDocument();
  });

  it("switches tracks when clicking next / prev buttons or choosing from the playlist", () => {
    render(
      <LocaleProvider>
        <AudioPlayer />
      </LocaleProvider>,
    );

    // Open HUD
    fireEvent.click(screen.getByTestId("audio-player-pill"));

    // Click Next Track (should switch to Mix 08)
    const nextBtn = screen.getByRole("button", { name: /^Next track$/i });
    fireEvent.click(nextBtn);

    expect(screen.getByRole("heading", { name: /Techno Phase/i })).toBeInTheDocument();
    expect(screen.getAllByText(/135 BPM/i).length).toBeGreaterThan(0);

    // Click a specific track in the playlist: Mix 05
    const mix05Option = screen.getByRole("option", { name: /Mix 05.*Liquid Drum & Bass/i });
    fireEvent.click(mix05Option);

    expect(screen.getByRole("heading", { name: /Liquid Drum & Bass/i })).toBeInTheDocument();
  });

  it("toggles play / pause state and updates button text and visualizer state", () => {
    render(
      <LocaleProvider>
        <AudioPlayer />
      </LocaleProvider>,
    );

    // Open HUD
    fireEvent.click(screen.getByTestId("audio-player-pill"));

    const playButton = screen.getByRole("button", { name: /^Play$/i });
    fireEvent.click(playButton);

    // Should switch to Pause
    expect(screen.getByRole("button", { name: /^Pause$/i })).toBeInTheDocument();

    // Click pause
    fireEvent.click(screen.getByRole("button", { name: /^Pause$/i }));
    expect(screen.getByRole("button", { name: /^Play$/i })).toBeInTheDocument();
  });

  it("toggles mute state upon clicking volume button", () => {
    render(
      <LocaleProvider>
        <AudioPlayer />
      </LocaleProvider>,
    );

    fireEvent.click(screen.getByTestId("audio-player-pill"));

    const muteButton = screen.getByRole("button", { name: /^Mute$/i });
    fireEvent.click(muteButton);

    expect(screen.getByRole("button", { name: /^Unmute$/i })).toBeInTheDocument();
  });

  it("closes the HUD console when clicking close button or pressing Escape", () => {
    render(
      <LocaleProvider>
        <AudioPlayer />
      </LocaleProvider>,
    );

    // Open HUD
    fireEvent.click(screen.getByTestId("audio-player-pill"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Press Escape
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Open again and click close button in header
    fireEvent.click(screen.getByTestId("audio-player-pill"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const closeBtn = screen.getByTestId("audio-player-close-btn");
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("ignores postMessage events from untrusted origins and accepts trusted Mixcloud origin", () => {
    render(
      <LocaleProvider>
        <AudioPlayer />
      </LocaleProvider>,
    );

    // Open HUD
    fireEvent.click(screen.getByTestId("audio-player-pill"));
    expect(screen.getByRole("button", { name: /^Play$/i })).toBeInTheDocument();

    const createMessageEvent = (data: unknown, origin: string) => {
      const event = new MessageEvent("message", { data });
      Object.defineProperty(event, "origin", { value: origin });
      return event;
    };

    // Untrusted origin: should NOT trigger play state change
    fireEvent(
      window,
      createMessageEvent(
        JSON.stringify({ widgetEvent: "play" }),
        "https://attacker.example.com",
      ),
    );
    expect(screen.getByRole("button", { name: /^Play$/i })).toBeInTheDocument();

    // Trusted origin: should trigger play state change to Pause button
    fireEvent(
      window,
      createMessageEvent(
        JSON.stringify({ widgetEvent: "play" }),
        "https://player-widget.mixcloud.com",
      ),
    );
    expect(screen.getByRole("button", { name: /^Pause$/i })).toBeInTheDocument();

    // Trusted origin pause event
    fireEvent(
      window,
      createMessageEvent(
        JSON.stringify({ widgetEvent: "pause" }),
        "https://player-widget.mixcloud.com",
      ),
    );
    expect(screen.getByRole("button", { name: /^Play$/i })).toBeInTheDocument();
  });
});
