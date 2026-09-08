"use client";

import { useReducer, useEffect } from "react";
import { SendAlt, CheckmarkFilled, Radio, User, Email, WarningAlt } from "@carbon/icons-react";
import styles from "./ContactForm.module.css";
import type { ContactRequestBody, ContactApiResponse } from "@/types/contact";
import {
  SectionHeader,
  HudCard,
  Button,
  TelemetryBadge,
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
import { contactFormSchema } from "@/lib/validations/contact";
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
  serverError?: string | undefined;
}

type ContactFormAction =
  | { type: "SET_FIELD"; field: keyof ContactRequestBody; value: string }
  | { type: "SET_TIER"; tier: string }
  | { type: "SET_ERRORS"; errors: FormErrors }
  | { type: "CLEAR_ERROR"; field: keyof FormErrors }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS"; telemetryId: string }
  | { type: "SUBMIT_ERROR"; error?: string | undefined }
  | { type: "RESET_FORM" };

export const initialFormState: ContactFormState = {
  formData: {
    name: "",
    email: "",
    tier: "development",
    timeline: "2-3-weeks",
    brief: "",
    botProbe: "",
  },
  errors: {},
  status: "idle",
  telemetryId: "",
  serverError: undefined,
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
        errors: {},
        serverError: undefined,
      };

    case "SUBMIT_SUCCESS":
      return {
        ...state,
        status: "success",
        telemetryId: action.telemetryId,
        serverError: undefined,
      };

    case "SUBMIT_ERROR":
      return {
        ...state,
        status: "error",
        serverError: action.error,
      };

    case "RESET_FORM":
      return {
        ...initialFormState,
        formData: {
          ...initialFormState.formData,
          tier: state.formData.tier,
        },
        status: "idle",
        telemetryId: "",
        serverError: undefined,
      };

    default:
      return state;
  }
}

export default function ContactForm() {
  const { dict } = useLocale();
  const contactTierOptions = getContactTierOptions(dict);
  const timelineOptions = getTimelineOptions(dict);

  const [{ formData, errors, status, telemetryId, serverError }, dispatch] = useReducer(
    contactFormReducer,
    initialFormState,
  );

  useEffect(() => {
    const handlePackageSelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ tierId: string }>;
      if (customEvent.detail && customEvent.detail.tierId) {
        dispatch({ type: "SET_TIER", tier: customEvent.detail.tierId });
      }
    };

    const syncTierFromUrl = () => {
      if (typeof window === "undefined") {
        return;
      }
      const urlParams = new URLSearchParams(window.location.search);
      const tierParam = urlParams.get("tier");
      if (tierParam) {
        dispatch({ type: "SET_TIER", tier: tierParam });
      }
    };

    window.addEventListener("select-package-tier", handlePackageSelect);
    window.addEventListener("popstate", syncTierFromUrl);
    syncTierFromUrl();

    return () => {
      window.removeEventListener("select-package-tier", handlePackageSelect);
      window.removeEventListener("popstate", syncTierFromUrl);
    };
  }, []);

  const directEmail = siteConfig.email;

  const validate = (): boolean => {
    const result = contactFormSchema.safeParse(formData);
    if (result.success) {
      dispatch({ type: "SET_ERRORS", errors: {} });
      return true;
    }

    const newErrors: FormErrors = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof FormErrors;
      if (field === "name" && !newErrors.name) {
        newErrors.name = dict.contact.errors.nameRequired;
      } else if (field === "email" && !newErrors.email) {
        newErrors.email = !formData.email.trim()
          ? dict.contact.errors.emailRequired
          : dict.contact.errors.emailInvalid;
      } else if (field === "brief" && !newErrors.brief) {
        newErrors.brief = dict.contact.errors.briefRequired;
      }
    }

    dispatch({ type: "SET_ERRORS", errors: newErrors });
    return false;
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
        const errorMsg = "error" in data && typeof data.error === "string" ? data.error : undefined;
        dispatch({ type: "SUBMIT_ERROR", error: errorMsg });
      }
    } catch {
      dispatch({ type: "SUBMIT_ERROR" });
    }
  };

  return (
    <div id="contact" className={`section-container ${styles.sectionWrapper}`}>
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
                <CheckmarkFilled size={30} />
              </div>
              <Text as="h3" font="heading" size="2xl" weight="bold" tone="primary" className={styles.successTitle}>
                {dict.contact.success.title}
              </Text>
              <Text as="p" font="mono" size="sm" tone="cyan" className={styles.successTelemetry}>
                [ Reference ID: {telemetryId} ]
              </Text>
              <Text as="p" size="sm" tone="secondary" leading="relaxed" className={styles.successDesc}>
                {dict.contact.success.desc}
              </Text>
              <Button variant="secondary" size="md" onClick={() => dispatch({ type: "RESET_FORM" })}>
                {dict.contact.success.button}
              </Button>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={handleSubmit}
              aria-busy={status === "transmitting"}
              className={styles.form}
            >
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
              <Stack gap="lg" className={styles.formStack}>
                {status === "error" && (
                  <div role="alert" aria-live="assertive">
                    <Callout
                      variant="notice"
                      icon={<WarningAlt size={16} />}
                      title={dict.contact.errors.transmissionFailedTitle}
                    >
                      <Text size="xs" tone="secondary">
                        {serverError || `${dict.contact.errors.transmissionFailed} (${directEmail})`}
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
                    iconLeft={<Email size={16} />}
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
                  containerClassName={styles.briefWrapper}
                  className={styles.briefTextarea}
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
                  iconLeft={<SendAlt size={16} />}
                >
                  {status === "transmitting" ? dict.contact.transmittingButton : dict.contact.submitButton}
                </Button>
              </Stack>
            </form>
          )}
        </HudCard>

        {/* Right Info Column */}
        <div className={styles.infoColumn}>
          <HudCard variant="surface" corners={false} className={`${styles.infoCard} ${styles.emailCard}`}>
            <div>
              <TelemetryBadge variant="cyan" className={styles.infoCardTag}>
                {dict.contact.infoColumn.directEmailTag}
              </TelemetryBadge>
              <Text as="h4" font="heading" size="lg" weight="semibold" tone="primary" className={styles.infoCardTitle}>
                {dict.contact.infoColumn.directEmailTitle}
              </Text>
              <Text as="p" size="sm" tone="secondary" leading="relaxed" className={styles.infoCardDesc}>
                {dict.contact.infoColumn.directEmailDesc}
              </Text>
            </div>

            <CopySnippet text={directEmail} label="COPY" copiedLabel="COPIED" />
          </HudCard>

          {/* Key Facts */}
          <HudCard variant="surface" corners={false} className={styles.infoCard}>
            <TelemetryBadge variant="cyan" className={styles.infoCardTag}>
              {dict.contact.infoColumn.atAGlanceTag}
            </TelemetryBadge>
            <Stack gap="none">
              <Stat variant="row" label={dict.contact.infoColumn.backendLabel} value={dict.contact.infoColumn.backendValue} />
              <Stat variant="row" label={dict.contact.infoColumn.frontendLabel} value={dict.contact.infoColumn.frontendValue} />
              <Stat variant="row" label={dict.contact.infoColumn.personalLabel} value={dict.contact.infoColumn.personalValue} />
              <Stat variant="row" label={dict.contact.infoColumn.physicsLabel} value={dict.contact.infoColumn.physicsValue} />
            </Stack>
          </HudCard>
        </div>
      </div>
    </div>
  );
}
