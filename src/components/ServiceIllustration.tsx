import styles from "./ServiceIllustration.module.css";

export default function ServiceIllustration({ kind }: { kind: string }) {
  return (
    <svg className={styles.diagram} viewBox="0 0 320 150" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {kind === "development" ? (
        <>
          <rect className={styles.surface} x="32" y="18" width="236" height="116" rx="8" />
          <path className={styles.muted} d="M32 42h236M98 42v92" />
          <path className={styles.accent} d="M46 30h2m8 0h2m8 0h2" />
          <path className={styles.muted} d="M48 60h32m-32 14h24m-24 14h28" />
          <rect className={styles.accentSurface} x="114" y="58" width="138" height="30" rx="4" />
          <rect className={styles.muted} x="114" y="100" width="61" height="20" rx="3" />
          <rect className={styles.muted} x="187" y="100" width="65" height="20" rx="3" />
          <rect className={styles.surface} x="245" y="67" width="43" height="72" rx="6" />
          <path className={styles.accent} d="M255 82h23m-23 10h16m-16 10h23m-14 25h5" />
        </>
      ) : kind === "automation" ? (
        <>
          <path className={styles.muted} d="M65 40h34q14 0 14 14v21h23M65 110h34q14 0 14-14V75m71 0h32q14 0 14-14V40h28m-42 35h14v35h28" />
          <rect className={styles.surface} x="27" y="24" width="38" height="32" rx="6" />
          <rect className={styles.surface} x="27" y="94" width="38" height="32" rx="6" />
          <rect className={styles.accentSurface} x="136" y="51" width="48" height="48" rx="9" />
          <path className={styles.accent} d="m154 66-7 9 7 9m12-18 7 9-7 9" />
          <rect className={styles.surface} x="258" y="24" width="36" height="32" rx="6" />
          <rect className={styles.surface} x="258" y="94" width="36" height="32" rx="6" />
          <path className={styles.accent} d="M38 35h16m-16 9h10m-10 61h16m-16 9h10m215-5 5 5 10-12m-15-67h16m-16 9h10" />
        </>
      ) : (
        <>
          <path className={styles.muted} d="M66 75h53m64 0h52" />
          <rect className={styles.surface} x="24" y="54" width="42" height="42" rx="8" />
          <path className={styles.accent} d="m47 63-10 13h10l-4 10 11-14H44" />
          <rect className={styles.accentSurface} x="119" y="43" width="64" height="64" rx="12" />
          <path className={styles.accent} d="M136 68h30v19h-30zm15-10v10m-8 9h1m14 0h1m-15 6h12" />
          <path className={styles.surface} d="M243 43h45a8 8 0 0 1 8 8v44a8 8 0 0 1-8 8h-30l-15 12v-12a8 8 0 0 1-8-8V51a8 8 0 0 1 8-8Z" />
          <path className={styles.accent} d="M247 59h36m-36 13h27m-27 13h32" />
          <path className={styles.accent} d="m101 71 4 4-4 4m113-8 4 4-4 4" />
        </>
      )}
    </svg>
  );
}
