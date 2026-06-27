// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { getRecentProjects } from "@/app/server/dashboard/queries";

// function getStatusStyles(status: string) {
//   switch (status) {
//     case "Active":
//       return "bg-violet-100 text-violet-700 border-violet-200";

//     case "Planning":
//       return "bg-gray-100 text-gray-600 border-gray-200";

//     case "On Hold":
//       return "bg-orange-100 text-orange-700 border-orange-200";

//     case "Completed":
//       return "bg-emerald-100 text-emerald-700 border-emerald-200";

//     default:
//       return "";
//   }
// }

// function getProgressColor(status: string) {
//   switch (status) {
//     case "Active":
//       return "bg-indigo-600";

//     case "Planning":
//       return "bg-gray-500";

//     case "On Hold":
//       return "bg-orange-600";

//     case "Completed":
//       return "bg-emerald-600";

//     default:
//       return "bg-slate-600";
//   }
// }

// export default async function RecentProjects() {
//   const projects  = await getRecentProjects();
 
//   return (
//     <div className="w-full rounded-2xl border bg-white overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center justify-between border-b px-4 py-4 md:px-6 md:py-5">
//         <h2 className="text-xl md:text-2xl font-serif">Recent Projects</h2>

//         <button className="text-sm font-medium text-indigo-600 hover:underline">
//           View All →
//         </button>
//       </div>

//       {/* Desktop Table */}
//       <div className="hidden md:block overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>PROJECT NAME</TableHead>
//               <TableHead>CLIENT</TableHead>
//               <TableHead>STATUS</TableHead>
//               <TableHead>PROGRESS</TableHead>
//               <TableHead>DUE DATE</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {projects.map((project) => (
//               <TableRow key={project.id}>
//                 <TableCell className="font-medium">{project.name}</TableCell>

//                 <TableCell>{project.client}</TableCell>

//                 <TableCell>
//                   <span
//                     className={`rounded-full border px-3 py-1 text-xs ${getStatusStyles(
//                       project.status,
//                     )}`}
//                   >
//                     {project.status}
//                   </span>
//                 </TableCell>

//                 <TableCell>
//                   <div className="flex items-center gap-3">
//                     <div className="h-2 w-24 rounded-full bg-slate-200">
//                       <div
//                         className={`h-2 rounded-full ${getProgressColor(
//                           project.status,
//                         )}`}
//                         style={{
//                           width: `${project.progress}%`,
//                         }}
//                       />
//                     </div>

//                     <span className="text-xs text-muted-foreground">
//                       {project.progress}%
//                     </span>
//                   </div>
//                 </TableCell>

//                 <TableCell>{project.dueDate}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Mobile Cards */}
//       <div className="md:hidden">
//         {projects.map((project) => (
//           <div key={project.name} className="border-b p-4 last:border-b-0">
//             <div className="space-y-3">
//               <div>
//                 <h3 className="font-medium text-sm">{project.name}</h3>

//                 <p className="text-xs text-muted-foreground">
//                   {project.client}
//                 </p>
//               </div>

//               <div className="flex items-center justify-between">
//                 <span
//                   className={`rounded-full border px-3 py-1 text-xs ${getStatusStyles(
//                     project.status,
//                   )}`}
//                 >
//                   {project.status}
//                 </span>

//                 <span className="text-xs text-muted-foreground">
//                   {project.dueDate}
//                 </span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="h-2 flex-1 rounded-full bg-slate-200">
//                   <div
//                     className={`h-2 rounded-full ${getProgressColor(
//                       project.status,
//                     )}`}
//                     style={{
//                       width: `${project.progress}%`,
//                     }}
//                   />
//                 </div>

//                 <span className="text-xs font-medium">{project.progress}%</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getRecentProjects } from "@/app/server/dashboard/queries";
import Link from "next/link";
import { Folder } from "lucide-react";

function getStatusStyles(status: string) {
  switch (status) {
    case "ACTIVE":
      return "bg-violet-100 text-violet-700 border-violet-200";

    case "PLANNING":
      return "bg-gray-100 text-gray-600 border-gray-200";

    case "ON_HOLD":
      return "bg-orange-100 text-orange-700 border-orange-200";

    case "COMPLETED":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";

    default:
      return "";
  }
}

function getProgressColor(status: string) {
  switch (status) {
    case "ACTIVE":
      return "bg-indigo-600";

    case "PLANNING":
      return "bg-gray-500";

    case "ON_HOLD":
      return "bg-orange-600";

    case "COMPLETED":
      return "bg-emerald-600";

    default:
      return "bg-slate-600";
  }
}

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default async function RecentProjects() {
  const projects = await getRecentProjects();
if (projects.length === 0) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-6">
      <div className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-white px-8 py-10 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
          <Folder className="h-7 w-7 text-blue-500" />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-zinc-800">
          No Recent Projects
        </h2>

        <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500">
          Your recent projects will appear here once you create and start
          working on them.
        </p>
      </div>
    </div>
  );
}

  return (
    <div className="w-full overflow-hidden rounded-2xl border bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-4 md:px-6 md:py-5">
        <h2 className="text-xl font-serif md:text-2xl">
          Recent Projects
        </h2>

        <button className="text-sm font-medium text-indigo-600 hover:underline">
         <Link href={"/dashboard/project"}> View All →</Link>
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PROJECT NAME</TableHead>
              <TableHead>CLIENT</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>PROGRESS</TableHead>
              <TableHead>DUE DATE</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  {project.title}
                </TableCell>

                <TableCell>
                  {project.clientName}
                </TableCell>

                <TableCell>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs ${getStatusStyles(
                      project.status
                    )}`}
                  >
                    {formatStatus(project.status)}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-24 rounded-full bg-slate-200">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(
                          project.status
                        )}`}
                        style={{
                          width: `${project.progress}%`,
                        }}
                      />
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {project.progress}%
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  {new Date(
                    project.dueDate
                  ).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border-b p-4 last:border-b-0"
          >
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium">
                  {project.title}
                </h3>

                <p className="text-xs text-muted-foreground">
                  {project.clientName}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full border px-3 py-1 text-xs ${getStatusStyles(
                    project.status
                  )}`}
                >
                  {formatStatus(project.status)}
                </span>

                <span className="text-xs text-muted-foreground">
                  {new Date(
                    project.dueDate
                  ).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-2 flex-1 rounded-full bg-slate-200">
                  <div
                    className={`h-2 rounded-full ${getProgressColor(
                      project.status
                    )}`}
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>

                <span className="text-xs font-medium">
                  {project.progress}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}