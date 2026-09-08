"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  VolumeMute,
  VolumeUp,
  Close,
  Launch,
} from "@carbon/icons-react";
import styles from "./AudioPlayer.module.css";
import {
  Button,
  IconButton,
  Tooltip,
  Text,
} from "@/components/ui";
import { siteConfig } from "@/config/site";
import { useLocale } from "@/locales";

interface MixcloudWidgetInstance {
  ready: Promise<MixcloudWidgetInstance>;
  play?: () => Promise<void>;
  pause?: () => Promise<void>;
  togglePlay?: () => Promise<void>;
  load?: (feed: string, autoplay?: boolean) => Promise<void>;
  setVolume?: (volume: number) => Promise<void>;
  getIsPaused?: () => Promise<boolean>;
  events?: {
    play: { on: (cb: () => void) => void };
    pause: { on: (cb: () => void) => void };
    ended: { on: (cb: () => void) => void };
    error: { on: (cb: () => void) => void };
    progress?: { on: (cb: () => void) => void };
  };
}

declare global {
  interface Window {
    Mixcloud?: {
      PlayerWidget: (iframe: HTMLIFrameElement) => MixcloudWidgetInstance;
    };
  }
}

const ALLOWED_MIXCLOUD_ORIGINS = new Set([
  "https://player-widget.mixcloud.com",
  "https://www.mixcloud.com",
  "https://widget.mixcloud.com",
]);

export default function AudioPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWidgetReady, setIsWidgetReady] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [activeFeed, setActiveFeed] = useState(siteConfig.audio.tracks[0]?.feed || "");
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<MixcloudWidgetInstance | null>(null);
  const pendingPlayRef = useRef(false);
  const { dict } = useLocale();

  const tracks = siteConfig.audio.tracks;
  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  const handleNextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => {
      const nextIdx = prev < tracks.length - 1 ? prev + 1 : 0;
      const nextTrack = tracks[nextIdx];
      if (nextTrack) {
        setActiveFeed(nextTrack.feed);
        setIsPlaying(true);
        const widget = widgetRef.current;
        if (widget && typeof widget.load === "function") {
          widget.load(nextTrack.feed, true).catch(() => {});
        } else {
          pendingPlayRef.current = true;
        }
      }
      return nextIdx;
    });
  }, [tracks]);

  const handlePrevTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => {
      const prevIdx = prev > 0 ? prev - 1 : tracks.length - 1;
      const prevTrack = tracks[prevIdx];
      if (prevTrack) {
        setActiveFeed(prevTrack.feed);
        setIsPlaying(true);
        const widget = widgetRef.current;
        if (widget && typeof widget.load === "function") {
          widget.load(prevTrack.feed, true).catch(() => {});
        } else {
          pendingPlayRef.current = true;
        }
      }
      return prevIdx;
    });
  }, [tracks]);

  // Helper to initialize widget once iframe & window.Mixcloud are available
  const setupWidget = useCallback(() => {
    if (!iframeRef.current || typeof window === "undefined" || !window.Mixcloud) {
      return;
    }

    try {
      const widget = window.Mixcloud.PlayerWidget(iframeRef.current);
      widgetRef.current = widget;

      widget.ready
        .then((resolved) => {
          const activeWidget = resolved || widget;
          widgetRef.current = activeWidget;
          setIsWidgetReady(true);

          if (activeWidget.events) {
            activeWidget.events.play?.on?.(() => setIsPlaying(true));
            activeWidget.events.pause?.on?.(() => setIsPlaying(false));
            activeWidget.events.progress?.on?.(() => setIsPlaying(true));
            activeWidget.events.ended?.on?.(() => {
              handleNextTrack();
            });
          }

          if (pendingPlayRef.current) {
            pendingPlayRef.current = false;
            if (typeof activeWidget.play === "function") {
              activeWidget.play().catch(() => {});
            } else if (typeof activeWidget.togglePlay === "function") {
              activeWidget.togglePlay().catch(() => {});
            }
          }
        })
        .catch(() => {
          // Graceful fallback
        });
    } catch {
      // Graceful fallback
    }
  }, [handleNextTrack]);

  // Dynamically load Mixcloud Widget API script
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.Mixcloud) {
      setupWidget();
      return;
    }

    let script = document.getElementById("mixcloud-widget-api") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "mixcloud-widget-api";
      script.src = "https://widget.mixcloud.com/media/js/widgetApi.js";
      script.async = true;
      document.body.appendChild(script);
    }

    const onScriptLoad = () => {
      setupWidget();
    };

    script.addEventListener("load", onScriptLoad);
    return () => {
      script?.removeEventListener("load", onScriptLoad);
    };
  }, [setupWidget]);

  // Bind widget on iframe load event
  const handleIframeLoad = useCallback(() => {
    setupWidget();
  }, [setupWidget]);

  const handleToggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next && !isLoaded) {
        setIsLoaded(true);
      }
      return next;
    });
  }, [isLoaded]);

  const handleTogglePlay = useCallback(() => {
    if (!isLoaded) {
      setIsLoaded(true);
    }

    const widget = widgetRef.current;
    if (widget && isWidgetReady) {
      if (isPlaying) {
        if (typeof widget.pause === "function") {
          widget.pause().catch(() => {});
        } else if (typeof widget.togglePlay === "function") {
          widget.togglePlay().catch(() => {});
        }
        setIsPlaying(false);
      } else {
        if (typeof widget.play === "function") {
          widget.play().catch(() => {});
        } else if (typeof widget.togglePlay === "function") {
          widget.togglePlay().catch(() => {});
        }
        setIsPlaying(true);
      }
    } else {
      pendingPlayRef.current = !isPlaying;
      setIsPlaying((prev) => !prev);
    }
  }, [isLoaded, isPlaying, isWidgetReady]);

  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const nextMuted = !prev;
      const widget = widgetRef.current;
      if (widget && typeof widget.setVolume === "function") {
        widget.setVolume(nextMuted ? 0 : 1).catch(() => {});
      }
      return nextMuted;
    });
  }, []);

  const handleSelectTrack = useCallback((index: number) => {
    setCurrentTrackIndex(index);
    if (!isLoaded) {
      setIsLoaded(true);
    }

    const selected = tracks[index];
    if (selected) {
      setActiveFeed(selected.feed);
      setIsPlaying(true);
      const widget = widgetRef.current;
      if (widget && typeof widget.load === "function") {
        widget.load(selected.feed, true).catch(() => {});
      } else {
        pendingPlayRef.current = true;
      }
    }
  }, [isLoaded, tracks]);

  // Calculate exact musical timing intervals from track BPM
  const numericBpm = parseInt(currentTrack?.bpm || "174", 10) || 174;
  const beatMs = Math.round((60 / numericBpm) * 1000);
  const halfBeatMs = Math.round(beatMs / 2);
  const twoBeatsMs = Math.round(beatMs * 2);
  const barMs = Math.round(beatMs * 4);

  // Listen to Mixcloud iframe postMessage events for instant play/pause/ended synchronization
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!ALLOWED_MIXCLOUD_ORIGINS.has(event.origin)) {
        return;
      }
      try {
        let data = event.data;
        if (typeof data === "string" && (data.includes("play") || data.includes("pause") || data.includes("ended"))) {
          data = JSON.parse(data);
        }
        if (typeof data === "object" && data !== null) {
          const eventName = data.widgetEvent || data.event || data.type;
          if (eventName === "play") {
            setIsPlaying(true);
          } else if (eventName === "pause") {
            setIsPlaying(false);
          } else if (eventName === "ended") {
            handleNextTrack();
          }
        }
      } catch {
        // Ignore non-JSON postMessages
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleNextTrack]);

  // Polling sync with widget.getIsPaused to prevent any state desync
  useEffect(() => {
    if (!isWidgetReady || !widgetRef.current) {
      return;
    }

    const interval = setInterval(() => {
      const widget = widgetRef.current;
      if (widget && typeof widget.getIsPaused === "function") {
        widget
          .getIsPaused()
          .then((isPaused) => {
            setIsPlaying((prev) => (prev !== !isPaused ? !isPaused : prev));
          })
          .catch(() => {});
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isWidgetReady]);

  // Keyboard accessibility: Escape key closes the HUD console
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const iframeSrc = `https://player-widget.mixcloud.com/widget/iframe/?feed=${encodeURIComponent(activeFeed || currentTrack?.feed || "")}&hide_cover=1&light=0`;

  // Initialize on client mount so player is preloaded and ready
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.playerAnchor} ${isPlaying ? styles.isPlaying : ""}`}
      aria-label={dict.audioPlayer.badge}
      style={
        {
          "--bpm-beat": `${beatMs}ms`,
          "--bpm-half-beat": `${halfBeatMs}ms`,
          "--bpm-two-beats": `${twoBeatsMs}ms`,
          "--bpm-bar": `${barMs}ms`,
        } as React.CSSProperties
      }
    >
      {/* HUD Console Card */}
      <section
        role={isOpen ? "dialog" : undefined}
        aria-modal={isOpen ? "false" : undefined}
        aria-hidden={!isOpen}
        aria-label={currentTrack ? `${currentTrack.code} - ${currentTrack.title}` : dict.audioPlayer.badge}
        className={`${styles.hudCard} ${isOpen ? styles.hudCardOpen : styles.hudCardClosed}`}
      >
        {/* Header */}
        <div className={styles.cardHeader}>
          <span className={styles.headerTelemetry}>
            {dict.audioPlayer.badge}
          </span>
          <IconButton
            icon={<Close size={16} />}
            ariaLabel={dict.audioPlayer.closePlayer}
            variant="ghost"
            size="sm"
            data-testid="audio-player-close-btn"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Body */}
        <div className={styles.cardBody}>
          {/* Current Track Info */}
          <div className={styles.trackInfo}>
            <div className={styles.trackMetaRow}>
              <span className={styles.genreBadge}>
                {currentTrack?.genre}
              </span>
            </div>

            <Text as="h4" font="heading" size="base" weight="bold" tone="primary" className={styles.trackTitle}>
              {currentTrack?.title}
            </Text>

            <Text as="p" size="xs" tone="secondary" className={styles.trackSubtitle}>
              {dict.audioPlayer.subtitle}
            </Text>
          </div>

          {/* Equalizer Spectrum Visualizer */}
          <div
            className={styles.expandedVisualizer}
            aria-hidden="true"
            title={isPlaying ? dict.audioPlayer.frequenciesActive : dict.audioPlayer.frequenciesStandby}
          >
            <div className={styles.visualizerHeader}>
              <span className={styles.visualizerTelemetry}>
                SPECTRUM ANALYZER <span className={styles.visualizerBands}>// 16-BAND DSP</span>
              </span>
              <span className={styles.visualizerStatus}>
                <span className={`${styles.statusLed} ${isPlaying ? styles.statusLedActive : ""}`} />
                {isPlaying ? dict.audioPlayer.frequenciesActive : dict.audioPlayer.frequenciesStandby}
              </span>
            </div>

            <div className={styles.visualizerStage}>
              <div className={styles.visualizerGrid}>
                <span className={styles.gridLine} />
                <span className={styles.gridLine} />
                <span className={styles.gridLine} />
              </div>

              <div className={styles.visualizerBars}>
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className={styles.spectrumBarCol}>
                    <span className={styles.spectrumBar} />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.frequencyScale}>
              <span>32Hz</span>
              <span>125Hz</span>
              <span>500Hz</span>
              <span>2kHz</span>
              <span>8kHz</span>
              <span>16kHz</span>
            </div>
          </div>

          {/* Mixcloud Embed / Stream Loader */}
          {isLoaded && currentTrack && (
            <>
              <div className={styles.iframeWrapper}>
                <iframe
                  ref={iframeRef}
                  id="mixcloud-player-frame"
                  title={`${currentTrack.code} ${currentTrack.title}`}
                  className={styles.mixcloudIframe}
                  src={iframeSrc}
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  onLoad={handleIframeLoad}
                />
              </div>
              <span className={styles.iframeHint}>
                {dict.audioPlayer.directPlayHint}
              </span>
            </>
          )}

          {/* Primary Controls Row */}
          <div className={styles.controlsRow}>
            <Tooltip content={dict.audioPlayer.prevTrack} side="top">
              <IconButton
                icon={<SkipBack size={16} />}
                ariaLabel={dict.audioPlayer.prevTrack}
                variant="surface"
                size="md"
                onClick={handlePrevTrack}
              />
            </Tooltip>

            <Button
              variant={isPlaying ? "secondary" : "primary"}
              size="sm"
              className={styles.mainPlayBtn}
              iconLeft={isPlaying ? <Pause size={16} /> : <Play size={16} />}
              onClick={handleTogglePlay}
            >
              {isPlaying ? dict.audioPlayer.pause : dict.audioPlayer.play}
            </Button>

            <Tooltip content={dict.audioPlayer.nextTrack} side="top">
              <IconButton
                icon={<SkipForward size={16} />}
                ariaLabel={dict.audioPlayer.nextTrack}
                variant="surface"
                size="md"
                onClick={handleNextTrack}
              />
            </Tooltip>

            <Tooltip content={isMuted ? dict.audioPlayer.unmute : dict.audioPlayer.mute} side="top">
              <IconButton
                icon={isMuted ? <VolumeMute size={18} /> : <VolumeUp size={18} />}
                ariaLabel={isMuted ? dict.audioPlayer.unmute : dict.audioPlayer.mute}
                variant="surface"
                size="md"
                onClick={handleToggleMute}
              />
            </Tooltip>

            <Tooltip content={dict.audioPlayer.listenOnMixcloud} side="top">
              <IconButton
                icon={<Launch size={18} />}
                href={currentTrack ? `https://www.mixcloud.com${currentTrack.feed}` : siteConfig.audio.profileUrl}
                target="_blank"
                ariaLabel={dict.audioPlayer.listenOnMixcloud}
                variant="surface"
                size="md"
              />
            </Tooltip>
          </div>

          {/* Playlist Tracklist Selection */}
          <div className={styles.playlistWrapper}>
            <div className={styles.playlistHeader}>
              <span>{dict.audioPlayer.selectTrack}</span>
              <span>{currentTrackIndex + 1} / {tracks.length}</span>
            </div>

            <div className={styles.playlistList} role="listbox" aria-label={dict.audioPlayer.selectTrack}>
              {tracks.map((track, idx) => {
                const isSelected = idx === currentTrackIndex;

                return (
                  <button
                    key={track.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`${styles.trackItem} ${isSelected ? styles.activeTrackItem : ""}`}
                    onClick={() => handleSelectTrack(idx)}
                  >
                    <div className={styles.trackItemLeft}>
                      <span className={styles.trackItemCode}>{track.code}</span>
                      <span className={styles.trackItemTitle}>{track.title}</span>
                    </div>
                    <div className={styles.trackItemRight}>
                      <span>{track.bpm}</span>
                      <span>{track.duration}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Collapsed Floating Pill Toggle */}
      <button
        type="button"
        data-testid="audio-player-pill"
        className={styles.floatingPill}
        onClick={handleToggleOpen}
        aria-expanded={isOpen}
        aria-label={isOpen ? dict.audioPlayer.closePlayer : dict.audioPlayer.openPlayer}
      >
        <span className={styles.pillEqualizer} aria-hidden="true">
          <span className={styles.equalizerBar} />
          <span className={styles.equalizerBar} />
          <span className={styles.equalizerBar} />
          <span className={styles.equalizerBar} />
        </span>

        <span className={styles.pillLabel}>
          <span className={styles.pillCode}>{currentTrack?.code}</span>
          <span className={styles.pillBpm}>• {currentTrack?.bpm}</span>
        </span>

        <span className={styles.pillPlayIcon} aria-hidden="true">
          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
        </span>
      </button>
    </div>
  );
}
