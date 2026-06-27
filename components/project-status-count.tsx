"use client";

import { Folder } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ProjectStatusCountProps = {
  count: number;
  label: string;
  color: string;
};

export default function ProjectStatusCount({
  count,
  label,
  color,
}: ProjectStatusCountProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex cursor-pointer items-center gap-0.5">
          <Folder className={`h-4 w-4 ${color}`} />
          <span>{count}</span>
        </div>
      </TooltipTrigger>

      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}