import { Folder, FolderOpenDot, Form, ScrollText, Wallet } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import CardsData from "@/app/server/performance/Queries";

// TOTAL REVENUE,OUTSTANDING INVOICES,ACTIVE PROJECT , TASK
// COMPLETION RATE
type CardsDataType = Awaited<ReturnType<typeof CardsData>>;
export default async function Cards({ data }: { data: CardsDataType }) {
  const cards = [
    {
      title: "Total Revenue",
      value: `₹${data.totalRevenue}`,
      icon: <Wallet color="blue" />,
      subtitle: "",
    },
    {
      title: "Outstanding Invoices",
      value:`₹${data.outstandingRevenue}`,
      icon: <ScrollText color="blue" />,
      subtitle: `${data.unpaidInvoices} unpaid invoices`,
    },
    {
      title: "Active Project",
      value: data.activeProjects,
      icon: <FolderOpenDot color="blue" />,
      subtitle: `${data.dueThisWeek} due this week`,
    },
    {
      title: "Task Completetion Rate",
      value: `${data.completionRate}%`,
      icon: <Form color="blue" />,
      subtitle: `${data.completedTasks}/${data.totalTasks} tasks completed`,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
      {cards.map((item) => (
        <MagicCard
          key={item.title}
          className="w-full rounded-2xl p-4 bg-white"
          gradientColor="#E9E5FF"
        >
          <div className="flex justify-between items-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
              {item.icon}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-bold  text-slate-600">{item.title}</p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              {item.value}
            </h2>
          </div>
          <div className="p-2 font-mono ">{item.subtitle}</div>
        </MagicCard>
      ))}
    </div>
  );
}
