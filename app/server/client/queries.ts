import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

enum statusinterface {
  ACTIVE,
  INACTIVE,
  ALL,
}
export async function getalltheclients(status?: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  const clients = await prisma.client.findMany({
    where: {
      userId: session.user.id,
      ...(status && status !== "ALL"
        ? {
            status: status as any,
          }
        : {}),
    },

    select: {
      id: true,
      name: true,
      email: true,
      company: true,
      industry: true,
      status: true,
      projects: {
        select: {
          status: true,
        },
      },
    },
  });

  return clients.map((client) => {
    const activeProjects = client.projects.filter(
      (project) => project.status === "ACTIVE",
    ).length;

    const planningProjects = client.projects.filter(
      (project) => project.status === "PLANNING",
    ).length;

    const onHoldProjects = client.projects.filter(
      (project) => project.status === "ON_HOLD",
    ).length;

    const completedProjects = client.projects.filter(
      (project) => project.status === "COMPLETED",
    ).length;

    return {
      id: client.id,
      name: client.name,
      email: client.email,
      company: client.company,
      industry: client.industry,
      status: client.status,
      totalProjects: client.projects.length,
      activeProjects,
      planningProjects,
      onHoldProjects,
      completedProjects,
    };
  });
}
