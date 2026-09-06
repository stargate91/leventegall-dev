import { z } from "zod";

export const checkoutFormSchema = z.object({
  packageId: z.enum(["naming", "full-orbit", "web-dev"]),

  email: z
    .string()
    .trim()
    .email("Invalid email address format.")
    .optional()
    .or(z.literal("")),
});
