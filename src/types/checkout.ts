/**
 * Shared Type Contract for Mission Checkout API
 */

export interface CheckoutRequestBody {
  packageId: "naming" | "full-orbit" | "web-dev";
  email?: string | undefined;
}

export interface CheckoutSimulationResponse {
  simulation: true;
  message: string;
  orderSummary: {
    package: string;
    amountFormatted: string;
    clientEmail: string;
    status: string;
  };
}

export interface CheckoutErrorResponse {
  error: string;
}

export type CheckoutApiResponse = CheckoutSimulationResponse | CheckoutErrorResponse;
