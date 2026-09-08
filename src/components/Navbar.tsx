"use client";

import { useState, useEffect, useRef } from "react";
import {
  Menu,
  Close,
  LogoGithub,
  LogoLinkedin,
  Email,
} from "@carbon/icons-react";
import styles from "./Navbar.module.css";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import StatusPill from "@/components/ui/StatusPill";
import IconButton from "@/components/ui/IconButton";
import Tooltip from "@/components/ui/Tooltip";
import Text from "@/components/ui/Text";
import { siteConfig } from "@/config/site";
import { useLocale } from "@/locales";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const { dict } = useLocale();

  // Scroll detection for ScrollSpy and mobile backdrop
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ["hero", "trajectory", "projects", "skills", "services", "reviews", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        if (id) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard accessibility for mobile drawer
  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        toggleBtnRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const interactiveItems = menuRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        );
        if (interactiveItems.length === 0) {
          return;
        }

        const first = interactiveItems[0];
        const last = interactiveItems[interactiveItems.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: dict.nav.journey, href: "#trajectory", id: "trajectory", index: "01" },
    { label: dict.nav.projects, href: "#projects", id: "projects", index: "02" },
    { label: dict.nav.skills, href: "#skills", id: "skills", index: "03" },
    { label: dict.nav.services, href: "#services", id: "services", index: "04" },
    { label: dict.nav.clients, href: "#reviews", id: "reviews", index: "05" },
    { label: dict.nav.contact, href: "#contact", id: "contact", index: "06" },
  ];

  return (
    <header
      role="banner"
      className={`${styles.sidebar} ${scrolled ? styles.scrolled : ""}`}
      aria-label="Main Navigation"
    >
      {/* =========================================================================
         Desktop Sticky Sidebar Frame (100vh)
         ========================================================================= */}
      <div className={styles.sidebarInner}>
        {/* Top: Identity & Status Zone */}
        <div className={styles.identityBlock}>
          <a href="#hero" className={styles.brandLink}>
            <div className={styles.brandInfo}>
              <h1 className={styles.brandTitle}>
                <span className={styles.brandNameText}>{dict.personName.toUpperCase()}</span>
                <span className={styles.brandCallsign}> // {siteConfig.callsign}</span>
              </h1>
              <span className={styles.brandRole}>{dict.footer.subTitle}</span>
            </div>
          </a>

          {/* Live Status & Coordinates Telemetry Pill */}
          <StatusPill
            items={[
              siteConfig.stats.systemStatus,
              siteConfig.coordinates.city,
              siteConfig.coordinates.coords,
            ]}
            beacon={false}
            size="sm"
            variant="surface"
          />

          {/* Current Focus Micro-Bio */}
          <Text as="p" size="sm" tone="secondary" leading="relaxed" className={styles.sidebarBio}>
            {dict.nav.sidebarBio}
          </Text>
        </div>

        {/* Middle: Vertical Navigation Links */}
        <nav className={styles.navBlock} aria-label="Section Navigation">
          <ul className={styles.navList}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <li key={link.index} className={styles.navListItem}>
                  <a
                    href={link.href}
                    id={`nav-link-${link.index}`}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className={styles.indicatorLine} aria-hidden="true" />
                    <span className={styles.navIndex}>{link.index}</span>
                    <span className={styles.navLabel}>{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Actions: Socials on left & Language Switcher on right */}
        <div className={styles.footerBlock}>
          <div className={styles.socialRow}>
            <div className={styles.socialGroup}>
              <Tooltip content="GitHub" side="top">
                <IconButton
                  icon={<LogoGithub size={18} />}
                  href={siteConfig.socials.github}
                  target="_blank"
                  ariaLabel="GitHub Profile"
                  variant="surface"
                  size="md"
                />
              </Tooltip>
              <Tooltip content="LinkedIn" side="top">
                <IconButton
                  icon={<LogoLinkedin size={18} />}
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  ariaLabel="LinkedIn Profile"
                  variant="surface"
                  size="md"
                />
              </Tooltip>
              <Tooltip content="Email" side="top">
                <IconButton
                  icon={<Email size={18} />}
                  href={`mailto:${siteConfig.email}`}
                  ariaLabel="Email Transmission"
                  variant="surface"
                  size="md"
                />
              </Tooltip>
            </div>
            <div className={styles.langContainer}>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
         Mobile Header Bar (< 1024px)
         ========================================================================= */}
      <div className={styles.mobileBar}>
        <a href="#hero" className={styles.mobileBrand}>
          <span className={styles.mobileBrandTitle}>
            <span className={styles.brandNameText}>{dict.personName.toUpperCase()}</span>
            <span className={styles.brandCallsign}> // {siteConfig.callsign}</span>
          </span>
        </a>

        <div className={styles.mobileActions}>
          <LanguageSwitcher />

          <IconButton
            ref={toggleBtnRef as unknown as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
            icon={mobileMenuOpen ? <Close size={20} /> : <Menu size={20} />}
            ariaLabel="Toggle Navigation Menu"
            ariaExpanded={mobileMenuOpen}
            ariaControls="mobile-nav-drawer"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            variant="ghost"
            size="md"
          />
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className={styles.mobileDrawer}
        >
          <ul className={styles.mobileDrawerList}>
            {navLinks.map((link) => (
              <li key={link.index}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.mobileDrawerLink}
                >
                  <span className={styles.mobileDrawerIndex}>{link.index}</span>
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
