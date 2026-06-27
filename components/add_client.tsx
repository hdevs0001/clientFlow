"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

import handlesubmit from "@/app/server/client/action";
import { toast } from "sonner";

export default function CreateClientDialog() {
  const [open, setOpen] = useState(false);

  const formAction = async (formData: FormData) => {
    try {
      await handlesubmit(formData);

      toast.success("Client created successfully");

      // Close Dialog
      setOpen(false);

      // Reset Form
      const form = document.getElementById(
        "client-form",
      ) as HTMLFormElement | null;

      form?.reset();
    } catch {
      toast.error("Failed To Create Client Or Client Already Exists");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto p-5 mt-4 bg-blue-800">
          <Plus className="mr-2 h-4 w-4" />
          Client
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold">
            Create New Client
          </DialogTitle>
        </DialogHeader>

        <form id="client-form" action={formAction}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+91 9876543210"
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                placeholder="Acme Inc."
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                name="industry"
                placeholder="Software Development"
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="New York, USA"
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                type="url"
                placeholder="https://example.com"
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                defaultValue="ACTIVE"
                className="h-12 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>
          </div>

          <DialogFooter className="mt-8">
            <Button type="submit" className="w-full sm:w-auto h-12 px-8">
              Save Client
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
