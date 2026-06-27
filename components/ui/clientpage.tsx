import {
  MoreVertical,
  Plus,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Headingcard from "./headingcard";
import ProjectStatusCount from "../project-status-count";
import { getalltheclients } from "@/app/server/client/queries";
import ClientFilter from "../client-filter";
import CreateClientDialog from "../add_client";
type Props = {
  searchParams?: Promise<{
    status?: string;
  }>;
};
export default async function ClientsPage({ searchParams }: Props) {
  const { status } = (await searchParams) ?? {};
  const client = await getalltheclients(status);

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <Headingcard
          title="Clients"
          description="Manage your client relationships and active projects."
        />

        <CreateClientDialog />
      </div>

      {/* Filters */}

      <ClientFilter />
      {/* MOBILE CARDS */}

      <div className="md:hidden">
        {client.length === 0 ? (
          <div className="flex min-h-[40vh] items-center justify-center px-6">
            <div className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-white px-8 py-10 text-center shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                <User className="h-7 w-7 text-blue-500" />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-zinc-800">
                No Clients Yet
              </h2>

              <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500">
                Add your first client to start managing projects, invoices, and
                your freelance business in one place.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {client.map((client) => (
              <div
                key={client.id}
                className="rounded-xl border bg-background p-4 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                      <p>{client.name.charAt(0).toUpperCase()}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold">{client.name}</h3>

                      <p className="text-sm text-muted-foreground">
                        {client.email}
                      </p>
                    </div>
                  </div>

                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Company</span>
                    <span>{client.company}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Industry</span>
                    <span>{client.industry}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status</span>

                    <Badge
                      variant="outline"
                      className={
                        client.status === "ACTIVE"
                          ? "border-green-200 bg-green-50 text-green-700"
                          : "border-gray-200 bg-gray-100 text-gray-600"
                      }
                    >
                      {client.status}
                    </Badge>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Project</span>
                    <div className="flex gap-3 flex-row">
                      <ProjectStatusCount
                        count={client.activeProjects}
                        label="Active Projects"
                        color="text-green-500"
                      />

                      <ProjectStatusCount
                        count={client.planningProjects}
                        label="Planning Projects"
                        color="text-orange-500"
                      />

                      <ProjectStatusCount
                        count={client.onHoldProjects}
                        label="On Hold Projects"
                        color="text-gray-500"
                      />

                      <ProjectStatusCount
                        count={client.completedProjects}
                        label="Completed Projects"
                        color="text-purple-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* TABLET + DESKTOP */}
      <div className="hidden md:block">
        {client.length === 0 ? (
          <div className="flex min-h-[50vh] items-center justify-center">
            <h2 className="text-lg font-semibold text-zinc-800">
              No Clients Yet
            </h2>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead className="border-b bg-muted/40">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Client
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Company
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Industry
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      Current Projects
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {client.map((client) => (
                    <tr
                      key={client.id}
                      className="border-b last:border-0 hover:bg-muted/20"
                    >
                      <td className="px-4 py-4">
                        <div className="flex  gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                            <p>{client.name.charAt(0).toUpperCase()}</p>
                          </div>

                          <div>
                            <p className="font-medium">{client.name}</p>

                            <p className="text-sm text-muted-foreground">
                              {client.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">{client.company}</td>

                      <td className="px-4 py-4">{client.industry}</td>

                      <td className="px-4 py-4">
                        <Badge
                          variant="outline"
                          className={
                            client.status === "ACTIVE"
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-gray-200 bg-gray-100 text-gray-600"
                          }
                        >
                          {client.status}
                        </Badge>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex gap-3">
                          <ProjectStatusCount
                            count={client.activeProjects}
                            label="Active Projects"
                            color="text-green-500"
                          />

                          <ProjectStatusCount
                            count={client.planningProjects}
                            label="Planning Projects"
                            color="text-orange-500"
                          />

                          <ProjectStatusCount
                            count={client.onHoldProjects}
                            label="On Hold Projects"
                            color="text-gray-500"
                          />

                          <ProjectStatusCount
                            count={client.completedProjects}
                            label="Completed Projects"
                            color="text-purple-600"
                          />
                        </div>
                      </td>

                      <td className="px-4 py-4 text-right">
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
