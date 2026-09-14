"use client";

import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import Text from "@/components/ui/Text";
import { siteConfig } from "@/config/site";
import { useScrollSpy, useFocusTrap } from "@/hooks";
import { useLocale } from "@/locales";

const SECTION_IDS = ["hero", "journey", "projects", "skills", "services", "clients", "contact"];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const { dict } = useLocale();
  const pathname = usePathname();
  const isHomePage = !pathname || pathname === "/" || pathname === "/hu";

  const scrollSpyOptions = useMemo(() => ({ sectionIds: SECTION_IDS }), []);
  const { scrolled, activeSection } = useScrollSpy(scrollSpyOptions);

  useFocusTrap(menuRef, {
    isOpen: mobileMenuOpen,
    onClose: () => setMobileMenuOpen(false),
    returnFocusRef: toggleBtnRef,
  });

  const navLinks = [
    { label: dict.nav.journey, href: "#journey", id: "journey", index: "01" },
    { label: dict.nav.projects, href: "#projects", id: "projects", index: "02" },
    { label: dict.nav.skills, href: "#skills", id: "skills", index: "03" },
    { label: dict.nav.services, href: "#services", id: "services", index: "04" },
    { label: dict.nav.clients, href: "#clients", id: "clients", index: "05" },
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
          <Link href={isHomePage ? "#hero" : "/"} className={styles.brandLink}>
            <div className={styles.brandInfo}>
              <div className={styles.brandTitle}>
                <span className={styles.brandNameText}>{dict.personName.toUpperCase()}</span>
                <span className={styles.brandCallsign}> // {siteConfig.callsign}</span>
              </div>
              <span className={styles.brandRole}>{dict.footer.subTitle}</span>
            </div>
          </Link>

          {/* Live Status & Coordinates Telemetry Pill */}
          <StatusPill
            items={[
              dict.nav.available,
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
              const isActive = isHomePage && activeSection === link.id;
              const targetHref = isHomePage ? link.href : `/${link.href}`;

              return (
                <li key={link.index} className={styles.navListItem}>
                  <Link
                    href={targetHref}
                    id={`nav-link-${link.index}`}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span className={styles.indicatorLine} aria-hidden="true" />
                    <span className={styles.navIndex}>{link.index}</span>
                    <span className={styles.navLabel}>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Actions: Socials on left & Language Switcher on right */}
        <footer className={styles.footerBlock} role="contentinfo" aria-label="Sidebar Footer">
          <div className={styles.socialRow}>
            <div className={styles.socialGroup}>
              <IconButton
                icon={<LogoGithub size={18} />}
                href={siteConfig.socials.github}
                target="_blank"
                ariaLabel="GitHub Profile"
                variant="surface"
                size="md"
              />
              <IconButton
                icon={<LogoLinkedin size={18} />}
                href={siteConfig.socials.linkedin}
                target="_blank"
                ariaLabel="LinkedIn Profile"
                variant="surface"
                size="md"
              />
              <IconButton
                icon={<Email size={18} />}
                href={`mailto:${siteConfig.email}`}
                ariaLabel="Email Transmission"
                variant="surface"
                size="md"
              />
            </div>
            <div className={styles.langContainer}>
              <LanguageSwitcher />
            </div>
          </div>
        </footer>
      </div>

      {/* =========================================================================
         Mobile Header Bar (< 1024px)
         ========================================================================= */}
      <div className={styles.mobileBar}>
        <Link
          href={isHomePage ? "#hero" : "/"}
          onClick={(e) => {
            if (isHomePage) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
            setMobileMenuOpen(false);
          }}
          className={styles.mobileBrand}
        >
          <span className={styles.mobileBrandTitle}>
            <span className={styles.brandNameText}>{dict.personName.toUpperCase()}</span>
            <span className={styles.brandCallsign}> // {siteConfig.callsign}</span>
          </span>
        </Link>

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
                <Link
                  href={isHomePage ? link.href : `/${link.href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.mobileDrawerLink}
                >
                  <span className={styles.mobileDrawerIndex}>{link.index}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
