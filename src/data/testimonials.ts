import type { Dictionary } from "@/locales";

export interface ClientFeedback {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  initials: string;
  avatar?: string | undefined;
  stars: number;
}

export function getFiverrFeedback(dict: Dictionary): ClientFeedback[] {
  return dict.testimonials.feedback.map((item) => ({
    id: item.id,
    quote: item.quote,
    author: item.author,
    role: item.role,
    location: item.location,
    initials: item.initials,
    avatar: item.avatar,
    stars: 5,
  }));
}
