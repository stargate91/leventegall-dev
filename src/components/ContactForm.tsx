"use client";

import { useState } from "react";
import { Send, Terminal, Shield, CheckCircle2, AlertCircle, Copy, Check, Radio } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    missionType: "full-orbit",
    timeline: "immediate",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "transmitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [telemetryId, setTelemetryId] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const directEmail = "hello@cosmicdev.studio"; // Placeholder for direct contact

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("transmitting");
    setStatusMessage("Establishing encrypted uplink with mission receiver...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setStatusMessage(data.message);
        setTelemetryId(data.telemetryId || "TX-ESTABLISHED");
      } else {
        setStatus("error");
        setStatusMessage(data.error || "Uplink disrupted. Please retry transmission.");
      }
    } catch (err) {
      setStatus("error");
      setStatusMessage("Fatal frequency drop. Check local network or reach out via direct email.");
    }
  };

  return (
    <section id="contact" style={{ position: "relative" }}>
      <div className="section-container" style={{ paddingBottom: "2rem" }}>
        {/* Header */}
        <div className="section-header">
          <div className="section-subtitle">
            <Radio size={14} />
            <span>Deep Space Uplink // Transmission Console</span>
          </div>
          <h2 className="section-title">Initiate Transmission</h2>
          <p className="section-desc">
            Ready to give your product an unforgettable brand name and high-performance
            code architecture? Send a signal directly to my console.
          </p>
        </div>

        {/* Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* Left Console: Contact Form */}
          <div
            className="glass-panel hud-card"
            style={{
              padding: "clamp(1.5rem, 3vw, 2.5rem)",
              background: "rgba(10, 14, 25, 0.85)",
              border: "1px solid rgba(0, 229, 255, 0.25)",
              boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.8)",
            }}
          >
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "rgba(0, 229, 255, 0.15)",
                    border: "1px solid var(--cyan-tron)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    color: "var(--cyan-tron)",
                    boxShadow: "0 0 25px var(--cyan-glow)",
                  }}
                >
                  <CheckCircle2 size={30} />
                </div>
                <h3
                  className="font-heading"
                  style={{ fontSize: "1.6rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem" }}
                >
                  Uplink Verified
                </h3>
                <p
                  className="font-telemetry"
                  style={{ fontSize: "0.85rem", color: "var(--cyan-tron)", marginBottom: "1rem" }}
                >
                  [ {telemetryId} ]
                </p>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "2rem" }}>
                  {statusMessage}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setFormData({ ...formData, message: "" });
                  }}
                  className="btn-cosmic-secondary"
                  style={{ fontSize: "0.85rem", padding: "0.6rem 1.25rem" }}
                >
                  Transmit Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Name & Email row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1.25rem",
                  }}
                >
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="font-telemetry"
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        color: "var(--text-secondary)",
                        marginBottom: "0.4rem",
                      }}
                    >
                      CALL-SIGN // YOUR NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Sarah Connor / Founder"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        background: "rgba(5, 8, 15, 0.8)",
                        border: "1px solid var(--border-medium)",
                        borderRadius: "var(--radius-sm)",
                        color: "#ffffff",
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border-color var(--transition-fast)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--cyan-tron)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border-medium)")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="font-telemetry"
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        color: "var(--text-secondary)",
                        marginBottom: "0.4rem",
                      }}
                    >
                      FREQUENCY // EMAIL ADDRESS *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="founder@venture.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        background: "rgba(5, 8, 15, 0.8)",
                        border: "1px solid var(--border-medium)",
                        borderRadius: "var(--radius-sm)",
                        color: "#ffffff",
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border-color var(--transition-fast)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--cyan-tron)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border-medium)")}
                    />
                  </div>
                </div>

                {/* Package selection & Timeline */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1.25rem",
                  }}
                >
                  <div>
                    <label
                      htmlFor="contact-tier-select"
                      className="font-telemetry"
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        color: "var(--text-secondary)",
                        marginBottom: "0.4rem",
                      }}
                    >
                      MISSION PAYLOAD // SELECT TIER
                    </label>
                    <select
                      id="contact-tier-select"
                      value={formData.missionType}
                      onChange={(e) => setFormData({ ...formData, missionType: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        background: "rgba(5, 8, 15, 0.8)",
                        border: "1px solid var(--border-medium)",
                        borderRadius: "var(--radius-sm)",
                        color: "#ffffff",
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.9rem",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value="full-orbit">Full-Orbit Launch (Naming + Next.js)</option>
                      <option value="naming">Orbital Identity (Naming & Slogans)</option>
                      <option value="web-dev">Deep-Space Engine (Web Engineering)</option>
                      <option value="custom">Custom Planetary Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-timeline-select"
                      className="font-telemetry"
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        color: "var(--text-secondary)",
                        marginBottom: "0.4rem",
                      }}
                    >
                      LAUNCH HORIZON // TIMELINE
                    </label>
                    <select
                      id="contact-timeline-select"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        background: "rgba(5, 8, 15, 0.8)",
                        border: "1px solid var(--border-medium)",
                        borderRadius: "var(--radius-sm)",
                        color: "#ffffff",
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.9rem",
                        outline: "none",
                        cursor: "pointer",
                      }}
                    >
                      <option value="immediate">Immediate Orbit (Under 2 weeks)</option>
                      <option value="month">Q1 / Next 30 Days</option>
                      <option value="exploring">Exploratory / Architecture Scouting</option>
                    </select>
                  </div>
                </div>

                {/* Message Payload */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="font-telemetry"
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    MISSION BRIEF // DETAILS & PARAMETERS *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Tell me about your product, your target audience, or what kind of name & web platform you envision..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      background: "rgba(5, 8, 15, 0.8)",
                      border: "1px solid var(--border-medium)",
                      borderRadius: "var(--radius-sm)",
                      color: "#ffffff",
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.9rem",
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color var(--transition-fast)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--cyan-tron)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border-medium)")}
                  />
                </div>

                {/* Error Banner if any */}
                {status === "error" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1rem",
                      borderRadius: "var(--radius-sm)",
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      color: "#ef4444",
                      fontSize: "0.85rem",
                    }}
                  >
                    <AlertCircle size={16} />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  id="contact-submit-btn"
                  disabled={status === "transmitting"}
                  className="btn-cosmic-primary"
                  style={{
                    width: "100%",
                    marginTop: "0.5rem",
                    cursor: status === "transmitting" ? "not-allowed" : "pointer",
                    opacity: status === "transmitting" ? 0.7 : 1,
                  }}
                >
                  <Send size={16} />
                  <span>
                    {status === "transmitting" ? "Encrypting & Transmitting Signal..." : "Transmit Encrypted Signal"}
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Right Console: Coordinates, Direct Frequency, & Self-Hosting Telemetry */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Direct Channel Box */}
            <div
              className="glass-panel hud-card"
              style={{
                padding: "1.75rem",
                background: "rgba(10, 15, 25, 0.75)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div
                className="font-telemetry"
                style={{ fontSize: "0.75rem", color: "var(--cyan-tron)", marginBottom: "0.5rem" }}
              >
                // DIRECT COMMS FREQUENCY
              </div>
              <div
                className="font-heading"
                style={{ fontSize: "1.1rem", fontWeight: 600, color: "#ffffff", marginBottom: "0.75rem" }}
              >
                Prefer Unstructured Electronic Mail?
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                Direct inbox monitored around the clock. Typical response latency is sub-6 hours across European & North American timezones.
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.6rem 0.85rem",
                  background: "rgba(0, 0, 0, 0.5)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <span className="font-telemetry" style={{ fontSize: "0.85rem", color: "#ffffff" }}>
                  {directEmail}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: copiedEmail ? "var(--phosphor-green)" : "var(--cyan-tron)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-jetbrains)",
                  }}
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedEmail ? "COPIED" : "COPY"}</span>
                </button>
              </div>
            </div>

            {/* Telemetry Readiness Specs */}
            <div
              className="glass-panel"
              style={{
                padding: "1.75rem",
                background: "rgba(10, 15, 25, 0.6)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div
                className="font-telemetry"
                style={{ fontSize: "0.75rem", color: "var(--cyan-tron)", marginBottom: "0.75rem" }}
              >
                // DEPLOYMENT SPECS
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Base Architecture:</span>
                  <span className="font-telemetry" style={{ color: "#ffffff" }}>Next.js 16 + React 19</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Self-Hosted Runtime:</span>
                  <span className="font-telemetry" style={{ color: "var(--cyan-tron)" }}>Docker / Node Standalone</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Payment Protocol:</span>
                  <span className="font-telemetry" style={{ color: "var(--cyan-tron)" }}>Stripe / Webhook Enabled</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Fiverr Heritage:</span>
                  <span className="font-telemetry" style={{ color: "var(--cyan-tron)" }}>5.0 Rating (Naming & Copy)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
