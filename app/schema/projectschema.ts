import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters"),

  status: z.enum([
    "ACTIVE",
    "PLANNING",
    "ON_HOLD",
    "COMPLETED",
  ]),

  priority: z.enum([
    "LOW",
    "MEDIUM",
    "HIGH",
    "URGENT",
  ]),

  budget: z.coerce
    .number()
    .positive("Budget must be greater than 0"),

  deadline: z.coerce.date({
    message: "Please select a valid deadline",
  }),

  clientId: z
    .string()
    .min(1, "Please select a client"),
});