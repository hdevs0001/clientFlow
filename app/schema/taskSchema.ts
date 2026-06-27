import { z } from "zod";

export const taskSchema = z.object({
  projectId: z.string(),
  title: z.string().min(2),
  description: z.string().min(2),
  status: z.enum([
    "TODO",
    "IN_PROGRESS",
    "COMPLETED",
  ]),
});