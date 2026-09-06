export interface SelectPackageTierDetail {
  tierId: string;
}

declare global {
  interface WindowEventMap {
    "select-package-tier": CustomEvent<SelectPackageTierDetail>;
  }
}
