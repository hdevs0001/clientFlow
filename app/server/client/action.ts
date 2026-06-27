"use server";

import { prisma } from "@/lib/prisma";
import { clientSchema } from "@/app/schema/clientschema";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export default async function handlesubmit(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("company"),
    industry: formData.get("industry"),
    address: formData.get("address"),
    website: formData.get("website"),
    status: formData.get("status"),
  };

  const result = clientSchema.safeParse(data);

  if (!result.success) {
    throw new Error("Validation Failed");
  }

  await prisma.client.create({
    data: {
      ...result.data,
      userId: session.user.id,
    },
  });
  revalidatePath("/dashboard/clients");
}
