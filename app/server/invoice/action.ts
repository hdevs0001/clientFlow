"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateInvoiceInput {
  clientId: string;
  projectId: string;
  dueDate: string;
  items: {
    description: string;
    quantity: number;
    rate: number;
  }[];
}

export async function createInvoice(data: CreateInvoiceInput) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const result = await prisma.$transaction(async (tx) => {
    const lastInvoice = await tx.invoice.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        invoiceNumber: true,
      },
    });

    let nextNumber = 1;

    if (lastInvoice?.invoiceNumber) {
      const parts = lastInvoice.invoiceNumber.split("-");
      nextNumber = Number(parts[2]) + 1;
    }

    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(
      nextNumber,
    ).padStart(4, "0")}`;

    const amount = data.items.reduce(
      (sum, item) => sum + item.quantity * item.rate,
      0,
    );

    const invoice = await tx.invoice.create({
      data: {
        invoiceNumber,
        amount,
        issueDate: new Date(),
        dueDate: new Date(data.dueDate),
        status: "UNPAID",

        clientId: data.clientId,
        projectId: data.projectId,

        items: {
          create: data.items.map((item) => ({
            description: item.description,
            quantity: item.quantity,
            rate: item.rate,
          })),
        },
      },
    });

    return {
      success: true,
      invoiceId: invoice.id,
      invoiceNumber,
    };
  });

  // Revalidate pages AFTER transaction succeeds
  revalidatePath("/dashboard/invoice");

  return result;
}
