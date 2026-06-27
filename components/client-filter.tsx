"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ClientFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus =
    searchParams.get("status") ?? "ALL";

const pathname = usePathname();

function setFilter(status: string) {
  const params = new URLSearchParams(searchParams);

  if (status === "ALL") {
    params.delete("status");
  } else {
    params.set("status", status);
  }

  router.push(`${pathname}?${params.toString()}`);
}
  return (
    <div className="rounded-xl border bg-background p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={currentStatus === "ALL" ? "default" : "outline"}
            onClick={() => setFilter("ALL")}
          >
            All Clients
          </Button>

          <Button
            size="sm"
            variant={currentStatus === "ACTIVE" ? "default" : "outline"}
            onClick={() => setFilter("ACTIVE")}
          >
            Active
          </Button>

          <Button
            size="sm"
            variant={currentStatus === "INACTIVE" ? "default" : "outline"}
            onClick={() => setFilter("INACTIVE")}
          >
            Inactive
          </Button>
        </div>
      </div>
    </div>
  );
}
