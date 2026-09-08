"use client";

import { useReducer, useEffect, useCallback } from "react";
import type { ContactRequestBody, ContactApiResponse } from "@/types/contact";
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

export function useContactForm() {
  const { dict } = useLocale();

  const [state, dispatch] = useReducer(contactFormReducer, initialFormState);
  const { formData, errors, status, telemetryId, serverError } = state;

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

  const validate = useCallback((): boolean => {
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
  }, [formData, dict.contact.errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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
  }, [formData, validate]);

  const setField = useCallback((field: keyof ContactRequestBody, value: string) => {
    dispatch({ type: "SET_FIELD", field, value });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: "RESET_FORM" });
  }, []);

  return {
    formData,
    errors,
    status,
    telemetryId,
    serverError,
    dispatch,
    setField,
    resetForm,
    handleSubmit,
  };
}
