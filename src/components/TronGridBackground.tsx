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
          <div className={styles.afterglow} />
          <div className={styles.photonLeader} />
        </div>
      </div>

      {/* Main Perspective Floor (The Grid) */}
      <div className={styles.perspectiveFloor} />
      <div className={styles.gridIllumination}>
        <div className={styles.litGrid} />
      </div>

      {/* Horizon Laser Line with 1:1 aligned traveling data pulse */}
      <div className={styles.horizonLaser}>
        <div className={styles.horizonDataStream}>
          <div className={styles.reflection} />
          <div className={styles.afterglow} />
          <div className={styles.photonLeader} />
        </div>
      </div>

      {/* Soft Horizon Laser Blur Glow */}
      <div className={styles.horizonLaserSoft} />
    </div>
  );
}
