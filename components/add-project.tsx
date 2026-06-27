"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { createProject } from "@/app/server/project/action";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

type Client = {
  id: string;
  name: string;
};

interface CreateProjectDialogProps {
  clients: Client[];
}

export default function CreateProjectDialog({
  clients,
}: CreateProjectDialogProps) {
  const [open, setOpen] = useState(false);

  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("PLANNING");
  const [priority, setPriority] = useState("MEDIUM");

  const formRef = useRef<HTMLFormElement>(null);

  const formAction = async (formData: FormData) => {
    try {
      const data = await createProject(formData);

      toast.success("Project created successfully");

      setOpen(false);
      formRef.current?.reset();

      setClientId("");
      setStatus("PLANNING");
      setPriority("MEDIUM");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create project");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto p-5 mt-4 bg-blue-800">
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create New Project
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new project.
          </DialogDescription>
        </DialogHeader>

        <form
          ref={formRef}
          action={formAction}
          id="project-form"
          className="space-y-6"
        >
          {/* Hidden inputs for Shadcn Select */}
          <input type="hidden" name="clientId" value={clientId} />
          <input type="hidden" name="status" value={status} />
          <input type="hidden" name="priority" value={priority} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="E-commerce Website"
                className="h-12"
                required
              />
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                name="budget"
                type="number"
                placeholder="50000"
                className="h-12"
                required
              />
            </div>

            {/* Description */}

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the project..."
                className="min-h-[120px]"
                required
              />
            </div>

            {/* Client */}
            <div className="space-y-2">
              <Label>Client</Label>

              <Select value={clientId} onValueChange={setClientId}>
                <SelectTrigger className="h-12 w-full">
                  <SelectValue placeholder="Select Client" />
                </SelectTrigger>

                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                name="deadline"
                type="date"
                className="h-12"
                required
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>

              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="h-12 w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                  <SelectItem value="PLANNING">PLANNING</SelectItem>
                  <SelectItem value="ON_HOLD">ON_HOLD</SelectItem>
                  <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label>Priority</Label>

              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="h-12 w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="LOW">LOW</SelectItem>
                  <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                  <SelectItem value="HIGH">HIGH</SelectItem>
                  <SelectItem value="URGENT">URGENT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full sm:w-auto h-12 px-8 bg-blue-800"
            >
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
