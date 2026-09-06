import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must not exceed 100 characters" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address format" })
    .max(255, { message: "Email must not exceed 255 characters" }),
  tier: z
    .string()
    .trim()
    .max(50)
    .optional()
    .default("full-orbit"),
  timeline: z
    .string()
    .trim()
    .max(50)
    .optional()
    .default("2-3-weeks"),
  brief: z
    .string()
    .trim()
    .min(1, { message: "Project details are required" })
    .min(10, { message: "Project brief must be at least 10 characters" })
    .max(5000, { message: "Project brief must not exceed 5000 characters" }),
});
