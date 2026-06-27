import { Calendar, CircleCheck, Folder, PauseCircle } from "lucide-react";

import Headingcard from "./headingcard";
import { Button } from "./button";
import getalltheprojects from "@/app/server/project/queries";
import ProjectFilter from "../project-filter";
import CreateProjectDialog from "../add-project";
import { getalltheclients } from "@/app/server/client/queries";

type Props = {
  searchParams?: Promise<{
    status?: string;
  }>;
};

export default async function ProjectsDashboard({ searchParams }: Props) {
  const { status } = (await searchParams) ?? {};
  const projects = await getalltheprojects(status);
  const clients = await getalltheclients();

  return (
    <div className="min-h-screen  p-8 font-sans antialiased text-slate-900">
      <div className="mx-auto max-w-6xl">
        {/* --- Header Section --- */}
        <div className="flex flex-col sm:flex-col sm:items-start sm:justify-between gap-4 mb-8 w-full">
          <Headingcard
            title="Projects"
            description="Manage and track your active engagements."
          />
          <div className="w-full flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4 ">
            {/* Filter Tab */}

            <ProjectFilter />

            {/* <Button className="w-full sm:w-auto p-5 bg-blue-800">
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Button> */}
            <CreateProjectDialog clients={clients} />
          </div>
        </div>

        {/* --- Grid Cards Section --- */}

        {projects.length === 0 ? (
          <div className="flex min-h-[70vh] flex-col items-center justify-center text-center px-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <Folder className="h-10 w-10 text-blue-500" />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-zinc-800">
              No Projects Yet
            </h2>

            <p className="mt-3 max-w-md text-base leading-7 text-zinc-500">
              You haven't created any projects yet. Create your first project to
              start organizing tasks, tracking progress, and managing your
              workflow.
            </p>

            <div className="mt-6 h-1 w-20 rounded-full bg-blue-500" />
          </div>
        ) : (
          projects.map((project) => (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                key={project.id}
                className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-md"
              >
                <div>
                  {/* Card Top: Avatar & Status Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold text-lg ${
                        project.status === "ACTIVE"
                          ? "bg-indigo-100 text-indigo-600"
                          : project.status === "PLANNING"
                            ? "bg-amber-700 text-white"
                            : project.status === "ON_HOLD"
                              ? "bg-slate-100 text-slate-600"
                              : "bg-green-100 text-green-600"
                      }`}
                    >
                      {project.title.charAt(0).toUpperCase()}
                    </div>

                    {/* Status Badge */}
                    {project.status === "ACTIVE" && (
                      <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                        Active
                      </span>
                    )}
                    {project.status === "PLANNING" && (
                      <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        Planning
                      </span>
                    )}
                    {project.status === "ON_HOLD" && (
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-200">
                        <PauseCircle className="w-3.5 h-3.5" />
                        On Hold
                      </span>
                    )}
                    {project.status === "COMPLETED" && (
                      <span className="inline-flex items-center gap-1 bg-green-800 text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-slate-200">
                        <CircleCheck className="w-3.5 h-3.5" />
                        Completed
                      </span>
                    )}
                  </div>

                  {/* Card Main Info */}
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-0.5">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-medium mb-3">
                    {project.clientName}
                  </p>

                  {/* Due Date */}
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium mb-4">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>
                      Due:{" "}
                      {new Date(project.deadline).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Priority Badge */}
                  <div className="mb-6">
                    {project.priority === "HIGH" && (
                      <span className="bg-red-50 text-red-400 text-xs font-bold px-2.5 py-1 rounded-md border border-red-100">
                        High Priority
                      </span>
                    )}
                    {project.priority === "MEDIUM" && (
                      <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-md border border-slate-200">
                        Medium Priority
                      </span>
                    )}
                    {project.priority === "LOW" && (
                      <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2.5 py-1 rounded-md border border-slate-200">
                        Low Priority
                      </span>
                    )}
                    {project.priority === "URGENT" && (
                      <span className="bg-red-50 text-red-800 text-xs font-bold px-2.5 py-1 rounded-md border border-red-100">
                        Urgent Priority
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Footer */}
                <div className="pt-4 border-t border-slate-100/80">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  {/* Custom Progress Bar matching card themes */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        project.status === "ACTIVE"
                          ? "bg-indigo-600"
                          : project.status === "PLANNING"
                            ? "bg-amber-800"
                            : project.status === "ON_HOLD"
                              ? "bg-slate-400"
                              : "bg-green-800"
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
