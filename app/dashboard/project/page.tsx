import { auth } from "@/auth";
import ProjectsDashboard from "@/components/ui/projectpage";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    status?: string;
  }>;
};

export default async function page({ searchParams }: Props) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }
  return (
    <div>
      <ProjectsDashboard searchParams={searchParams} />
    </div>
  );
}
