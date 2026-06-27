"use server";


import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateInvoicePdf } from "@/src/pdf/lib/GenratedInvoice";
import { sendInvoiceEmail } from "@/src/pdf/lib/sendInvoiceEmail";

export async function sendInvoice(invoiceId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }
  const invoice = await prisma.invoice.findUnique({
    where: {
      invoiceNumber: invoiceId,
    },
    include: {
      client: true,
      project: true,
      items: true,
    },
  });

  if (!invoice) {
    throw new Error("Invoice not found");
  }

  const invoiceData = {
    invoiceNumber: invoice.invoiceNumber,

    projectName: invoice.project.title,

    status: invoice.status,

    issueDate: invoice.issueDate.toLocaleDateString(),

    dueDate: invoice.dueDate.toLocaleDateString(),

    from: {
      name: session.user.name,
      email: session.user.email,
      businessName: "ClientFlow",
    },

    billTo: {
      name: invoice.client.name,
      email: invoice.client.email,
      address: invoice.client.address,
    },

    items: invoice.items.map((item) => ({
      description: item.description,
      quantity: item.quantity,
      rate: item.rate,
    })),

    notes: ` Thank you for your business. Payment is due till ${invoice.dueDate.toLocaleDateString()}.`,
  };

  const pdfBuffer = await generateInvoicePdf(invoiceData);

  await sendInvoiceEmail(
    invoice.client.email,
    pdfBuffer,
    invoice.invoiceNumber,
  );

  return {
    success: true,
  };
}
