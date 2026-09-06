"use client";

import { useState, useEffect } from "react";
import { Send, CheckCircle2, Radio, User, Mail, AlertTriangle } from "lucide-react";
import styles from "./ContactForm.module.css";
import type { ContactRequestBody, ContactApiResponse } from "@/types/contact";
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
import { getContactTierOptions, getTimelineOptions } from "@/data/services";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/locales";

interface FormErrors {
  name?: string;
  email?: string;
  brief?: string;
}

export default function ContactForm() {
  const dict = getDictionary("en");
  const contactTierOptions = getContactTierOptions(dict);
  const timelineOptions = getTimelineOptions(dict);

  const [formData, setFormData] = useState<ContactRequestBody>({
    name: "",
    email: "",
    tier: "full-orbit",
    timeline: "2-3-weeks",
    brief: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "transmitting" | "success" | "error">("idle");
  const [telemetryId, setTelemetryId] = useState<string>("");

  useEffect(() => {
    const handlePackageSelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ tierId?: string }>;
      if (customEvent.detail?.tierId) {
        setFormData((prev) => ({ ...prev, tier: customEvent.detail?.tierId ?? prev.tier }));
      }
    };

    window.addEventListener("select-package-tier", handlePackageSelect);
    return () => {
      window.removeEventListener("select-package-tier", handlePackageSelect);
    };
  }, []);

  const directEmail = siteConfig.email;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = dict.contact.errors.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = dict.contact.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = dict.contact.errors.emailInvalid;
    }

    if (!formData.brief.trim()) {
      newErrors.brief = dict.contact.errors.briefRequired;
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

      const data = (await response.json()) as ContactApiResponse;

      if (response.ok && "telemetryId" in data) {
        setStatus("success");
        setTelemetryId(data.telemetryId);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className={`section-container ${styles.sectionWrapper}`}>
      {/* Header */}
      <SectionHeader
        subtitle={dict.contact.subtitle}
        subtitleIcon={<Radio size={14} />}
        title={dict.contact.title}
        description={dict.contact.description}
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
                {dict.contact.success.title}
              </h3>
              <p className={styles.successTelemetry}>
                [ Reference ID: {telemetryId} ]
              </p>
              <p className={styles.successDesc}>
                {dict.contact.success.desc}
              </p>
              <Button variant="secondary" size="md" onClick={() => setStatus("idle")}>
                {dict.contact.success.button}
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
                      {dict.contact.errors.transmissionFailed} ({directEmail})
                    </Text>
                  </Callout>
                )}

                {/* Row 1: Name & Email */}
                <Grid cols={2} gap="md">
                  <Input
                    id="contact-name"
                    label={dict.contact.fields.name}
                    type="text"
                    placeholder={dict.contact.fields.namePlaceholder}
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
                    label={dict.contact.fields.email}
                    type="email"
                    placeholder={dict.contact.fields.emailPlaceholder}
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
                    label={dict.contact.fields.tier}
                    options={contactTierOptions}
                    value={formData.tier}
                    onChange={(val) => setFormData({ ...formData, tier: val })}
                  />

                  <Select
                    id="contact-timeline"
                    label={dict.contact.fields.timeline}
                    options={timelineOptions}
                    value={formData.timeline}
                    onChange={(val) => setFormData({ ...formData, timeline: val })}
                  />
                </Grid>

                {/* Row 3: Message Brief */}
                <Textarea
                  id="contact-brief"
                  label={dict.contact.fields.brief}
                  rows={4}
                  placeholder={dict.contact.fields.briefPlaceholder}
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
                  {status === "transmitting" ? dict.contact.transmittingButton : dict.contact.submitButton}
                </Button>
              </Stack>
            </form>
          )}
        </HudCard>

        {/* Right Info Column */}
        <Stack gap="md" className={styles.infoColumn}>
          <HudCard variant="transparent" corners={false} className={styles.infoCard}>
            <div className={styles.infoCardTag}>
              {dict.contact.infoColumn.directEmailTag}
            </div>
            <h4 className={styles.infoCardTitle}>
              {dict.contact.infoColumn.directEmailTitle}
            </h4>
            <p className={styles.infoCardDesc}>
              {dict.contact.infoColumn.directEmailDesc}
            </p>

            <CopySnippet text={directEmail} label="COPY" copiedLabel="COPIED" />
          </HudCard>

          {/* Key Facts */}
          <HudCard variant="transparent" corners={false} className={styles.infoCard}>
            <div className={styles.infoCardTag}>
              {dict.contact.infoColumn.atAGlanceTag}
            </div>
            <Stack gap="none">
              <Stat variant="row" label={dict.contact.infoColumn.backendLabel} value={dict.contact.infoColumn.backendValue} />
              <Stat variant="row" label={dict.contact.infoColumn.frontendLabel} value={dict.contact.infoColumn.frontendValue} />
              <Stat variant="row" label={dict.contact.infoColumn.fiverrLabel} value={`${siteConfig.telemetry.missionsDelivered} Clients (${siteConfig.telemetry.rating})`} />
              <Stat variant="row" label={dict.contact.infoColumn.physicsLabel} value={dict.contact.infoColumn.physicsValue} />
            </Stack>
          </HudCard>
        </Stack>
      </div>
    </div>
  );
}
