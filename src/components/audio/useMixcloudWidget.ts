"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { siteConfig } from "@/config/site";

interface MixcloudWidgetInstance {
  ready: Promise<MixcloudWidgetInstance>;
  play?: () => Promise<void>;
  pause?: () => Promise<void>;
  togglePlay?: () => Promise<void>;
  load?: (feed: string, autoplay?: boolean) => Promise<void>;
  setVolume?: (volume: number) => Promise<void>;
  getDuration?: () => Promise<number>;
  seek?: (seconds: number) => Promise<void>;
  getIsPaused?: () => Promise<boolean>;
  events?: {
    play: { on: (cb: () => void) => void };
    pause: { on: (cb: () => void) => void };
    ended: { on: (cb: () => void) => void };
    error: { on: (cb: () => void) => void };
    progress?: { on: (cb: (position: number, duration: number) => void) => void };
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

const AUDIO_TRACK_STORAGE_KEY = "orbital_audio_track_index";

export function useMixcloudWidget() {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWidgetReady, setIsWidgetReady] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [activeFeed, setActiveFeed] = useState(siteConfig.audio.tracks[0]?.feed || "");

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<MixcloudWidgetInstance | null>(null);
  const pendingPlayRef = useRef(false);

  const tracks = siteConfig.audio.tracks;
  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  const handleNextTrack = useCallback(() => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
    setCurrentTrackIndex((prev) => {
      const nextIdx = prev < tracks.length - 1 ? prev + 1 : 0;
      const nextTrack = tracks[nextIdx];
      try {
        localStorage.setItem(AUDIO_TRACK_STORAGE_KEY, String(nextIdx));
      } catch {}
      if (nextTrack) {
        setActiveFeed(nextTrack.feed);
        setIsPlaying(true);
        widgetRef.current = null;
        setIsWidgetReady(false);
        setCurrentTime(0);
        setDuration(0);
        pendingPlayRef.current = true;
      }
      return nextIdx;
    });
  }, [isLoaded, tracks]);

  const handlePrevTrack = useCallback(() => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
    setCurrentTrackIndex((prev) => {
      const prevIdx = prev > 0 ? prev - 1 : tracks.length - 1;
      const prevTrack = tracks[prevIdx];
      try {
        localStorage.setItem(AUDIO_TRACK_STORAGE_KEY, String(prevIdx));
      } catch {}
      if (prevTrack) {
        setActiveFeed(prevTrack.feed);
        setIsPlaying(true);
        widgetRef.current = null;
        setIsWidgetReady(false);
        setCurrentTime(0);
        setDuration(0);
        pendingPlayRef.current = true;
      }
      return prevIdx;
    });
  }, [isLoaded, tracks]);

  const setupWidget = useCallback(() => {
    if (!iframeRef.current || typeof window === "undefined" || !window.Mixcloud) {
      return;
    }

    if (widgetRef.current) {
      return;
    }

    try {
      const widget = window.Mixcloud.PlayerWidget(iframeRef.current);
      widgetRef.current = widget;

      widget.ready
        .then((resolved) => {
          if (widgetRef.current !== widget) {
            return;
          }
          const activeWidget = resolved || widget;
          widgetRef.current = activeWidget;
          setIsWidgetReady(true);

          const readDuration = () => {
            activeWidget.getDuration?.().then((value) => {
              if (widgetRef.current === activeWidget && Number.isFinite(value) && value > 0) {
                setDuration(value);
              }
            }).catch(() => {});
          };
          readDuration();
          if (activeWidget.events) {
            activeWidget.events.play?.on?.(() => {
              if (widgetRef.current !== activeWidget) {
                return;
              }
              setIsPlaying(true);
              readDuration();
            });
            activeWidget.events.pause?.on?.(() => {
              if (widgetRef.current === activeWidget) {
                setIsPlaying(false);
              }
            });
            activeWidget.events.progress?.on?.((position, total) => {
              if (widgetRef.current !== activeWidget) {
                return;
              }
              if (Number.isFinite(position)) {
                setCurrentTime(Math.max(0, position));
              }
              if (Number.isFinite(total) && total > 0) {
                setDuration(total);
              }
            });
            activeWidget.events.ended?.on?.(() => {
              if (widgetRef.current === activeWidget) {
                handleNextTrack();
              }
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
        .catch(() => {});
    } catch {}
  }, [handleNextTrack]);

  // Dynamically load Mixcloud Widget API script only when lazy-loaded (HUD opened or playback triggered)
  useEffect(() => {
    if (typeof window === "undefined" || !isLoaded) {
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
  }, [isLoaded, setupWidget]);

  const handleIframeLoad = useCallback(() => {
    setupWidget();
  }, [setupWidget]);

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
    if (!tracks[index]) {
      return;
    }
    if (tracks[index].feed === activeFeed && widgetRef.current) {
      widgetRef.current.play?.().catch(() => {});
      return;
    }
    setCurrentTrackIndex(index);
    try {
      localStorage.setItem(AUDIO_TRACK_STORAGE_KEY, String(index));
    } catch {}
    if (!isLoaded) {
      setIsLoaded(true);
    }

    const selected = tracks[index];
    if (selected) {
      setActiveFeed(selected.feed);
      setIsPlaying(true);
      widgetRef.current = null;
      setIsWidgetReady(false);
      setCurrentTime(0);
      setDuration(0);
      pendingPlayRef.current = true;
    }
  }, [activeFeed, isLoaded, tracks]);

  // Calculate exact musical timing intervals from track BPM
  const numericBpm = parseInt(currentTrack?.bpm || "174", 10) || 174;
  const beatMs = Math.round((60 / numericBpm) * 1000);
  const halfBeatMs = Math.round(beatMs / 2);
  const twoBeatsMs = Math.round(beatMs * 2);
  const barMs = Math.round(beatMs * 4);

  // Listen to Mixcloud iframe postMessage events
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
      } catch {}
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleNextTrack]);

  // Polling sync with widget.getIsPaused to prevent state desync
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

  // Restore persistent track selection on client mount (lazy-loads on user interaction)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUDIO_TRACK_STORAGE_KEY);
      if (stored !== null) {
        const idx = parseInt(stored, 10);
        if (!isNaN(idx) && idx >= 0 && idx < siteConfig.audio.tracks.length) {
          setCurrentTrackIndex(idx);
          const trk = siteConfig.audio.tracks[idx];
          if (trk) {
            setActiveFeed(trk.feed);
          }
        }
      }
    } catch {}
  }, []);

  const handleSeek = useCallback((seconds: number) => {
    const widget = widgetRef.current;
    if (!isWidgetReady || !widget?.seek || duration <= 0) {
      return;
    }
    const target = Math.min(duration, Math.max(0, seconds));
    widget.seek(target).then(() => {
      if (widgetRef.current === widget) {
        setCurrentTime(target);
      }
    }).catch(() => {});
  }, [duration, isWidgetReady]);

  const iframeSrc = `https://player-widget.mixcloud.com/widget/iframe/?feed=${encodeURIComponent(activeFeed || currentTrack?.feed || "")}&hide_cover=1&light=0`;

  return {
    tracks,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    isMuted,
    isLoaded,
    isWidgetReady,
    currentTime,
    duration,
    handleSeek,
    iframeRef,
    iframeSrc,
    timing: {
      beatMs,
      halfBeatMs,
      twoBeatsMs,
      barMs,
    },
    handleTogglePlay,
    handleToggleMute,
    handleNextTrack,
    handlePrevTrack,
    handleSelectTrack,
    handleIframeLoad,
    setIsLoaded,
  };
}
