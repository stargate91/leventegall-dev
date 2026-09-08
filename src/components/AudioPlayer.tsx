"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
import AudioPlaylist from "./audio/AudioPlaylist";
import AudioTriggerPill from "./audio/AudioTriggerPill";
import SpectrumVisualizer from "./audio/SpectrumVisualizer";
import { useMixcloudWidget } from "./audio/useMixcloudWidget";
import {
  Button,
  IconButton,
  Tooltip,
  Text,
} from "@/components/ui";
import { siteConfig } from "@/config/site";
import { useLocale } from "@/locales";

export default function AudioPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { dict } = useLocale();

  const {
    tracks,
    currentTrack,
    currentTrackIndex,
    isPlaying,
    isMuted,
    isLoaded,
    iframeRef,
    iframeSrc,
    timing,
    handleTogglePlay,
    handleToggleMute,
    handleNextTrack,
    handlePrevTrack,
    handleSelectTrack,
    handleIframeLoad,
    setIsLoaded,
  } = useMixcloudWidget();

  const handleToggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next && !isLoaded) {
        setIsLoaded(true);
      }
      return next;
    });
  }, [isLoaded, setIsLoaded]);

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

  return (
    <div
      ref={containerRef}
      className={`${styles.playerAnchor} ${isPlaying ? styles.isPlaying : ""}`}
      aria-label={dict.audioPlayer.badge}
      style={
        {
          "--bpm-beat": `${timing.beatMs}ms`,
          "--bpm-half-beat": `${timing.halfBeatMs}ms`,
          "--bpm-two-beats": `${timing.twoBeatsMs}ms`,
          "--bpm-bar": `${timing.barMs}ms`,
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
          <SpectrumVisualizer isPlaying={isPlaying} />

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

          {/* Hardware Playback Controls */}
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
          <AudioPlaylist
            tracks={tracks}
            currentTrackIndex={currentTrackIndex}
            onSelectTrack={handleSelectTrack}
          />
        </div>
      </section>

      {/* Collapsed Floating Pill Toggle */}
      <AudioTriggerPill
        isOpen={isOpen}
        isPlaying={isPlaying}
        currentTrack={currentTrack}
        onToggleOpen={handleToggleOpen}
      />
    </div>
  );
}
