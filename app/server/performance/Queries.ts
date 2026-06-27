"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
export default async function CardsData() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  const data = await prisma.project.findMany({
    where: {
      userId: session.user.id,
      // status: "ACTIVE",
    },
    include: {
      tasks: true,
      invoices: {
        select: {
          amount: true,
          status: true,
        },
      },
    },
  });

  const totalRevenue = data.reduce((total, project) => {
    const paidAmount = project.invoices
      .filter((invoice) => invoice.status === "PAID")
      .reduce((sum, invoice) => sum + Number(invoice.amount), 0);

    return total + paidAmount;
  }, 0);

  const outstandingRevenue = data.reduce((total, project) => {
    const unpaidAmount = project.invoices
      .filter((invoice) => invoice.status === "UNPAID")
      .reduce((sum, invoice) => sum + Number(invoice.amount), 0);

    return total + unpaidAmount;
  }, 0);

  const unpaidInvoices = data.reduce(
    (count, project) =>
      count +
      project.invoices.filter((invoice) => invoice.status === "UNPAID").length,
    0,
  );

  const activeProjects = data.length;

  const today = new Date();

  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const dueThisWeek = data.filter(
    (project) => project.deadline >= today && project.deadline <= nextWeek,
  ).length;

  const totalTasks = data.reduce(
    (total, project) => total + project.tasks.length,
    0,
  );

  const completedTasks = data.reduce(
    (total, project) =>
      total +
      project.tasks.filter((task) => task.status === "COMPLETED").length,
    0,
  );

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return {
    totalRevenue,
    outstandingRevenue,
    unpaidInvoices,
    activeProjects,
    dueThisWeek,
    totalTasks,
    completedTasks,
    completionRate,
  };
}

export async function RevenueAreaChart() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  const invoices = await prisma.invoice.findMany({
    where: {
      status: "PAID",
      project: {
        userId: session.user.id,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
  });

  const monthlyRevenue = invoices.reduce(
    (acc, invoice) => {
      const date = new Date(invoice.createdAt);

      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, "0")}-01`;

      acc[monthKey] = (acc[monthKey] || 0) + Number(invoice.amount);

      return acc;
    },
    {} as Record<string, number>,
  );

  const chartData = Object.entries(monthlyRevenue)
    .map(([date, revenue]) => ({
      date,
      revenue,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return chartData;
}

export async function PieChart() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  const invoiceStatusCounts = await prisma.invoice.groupBy({
    by: ["status"],
    where: {
      project: {
        userId: session.user.id,
      },
    },
    _count: {
      status: true,
    },
  });
  // const counts = invoiceStatusCounts.reduce(
  //   (acc, item) => {
  //     acc[item.status] = item._count.status;
  //     return acc;
  //   },
  //   {} as Record<string, number>,
  // );

  return invoiceStatusCounts;
}
