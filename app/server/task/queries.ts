"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function getallthetasks() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("UNAUTHORIZED");
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      tasks: true,
    },
  });

  return {
    projects: projects.map((project) => ({
      projectId: project.id,
      projecttitle: project.title,
      projectdescription: project.description,
      projectdeadline: project.deadline,
      projectpriority: project.priority,
      projectstatus: project.status,
      totaltask: project.tasks.length,
      image: session.user?.image,
      nameoftheuser: session.user?.name,
      completedTasks: project.tasks.filter(
        (task) => task.status === "COMPLETED",
      ).length,
      tasks: project.tasks.map((task) => ({
        id: task.id,
        status: task.status,
        tasktitle: task.title,
        taskdescription: task.description,
        startDate: task.createdAt,
      })),
    })),
  };
}
