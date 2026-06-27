"use client";

import { useState, useTransition } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

import { deleteTask } from "@/app/server/task/action";
import { updateTask } from "@/app/server/task/action";

interface TaskActionsProps {
  task: {
    id: string;
    title: string;
    description: string;
    status: string;
  };
}

export default function TaskActions({ task }: TaskActionsProps) {
  const [isPending, startTransition] = useTransition();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleUpdate = () => {
    startTransition(async () => {
      const result = await updateTask({
        taskId: task.id,
        title,
        description,
        status,
      });

      if (result.success) {
        toast.success(result.message);
        setEditOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteTask(task.id);

      if (result.success) {
        toast.success(result.message);
        setDeleteOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <MoreVertical className="h-4 w-4 text-zinc-500" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Task
                </DropdownMenuItem>
              </DialogTrigger>

              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="text-red-500"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Task
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* DELETE */}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Task?</AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* EDIT */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />

            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="TODO">TODO</SelectItem>

                <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>

                <SelectItem value="COMPLETED">COMPLETED</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={handleUpdate}
              disabled={isPending}
              className="w-full"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
