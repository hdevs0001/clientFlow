"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { addTask } from "@/app/server/task/action";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
interface AddTaskDialogProps {
  projectId: string;
}

export default function AddTaskDialog({ projectId }: AddTaskDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-blue-700 cursor-pointer rounded-full h-6 w-6 flex items-center justify-center">
          <Plus className="h-4 w-4 text-white transition-transform duration-150 hover:rotate-180" />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Create a new task for this project.
          </DialogDescription>
        </DialogHeader>

        <form
          action={(formData) =>
            startTransition(async () => {
              const result = await addTask(formData);

              if (result.success) {
                toast.success(result.message);
                setOpen(false);
              } else {
                toast.error(result.message);
              }
            })
          }
          className="space-y-4"
        >
          <input type="hidden" name="projectId" value={projectId} />

          <div className="space-y-2">
            <Label>Title</Label>
            <Input name="title" placeholder="Task title" required />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Input name="description" placeholder="Task description" required />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>

            <Select name="status" defaultValue="TODO">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="TODO">TODO</SelectItem>

                <SelectItem value="IN_PROGRESS">IN PROGRESS</SelectItem>

                <SelectItem value="COMPLETED">COMPLETED</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Creating..." : "Create Task"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
