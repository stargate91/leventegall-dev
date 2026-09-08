import React from "react";
import styles from "./TronGridBackground.module.css";

export default function TronGridBackground() {
  return (
    <div className={styles.container} aria-hidden="true">
      {/* Tron Horizon Core Glow */}
      <div className={styles.coreGlow} />

      {/* Full-Screen Upper Data Laser Ribbon (Header/Hero Sky Level) */}
      <div className={styles.upperLaser}>
        <div className={styles.upperDataStream}>
          <div className={styles.photonLeader} />
          <div className={styles.photonTrailBit} />
        </div>
      </div>

      {/* Main Perspective Floor (The Grid) */}
      <div className={styles.perspectiveFloor} />

      {/* Horizon Laser Line with 1:1 aligned traveling data pulse */}
      <div className={styles.horizonLaser}>
        <div className={styles.horizonDataStream}>
          <div className={styles.photonLeader} />
          <div className={styles.photonTrailBit} />
        </div>
      </div>

      {/* Soft Horizon Laser Blur Glow */}
      <div className={styles.horizonLaserSoft} />
    </div>
  );
}
