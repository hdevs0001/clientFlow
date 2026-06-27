import { CalendarDays, Folder, Pencil, Plus } from "lucide-react";
import { getUpcomingTasks } from "@/app/server/dashboard/queries";

function getPriorityStyles(priority: string) {
  switch (priority) {
    case "TODO":
      return "bg-red-100 text-red-700";

    case "IN_PROGRESS":
      return "bg-orange-100 text-orange-700";

    case "COMPLETED":
      return "bg-violet-100 text-violet-700";

    default:
      return "";
  }
}

export default async function UpcomingTasks() {
  const tasks = await getUpcomingTasks();
 if (tasks.length === 0) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-6">
      <div className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-white px-8 py-10 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
          <Pencil className="h-7 w-7 text-blue-500" />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-zinc-800">
          No Upcoming Tasks
        </h2>

        <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500">
          You're all caught up! New tasks with upcoming deadlines will appear
          here.
        </p>
      </div>
    </div>
  );
}
  return (
    <div className="w-full overflow-hidden rounded-2xl border bg-white">
      <div className="flex items-center justify-between border-b px-4 py-4 sm:px-5 sm:py-5">
        <h2 className="text-xl font-serif sm:text-2xl">Upcoming Tasks</h2>

        <button className="rounded-md p-1 hover:bg-slate-100">
          <Plus className="h-5 w-5 text-slate-600" />
        </button>
      </div>

      <div className="space-y-5 p-4 sm:p-5">
        {tasks.map((task) => (
          <div key={task.id} className="flex gap-3">
            <div className="mt-1 h-5 w-5 shrink-0 rounded border border-slate-300" />

            <div className="flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <p className="text-sm text-slate-800">{task.title}</p>

                <span
                  className={`w-fit rounded px-2 py-1 text-[10px] font-semibold ${getPriorityStyles(
                    task.priority,
                  )}`}
                >
                  {task.priority}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                <CalendarDays className="h-3 w-3" />

                {new Date(task.deadline).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
