import { auth } from "@/auth";
import ClientsPage from "@/components/ui/clientpage";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    status?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }
  return <ClientsPage searchParams={searchParams} />;
}
