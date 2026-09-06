/**
 * Shared Type Contract for Contact & Transmission API
 */

export interface ContactRequestBody {
  name: string;
  email: string;
  tier: string;
  timeline: string;
  brief: string;
  botProbe?: string | undefined;
}

export interface ContactSuccessResponse {
  success: true;
  message: string;
  telemetryId: string;
}

export interface ContactErrorResponse {
  error: string;
}

export type ContactApiResponse = ContactSuccessResponse | ContactErrorResponse;
