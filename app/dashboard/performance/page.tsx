
// MAKE A GOOD WORK FL0W :=
// 1. IMPORT THE COMPONENT FROM COMPONENT AND FORM THE PERFORMANCE 

import { auth } from "@/auth";
import PerformancePage from "@/components/performance/Performance";
import { redirect } from "next/navigation";

// 2. THEN IN THE COMPONET IMPORT THE OTHER COMPONENT FOR THE SAME FOLDER IN THE COMPONENT THE PERFORMANCE THE PERFORMANCE COMOPONENT
export default async function page() {
    const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }
  return (
    <div>
     <PerformancePage/>
    </div>
  )
}
