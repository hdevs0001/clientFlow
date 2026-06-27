import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function getDashboardData() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  // this function is for statuscard in page.tsx file

  const groupedStats = await prisma.project.groupBy({
    by: ["status"],
    where: {
      userId: session.user.id,
    },
    _count: {
      status: true,
    },
  });

  const statsMap = Object.fromEntries(
    groupedStats.map((item) => [item.status, item._count.status]),
  );
  return {
    totalProjects: Object.values(statsMap).reduce(
      (sum, count) => sum + count,
      0,
    ),
    activeProjects: statsMap.ACTIVE ?? 0,

    onHoldProjects: statsMap.ON_HOLD ?? 0,

    planningProjects: statsMap.PLANNING ?? 0,

    completedProjects: statsMap.COMPLETED ?? 0,
  };
}

// this is to get the recent project data from the database

export async function getRecentProjects() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: session.user.id,
    },

    include: {
      client: {
        select: {
          name: true,
        },
      },

      tasks: {
        select: {
          status: true,
        },
      },
    },

    orderBy: {
      updatedAt: "desc",
    },

    take: 5,
  });

  return projects.map((project) => {
    const totalTasks = project.tasks.length;

    const completedTasks = project.tasks.filter(
      (task) => task.status === "COMPLETED",
    ).length;

    const progress =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return {
      id: project.id,
      title: project.title,
      clientName: project.client.name,
      status: project.status,
      progress,
      dueDate: project.deadline,
    };
  });
}

export async function getUpcomingTasks() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  const tasks = await prisma.task.findMany({
    where: {
      project: {
        userId: session.user.id,
      },
    },

    include: {
      project: {
        select: {
          title: true,
          deadline: true,
        },
      },
    },

    orderBy: {
      project: {
        deadline: "asc",
      },
    },

    take: 5,
  });

  return tasks.map((task) => ({
    id: task.id,
    title: task.title,
    priority: task.status,
    deadline: task.project.deadline,
  }));
}
