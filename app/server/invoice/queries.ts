import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function getAllTheInvoiceData() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  const invoices = await prisma.invoice.findMany({
    where: {
      project: {
        userId: session.user.id,
      },
    },
    include: {
      client: {
        select: {
          name: true,
        },
      },
      project: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const currentDate = new Date();

  const totalRevenue = invoices
    .filter((invoice) => invoice.status === "PAID")
    .reduce((sum, invoice) => sum + Number(invoice.amount), 0);

  const pendingRevenue = invoices
    .filter(
      (invoice) =>
        invoice.status === "UNPAID" && invoice.dueDate >= currentDate,
    )
    .reduce((sum, invoice) => sum + Number(invoice.amount), 0);

  const overdueRevenue = invoices
    .filter(
      (invoice) => invoice.status === "UNPAID" && invoice.dueDate < currentDate,
    )
    .reduce((sum, invoice) => sum + Number(invoice.amount), 0);

  const invoiceCountPaid = invoices.filter(
    (invoice) => invoice.status === "PAID",
  ).length;

  const invoiceCountPending = invoices.filter(
    (invoice) => invoice.status === "UNPAID" && invoice.dueDate >= currentDate,
  ).length;

  const invoiceCountOverdue = invoices.filter(
    (invoice) => invoice.status === "UNPAID" && invoice.dueDate < currentDate,
  ).length;

  const recentInvoices = invoices.map((invoice) => ({
    id: invoice.invoiceNumber,
    clientName: invoice.client.name,
    projectName: invoice.project.title,
    dueDate: invoice.dueDate,
    status: invoice.status,
    amount: Number(invoice.amount),
    
  }));

  return {
    totalRevenue,
    pendingRevenue,
    overdueRevenue,
    invoiceCountPaid,
    invoiceCountPending,
    invoiceCountOverdue,
    recentInvoices,
  };
}

export async function getAlltheClientsOfTheUser() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  return prisma.client.findMany({
    where: {
      userId: session.user.id,
    },
  });
}
export async function getProjectsByClient() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  return prisma.project.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      title: true,
      clientId: true,
    },
    orderBy: {
      title: "asc",
    },
  });
}
