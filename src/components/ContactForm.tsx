"use client";

import { SendAlt, Radio, User, Email, WarningAlt } from "@carbon/icons-react";
import styles from "./ContactForm.module.css";
import ContactInfoSidebar from "./contact/ContactInfoSidebar";
import ContactSuccessView from "./contact/ContactSuccessView";
import {
  SectionHeader,
  HudCard,
  Button,
  Input,
  Select,
  Textarea,
  Stack,
  Grid,
  Callout,
  Text,
} from "@/components/ui";
import { getContactTierOptions, getTimelineOptions } from "@/data/services";
import { siteConfig } from "@/config/site";
import {
  useContactForm,
  contactFormReducer,
  initialFormState,
  type ContactFormState,
} from "@/hooks";
import { useLocale } from "@/locales";

export { contactFormReducer, initialFormState };
export type { ContactFormState };

export default function ContactForm() {
  const { dict } = useLocale();
  const contactTierOptions = getContactTierOptions(dict);
  const timelineOptions = getTimelineOptions(dict);
  const reference = dict.testimonials.feedback.find((item) => item.id === "feedback-aldo-scardovi");

  const {
    formData,
    errors,
    status,
    telemetryId,
    serverError,
    setField,
    resetForm,
    handleSubmit,
  } = useContactForm();

  const directEmail = siteConfig.email;

  return (
    <div className={`section-container ${styles.sectionWrapper}`}>
      {/* Header */}
      <SectionHeader
        subtitle={dict.contact.subtitle}
        subtitleIcon={<Radio size={14} />}
        title={dict.contact.title}
        description={dict.contact.description}
      />

      {reference && (
        <figure className={styles.clientQuote}>
          <p className={styles.quoteContext}>{dict.testimonials.context}</p>
          <blockquote>{reference.quote}</blockquote>
          <figcaption>
            <strong>{reference.author}</strong>
            <span>{reference.role} · {reference.location}</span>
          </figcaption>
        </figure>
      )}

      {/* Main Grid */}
      <div className={styles.grid}>
        {/* Left Console: Contact Form */}
        <HudCard variant="surface" className={styles.formCard}>
          {status === "success" ? (
            <ContactSuccessView
              telemetryId={telemetryId}
              onReset={resetForm}
            />
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
                onChange={(e) => setField("botProbe", e.target.value)}
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
                    onChange={(e) => setField("name", e.target.value)}
                  />

                  <Input
                    id="contact-email"
                    label={dict.contact.fields.email}
                    type="email"
                    placeholder={dict.contact.fields.emailPlaceholder}
                    iconLeft={<Email size={16} />}
                    value={formData.email}
                    error={errors.email}
                    onChange={(e) => setField("email", e.target.value)}
                  />
                </Grid>

                {/* Row 2: Service & Timeline */}
                <Grid cols={2} gap="md">
                  <Select
                    id="contact-tier-select"
                    label={dict.contact.fields.tier}
                    options={contactTierOptions}
                    value={formData.tier}
                    onChange={(val) => setField("tier", val)}
                  />

                  <Select
                    id="contact-timeline"
                    label={dict.contact.fields.timeline}
                    options={timelineOptions}
                    value={formData.timeline}
                    onChange={(val) => setField("timeline", val)}
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
                  onChange={(e) => setField("brief", e.target.value)}
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
        <ContactInfoSidebar />
      </div>
    </div>
  );
}
