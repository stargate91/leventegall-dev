"use client";

import { useState } from "react";
import { Send, CheckCircle2, Radio, User, Mail, AlertTriangle } from "lucide-react";
import styles from "./ContactForm.module.css";
import {
  SectionHeader,
  HudCard,
  Button,
  Input,
  Select,
  Textarea,
  CopySnippet,
  Stat,
  Stack,
  Grid,
  Callout,
  Text,
} from "@/components/ui";

interface ContactPayload {
  name: string;
  email: string;
  tier: string;
  timeline: string;
  brief: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  brief?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactPayload>({
    name: "",
    email: "",
    tier: "full-orbit",
    timeline: "2-3-weeks",
    brief: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "transmitting" | "success" | "error">("idle");
  const [telemetryId, setTelemetryId] = useState<string>("");

  const directEmail = "leventegall@proton.me";

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "// CALLSIGN REQUIRED — Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "// FREQUENCY REQUIRED — Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "// INVALID PROTOCOL — Please enter a valid email (e.g. alex@startup.com).";
    }

    if (!formData.brief.trim()) {
      newErrors.brief = "// PAYLOAD REQUIRED — Please describe your project goals or scope.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus("transmitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setTelemetryId(data.transmissionId || "ACK-200");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const tierOptions = [
    { value: "naming", label: "Brand Naming & Identity — From $490" },
    { value: "full-orbit", label: "Complete Product Launch (Brand + Next.js App) — From $1,850" },
    { value: "web-dev", label: "Full-Stack Development (FastAPI / React) — From $1,450" },
    { value: "custom", label: "Custom Architecture / Consultation" },
  ];

  const timelineOptions = [
    { value: "immediate", label: "Fast Turnaround (Under 2 weeks)" },
    { value: "2-3-weeks", label: "Standard Timeline (2-4 weeks)" },
    { value: "flexible", label: "Flexible Timeline (1-2 months)" },
  ];

  return (
    <div className={`section-container ${styles.sectionWrapper}`}>
      {/* Header */}
      <SectionHeader
        subtitle="Get in Touch"
        subtitleIcon={<Radio size={14} />}
        title="Let's Talk About Your Project"
        description="Have an idea in mind, need a strong brand name, or want to build a dependable full-stack web application? Send me a message and I'll get back to you within 24 hours."
      />

      {/* Main Grid */}
      <div className={styles.grid}>
        {/* Left Console: Contact Form */}
        <HudCard variant="surface" className={styles.formCard}>
          {status === "success" ? (
            <div className={styles.successWrapper}>
              <div className={styles.successIcon}>
                <CheckCircle2 size={30} />
              </div>
              <h3 className={styles.successTitle}>
                Message Sent Successfully
              </h3>
              <p className={styles.successTelemetry}>
                [ Reference ID: {telemetryId} ]
              </p>
              <p className={styles.successDesc}>
                Thanks for reaching out! I&apos;ve received your message and will review your project details and get back to you shortly.
              </p>
              <Button variant="secondary" size="md" onClick={() => setStatus("idle")}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit}>
              <Stack gap="lg">
                {status === "error" && (
                  <Callout
                    variant="notice"
                    icon={<AlertTriangle size={16} />}
                    title="TRANSMISSION FAILED"
                  >
                    <Text size="xs" tone="secondary">
                      Unable to send message through the orbital gateway. Please try again or email me directly at {directEmail}.
                    </Text>
                  </Callout>
                )}

                {/* Row 1: Name & Email */}
                <Grid cols={2} gap="md">
                  <Input
                    id="contact-name"
                    label="Your Name *"
                    type="text"
                    placeholder="e.g. Alex Miller"
                    iconLeft={<User size={16} />}
                    value={formData.name}
                    error={errors.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) {
                        setErrors((prev) => ({ ...prev, name: undefined }));
                      }
                    }}
                  />

                  <Input
                    id="contact-email"
                    label="Your Email Address *"
                    type="email"
                    placeholder="alex@startup.com"
                    iconLeft={<Mail size={16} />}
                    value={formData.email}
                    error={errors.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) {
                        setErrors((prev) => ({ ...prev, email: undefined }));
                      }
                    }}
                  />
                </Grid>

                {/* Row 2: Service & Timeline */}
                <Grid cols={2} gap="md">
                  <Select
                    id="contact-tier-select"
                    label="Project Scope / Service"
                    options={tierOptions}
                    value={formData.tier}
                    onChange={(val) => setFormData({ ...formData, tier: val })}
                  />

                  <Select
                    id="contact-timeline"
                    label="Expected Timeline"
                    options={timelineOptions}
                    value={formData.timeline}
                    onChange={(val) => setFormData({ ...formData, timeline: val })}
                  />
                </Grid>

                {/* Row 3: Message Brief */}
                <Textarea
                  id="contact-brief"
                  label="Project Details & Goals *"
                  rows={4}
                  placeholder="Tell me a bit about your product, your goals, or what kind of brand identity or software system you're looking to build..."
                  value={formData.brief}
                  error={errors.brief}
                  onChange={(e) => {
                    setFormData({ ...formData, brief: e.target.value });
                    if (errors.brief) {
                      setErrors((prev) => ({ ...prev, brief: undefined }));
                    }
                  }}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={status === "transmitting"}
                  iconLeft={<Send size={16} />}
                >
                  {status === "transmitting" ? "Sending Message..." : "Send Message"}
                </Button>
              </Stack>
            </form>
          )}
        </HudCard>

        {/* Right Info Column */}
        <Stack gap="md" className={styles.infoColumn}>
          <HudCard variant="transparent" corners={false} className={styles.infoCard}>
            <div className={styles.infoCardTag}>
              // DIRECT EMAIL
            </div>
            <h4 className={styles.infoCardTitle}>
              Prefer to email directly?
            </h4>
            <p className={styles.infoCardDesc}>
              Feel free to send me a direct email anytime. I usually reply within a few hours during business days.
            </p>

            <CopySnippet text={directEmail} label="COPY" copiedLabel="COPIED" />
          </HudCard>

          {/* Key Facts */}
          <HudCard variant="transparent" corners={false} className={styles.infoCard}>
            <div className={styles.infoCardTag}>
              // AT A GLANCE
            </div>
            <Stack gap="none">
              <Stat variant="row" label="Core Backend:" value="Python / FastAPI / SQL" />
              <Stat variant="row" label="Frontend Stack:" value="React / Next.js / TypeScript" />
              <Stat variant="row" label="Fiverr Track Record:" value="1,100+ Clients (5.0★)" />
              <Stat variant="row" label="Academic Background:" value="Physics & Astronomy (ELTE)" />
            </Stack>
          </HudCard>
        </Stack>
      </div>
    </div>
  );
}
