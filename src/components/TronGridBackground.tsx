import React from "react";
import styles from "./TronGridBackground.module.css";

export default function TronGridBackground() {
  return (
    <div className={styles.container} aria-hidden="true">
      {/* Tron Horizon Core Glow */}
      <div className={styles.coreGlow} />

      {/* Main Perspective Floor (The Grid) */}
      <div className={styles.perspectiveFloor} />

      {/* Top Cyber Matrix Ceiling */}
      <div className={styles.perspectiveCeiling} />

      {/* Horizon Laser Line with 1:1 aligned traveling data pulse */}
      <div className={styles.horizonLaser}>
        <div className={styles.dataPacket} />
      </div>

      {/* Soft Horizon Laser Blur Glow */}
      <div className={styles.horizonLaserSoft} />
    </div>
  );
}
