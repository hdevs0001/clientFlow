"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { TaskStatus } from "@/app/generated/prisma/enums";
import { revalidatePath } from "next/cache";
import { taskSchema } from "@/app/schema/taskSchema";

export async function toggleTaskStatus(taskId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  const newStatus =
    task.status === TaskStatus.COMPLETED
      ? TaskStatus.TODO
      : TaskStatus.COMPLETED;

  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      status: newStatus,
    },
  });

  revalidatePath("/dashboard/task");
}

export async function addTask(formData: FormData) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const validatedFields = taskSchema.safeParse({
      projectId: formData.get("projectId"),
      title: formData.get("title"),
      description: formData.get("description"),
      status: formData.get("status"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Invalid form data",
      };
    }

    const { projectId, title, description, status } = validatedFields.data;

    await prisma.task.create({
      data: {
        title,
        description,
        status,
        projectId,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Task created successfully",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function updateTask(data: {
  taskId: string;
  title: string;
  description: string;
  status: string;
}) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    await prisma.task.update({
      where: {
        id: data.taskId,
      },
      data: {
        title: data.title,
        description: data.description,
        status: data.status as any,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Task updated successfully",
    };
  } catch {
    return {
      success: false,
      message: "Failed to update task",
    };
  }
}

export async function deleteTask(taskId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Task deleted successfully",
    };
  } catch {
    return {
      success: false,
      message: "Failed to delete task",
    };
  }
}
