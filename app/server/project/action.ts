"use server";

import { projectSchema } from "@/app/schema/projectschema";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    budget: formData.get("budget"),
    deadline: formData.get("deadline"),
    clientId: formData.get("clientId"),
  };

  const result = projectSchema.safeParse(data);
  if (!result.success) {
    throw new Error("Validation Failed");
  }
  await prisma.project.create({
    data: {
      ...result.data,
      userId: session.user.id,
    },
  });
  revalidatePath("/dashboard/project");
}
