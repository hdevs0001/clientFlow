"use client";

import { Circle, CircleCheck } from "lucide-react";
import { toggleTaskStatus } from "@/app/server/task/action";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface CheckButtonProps {
  taskId: string;
  status: "TODO" | "IN_PROGRESS" | "COMPLETED";
}

export default function CheckButton({
  taskId,
  status,
}: CheckButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = () => {
    startTransition(async () => {
      await toggleTaskStatus(taskId);
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="cursor-pointer"
    >
      {status === "COMPLETED" ? (
        <CircleCheck
          fill="blue"
          color="white"
          className="h-5 w-5"
        />
      ) : (
        <Circle className="h-5 w-5" />
      )}
    </button>
  );
}