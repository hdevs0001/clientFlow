import { Folder, MoreVertical, Plus } from "lucide-react";

import getallthetasks from "@/app/server/task/queries";
import CheckButton from "./ui/checkbutton";
import Image from "next/image";
import AddTaskDialog from "./ui/addbutton";
import TaskActions from "./TaskAction";

export default async function Taskcomoopeont() {
  const groupedProjects = await getallthetasks();
  if (groupedProjects.projects.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <Folder className="h-10 w-10 text-blue-500" />
        </div>

        <h2 className="mt-6 text-3xl font-bold tracking-tight text-zinc-800">
          No Tasks Yet
        </h2>

        <p className="mt-3 max-w-md text-base leading-7 text-zinc-500">
          You haven't created any projects yet. Create your first project to
          start organizing tasks, tracking progress, and managing your workflow.
        </p>

        <div className="mt-6 h-1 w-20 rounded-full bg-blue-500" />
      </div>
    );
  }
  return (
    <div className="space-y-6 p-4 md:p-6">
      {groupedProjects.projects.map((project) => (
        <div
          key={project.projectId}
          className="rounded-3xl p-4 md:p-6 shadow-2xl bg-zinc-100 "
        >
          {/* Header */}
          <div className="bg-white rounded-2xl flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-4 ">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-200">
                <Folder className="fill-blue-500 border-blue-500 text-blue-500" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-blue-500">
                  {project.projecttitle.charAt(0).toUpperCase() +
                    project.projecttitle.slice(1)}
                </h2>

                <div className="mt-1 flex flex-wrap gap-3 text-xs text-zinc-400">
                  <span>{project.projectpriority}</span>
                  <span>|</span>
                  <span>{project.projectdeadline.toLocaleDateString()}</span>
                  <span>|</span>
                  <span>{project.projectstatus}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-black">
                {project.completedTasks}/{project.totaltask}
              </span>

              <div className="h-5 w-5 rounded-full border-2 border-emerald-500" />

              <span className="text-zinc-600">|</span>
              <AddTaskDialog projectId={project.projectId} />
            </div>
          </div>

          {/* Tasks */}
          <div className="mt-6 space-y-2">
            {project.tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col gap-3 rounded-xl px-3 py-3 bg-white md:flex-row md:items-center md:justify-between "
              >
                {/* Left */}
                <div className="flex items-center gap-3 min-w-0">
                  <CheckButton taskId={task.id} status={task.status} />

                  <p
                    className={`truncate text-sm  ${
                      task.status === "COMPLETED"
                        ? "line-through text-zinc-600"
                        : "text-black"
                    }`}
                  >
                    {task.tasktitle}
                  </p>
                </div>

                {/* Right */}
                <div className="grid grid-cols-2 gap-2 text-xs md:flex md:flex-wrap md:items-center md:justify-end md:gap-3">
                  {/* Description */}
                  <span className="col-span-2 rounded-full bg-blue-500 px-3 py-1 text-white md:col-span-1">
                    {task.taskdescription}
                  </span>

                  {/* Status - move below description on mobile */}
                  <span
                    className={`col-span-2 md:col-span-1 ${
                      task.status === "COMPLETED"
                        ? "text-emerald-500"
                        : task.status === "IN_PROGRESS"
                          ? "text-amber-400"
                          : "text-zinc-500"
                    }`}
                  >
                    {task.status}
                  </span>

                  {/* Date - left side */}
                  <span className="text-zinc-500">
                    Start: {task.startDate.toLocaleDateString()}
                  </span>

                  {/* Avatar + Action - right side */}
                  <div className="flex justify-end items-center gap-2">
                    {project.image?.trim() ? (
                      <Image
                        src={project.image}
                        alt={project.nameoftheuser ?? "avatar"}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="h-7 w-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                        {project.nameoftheuser?.[0]?.toUpperCase() ?? "U"}
                      </div>
                    )}

                    <TaskActions
                      task={{
                        id: task.id,
                        title: task.tasktitle,
                        description: task.taskdescription ?? "No Description",
                        status: task.status,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
