import { auth } from "@/auth";
import TaskDashboard from "@/components/ui/taskpage";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }
  return (
    <div>
      <TaskDashboard />
    </div>
  );
}
