import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  email: z.string().email("Invalid email address"),

  phone: z.string().min(10, "Phone number is required"),

  company: z.string().min(2, "Company is required"),

  industry: z.string().min(2, "Industry is required"),

  address: z.string().min(5, "Address is required"),

  website: z.url("Invalid website URL"),

  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export type ClientInput = z.infer<typeof clientSchema>;