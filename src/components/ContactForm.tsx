"use client";

import { useReducer, useEffect } from "react";
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
import { useLocale } from "@/locales";

type FormStatus = "idle" | "transmitting" | "success" | "error";

interface FormErrors {
  name?: string | undefined;
  email?: string | undefined;
  brief?: string | undefined;
}

export interface ContactFormState {
  formData: ContactRequestBody;
  errors: FormErrors;
  status: FormStatus;
  telemetryId: string;
}

type ContactFormAction =
  | { type: "SET_FIELD"; field: keyof ContactRequestBody; value: string }
  | { type: "SET_TIER"; tier: string }
  | { type: "SET_ERRORS"; errors: FormErrors }
  | { type: "CLEAR_ERROR"; field: keyof FormErrors }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS"; telemetryId: string }
  | { type: "SUBMIT_ERROR" }
  | { type: "RESET_FORM" };

export const initialFormState: ContactFormState = {
  formData: {
    name: "",
    email: "",
    tier: "full-orbit",
    timeline: "2-3-weeks",
    brief: "",
    botProbe: "",
  },
  errors: {},
  status: "idle",
  telemetryId: "",
};

export function contactFormReducer(
  state: ContactFormState,
  action: ContactFormAction,
): ContactFormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]: undefined,
        },
      };

    case "SET_TIER":
      return {
        ...state,
        formData: {
          ...state.formData,
          tier: action.tier,
        },
      };

    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: undefined,
        },
      };

    case "SUBMIT_START":
      if (state.status === "transmitting") {
        return state;
      }
      return {
        ...state,
        status: "transmitting",
      };

    case "SUBMIT_SUCCESS":
      return {
        ...state,
        status: "success",
        telemetryId: action.telemetryId,
        errors: {},
      };

    case "SUBMIT_ERROR":
      return {
        ...state,
        status: "error",
      };

    case "RESET_FORM":
      return {
        ...state,
        formData: {
          ...initialFormState.formData,
          tier: state.formData.tier,
        },
        errors: {},
        status: "idle",
        telemetryId: "",
      };

    default:
      return state;
  }
}

export default function ContactForm() {
  const { dict } = useLocale();
  const contactTierOptions = getContactTierOptions(dict);
  const timelineOptions = getTimelineOptions(dict);

  const [{ formData, errors, status, telemetryId }, dispatch] = useReducer(
    contactFormReducer,
    initialFormState,
  );

  useEffect(() => {
    // 1. Sync tier from URL query parameters on mount or browser popstate
    const syncTierFromUrl = () => {
      if (typeof window === "undefined") {
        return;
      }
      const params = new URLSearchParams(window.location.search);
      const tierParam = params.get("tier");
      if (tierParam && ["naming", "full-orbit", "web-dev"].includes(tierParam)) {
        dispatch({ type: "SET_TIER", tier: tierParam });
      }
    };

    syncTierFromUrl();

    // 2. React to custom in-page selection events
    const handlePackageSelect = (e: CustomEvent<{ tierId: string }>) => {
      if (e.detail?.tierId) {
        dispatch({ type: "SET_TIER", tier: e.detail.tierId });
      }
    };

    window.addEventListener("select-package-tier", handlePackageSelect);
    window.addEventListener("popstate", syncTierFromUrl);

    return () => {
      window.removeEventListener("select-package-tier", handlePackageSelect);
      window.removeEventListener("popstate", syncTierFromUrl);
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

    dispatch({ type: "SET_ERRORS", errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    dispatch({ type: "SUBMIT_START" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as ContactApiResponse;

      if (response.ok && "telemetryId" in data) {
        dispatch({ type: "SUBMIT_SUCCESS", telemetryId: data.telemetryId });
      } else {
        dispatch({ type: "SUBMIT_ERROR" });
      }
    } catch {
      dispatch({ type: "SUBMIT_ERROR" });
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
            <div role="status" aria-live="polite" className={styles.successWrapper}>
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
              <Button variant="secondary" size="md" onClick={() => dispatch({ type: "RESET_FORM" })}>
                {dict.contact.success.button}
              </Button>
            </div>
          ) : (
            <form noValidate onSubmit={handleSubmit} aria-busy={status === "transmitting"}>
              {/* Honeypot field for bot mitigation */}
              <input
                type="text"
                name="botProbe"
                tabIndex={-1}
                autoComplete="off"
                style={{ display: "none" }}
                aria-hidden="true"
                value={formData.botProbe || ""}
                onChange={(e) =>
                  dispatch({ type: "SET_FIELD", field: "botProbe", value: e.target.value })
                }
              />
              <Stack gap="lg">
                {status === "error" && (
                  <div role="alert" aria-live="assertive">
                    <Callout
                      variant="notice"
                      icon={<AlertTriangle size={16} />}
                      title="TRANSMISSION FAILED"
                    >
                      <Text size="xs" tone="secondary">
                        {dict.contact.errors.transmissionFailed} ({directEmail})
                      </Text>
                    </Callout>
                  </div>
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
                    onChange={(e) =>
                      dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })
                    }
                  />

                  <Input
                    id="contact-email"
                    label={dict.contact.fields.email}
                    type="email"
                    placeholder={dict.contact.fields.emailPlaceholder}
                    iconLeft={<Mail size={16} />}
                    value={formData.email}
                    error={errors.email}
                    onChange={(e) =>
                      dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })
                    }
                  />
                </Grid>

                {/* Row 2: Service & Timeline */}
                <Grid cols={2} gap="md">
                  <Select
                    id="contact-tier-select"
                    label={dict.contact.fields.tier}
                    options={contactTierOptions}
                    value={formData.tier}
                    onChange={(val) =>
                      dispatch({ type: "SET_FIELD", field: "tier", value: val })
                    }
                  />

                  <Select
                    id="contact-timeline"
                    label={dict.contact.fields.timeline}
                    options={timelineOptions}
                    value={formData.timeline}
                    onChange={(val) =>
                      dispatch({ type: "SET_FIELD", field: "timeline", value: val })
                    }
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
                  onChange={(e) =>
                    dispatch({ type: "SET_FIELD", field: "brief", value: e.target.value })
                  }
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
