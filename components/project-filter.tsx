"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function ProjectFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") ?? "ALL";
  const pathname = usePathname();

  function setProjectFilter(status: string) {
    const params = new URLSearchParams(searchParams);
    if (status === "ALL") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    router.push(`${pathname}?${params.toString()}`);
  }
  const buttonStyle = (status: string) =>
    `px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 ease-out transform
   ${
     currentStatus === status
       ? "bg-white shadow-sm text-indigo-700 scale-105"
       : "text-slate-600 hover:bg-white/50 hover:text-slate-800"
   }`;

  return (
    <div className="inline-flex items-start gap-1 bg-slate-100/80 p-1 rounded-xl">
      <button
        className={buttonStyle("ALL")}
        onClick={() => setProjectFilter("ALL")}
      >
        All
      </button>

      <button
        className={buttonStyle("ACTIVE")}
        onClick={() => setProjectFilter("ACTIVE")}
      >
        Active
      </button>

      <button
        className={buttonStyle("PLANNING")}
        onClick={() => setProjectFilter("PLANNING")}
      >
        Planning
      </button>

      <button
        className={buttonStyle("ON_HOLD")}
        onClick={() => setProjectFilter("ON_HOLD")}
      >
        On Hold
      </button>

      <button
        className={buttonStyle("COMPLETED")}
        onClick={() => setProjectFilter("COMPLETED")}
      >
        Completed
      </button>
    </div>
  );
}
