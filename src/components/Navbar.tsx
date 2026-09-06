"use client";

import { useState, useEffect } from "react";
import { Compass, Menu, X, ArrowUpRight } from "lucide-react";
import styles from "./Navbar.module.css";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/locales";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dict = getDictionary("en");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: dict.nav.journey, href: "#trajectory", index: "01" },
    { label: dict.nav.projects, href: "#projects", index: "02" },
    { label: dict.nav.skills, href: "#skills", index: "03" },
    { label: dict.nav.packages, href: "#services", index: "04" },
    { label: dict.nav.contact, href: "#contact", index: "05" },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        {/* Brand Signifier */}
        <a href="#hero" className={styles.brand}>
          <div className={styles.brandIcon}>
            <Compass size={18} />
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>{siteConfig.name.toUpperCase()}</span>
            <span className={styles.brandSubtitle}>LOC: {siteConfig.coordinates.coords}</span>
          </div>
        </a>

        {/* Navigation Links (Desktop) */}
        <nav className={styles.desktopNav}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              id={`nav-link-${link.label.toLowerCase()}`}
              className={styles.navLink}
            >
              <span className={styles.navLinkIndex}>{link.index}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Button
            variant="primary"
            size="sm"
            href="#contact"
            id="nav-cta-contact"
            iconRight={<ArrowUpRight size={14} />}
          >
            {dict.contact.submitButton}
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={styles.navLink}
              style={{ padding: "0.5rem 0", fontSize: "1rem" }}
            >
              <span className={styles.navLinkIndex}>{link.index}</span>
              <span>{link.label}</span>
            </a>
          ))}
          <Button
            variant="primary"
            size="md"
            fullWidth
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
          >
            {dict.contact.submitButton}
          </Button>
        </div>
      )}
    </header>
  );
}
