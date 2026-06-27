import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function getalltheprojects(status?: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  const projects = await prisma.project.findMany({
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
      title: true,
      deadline: true,
      status: true,
      priority: true,

      client: {
        select: {
          name: true,
        },
      },

      _count: {
        select: {
          tasks: true,
        },
      },

      tasks: {
        select: {
          status: true,
        },
      },
    },
  });

  const projectsWithProgress = projects.map((project) => {
    const totalTasks = project._count.tasks;

    const completedTasks = project.tasks.filter(
      (task) => task.status === "COMPLETED",
    ).length;

    const progress =
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    return {
      id: project.id,
      title: project.title,
      deadline: project.deadline.toDateString(),
      status: project.status,
      priority: project.priority,

      clientName: project.client?.name,

      totalTasks,
      completedTasks,
      progress,
    };
  });

  return projectsWithProgress;
}
