import React from "react";
import styles from "./Tabs.module.css";

export interface TabItem<T extends string = string> {
  id: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface TabsProps<T extends string = string> {
  items: TabItem<T>[];
  value: T;
  onChange: (id: T) => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function Tabs<T extends string = string>({
  items,
  value,
  onChange,
  className = "",
  style,
}: TabsProps<T>) {
  return (
    <div className={`${styles.tabsContainer} ${className}`} style={style} role="tablist">
      {items.map((tab) => {
        const isActive = tab.id === value;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`${styles.tabBtn} ${isActive ? styles.activeTab : ""}`}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
