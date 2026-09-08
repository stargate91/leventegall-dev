import type { Dictionary } from "@/locales";

export interface ClientFeedback {
  id: string;
  quote: string;
  client: string;
  stars: number;
}

export function getFiverrFeedback(dict: Dictionary): ClientFeedback[] {
  return dict.testimonials.feedback.map((item) => ({
    id: item.id,
    quote: item.quote,
    client: item.client,
    stars: 5,
  }));
}
