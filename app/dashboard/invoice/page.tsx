import { auth } from "@/auth";
import InvoicingDashboard from "@/components/ui/invoicepage";
import { redirect } from "next/navigation";


export default async  function page() {
    const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }
  return (
    <div>
     <InvoicingDashboard/>
    </div>
  )
}
