import {
  ChartGantt,
  CircleCheckBig,
  CirclePause,
  Folder,
  FolderOpenDot,
  LucideIcon,
} from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { getDashboardData } from "@/app/server/dashboard/queries";
interface Card {
  title: string;
  value: number;
  icons: React.ReactNode;
}

export default async function Statuscard() {
  const stats = await getDashboardData();
  const cards: Card[] = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icons: <Folder className="h-5 w-5 text-violet-700 fill-violet-700" />,
    },
    { title: "Active", value: stats.activeProjects, icons: <FolderOpenDot className="h-5 w-5 text-blue-700 " /> },
    {
      title: "On Hold",
      value: stats.onHoldProjects,
      icons: (
        <CirclePause className="h-5 w-5 text-blue-700 " />
      ),
    },
    {
      title: "Planning",
      value: stats.planningProjects,
      icons: <ChartGantt className="h-5 w-5 text-violet-700 " />,
    },
    {
      title: "Completed",
      value: stats.completedProjects,
      icons: (
        <CircleCheckBig className="h-5 w-5 text-green-700 " />
      ),
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
      {cards.map((item) => (
        <MagicCard
          key={item.title}
          className="w-full rounded-2xl p-4 bg-white"
          gradientColor="#E9E5FF"
        >
          <div className="flex justify-between items-start">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
              {item.icons}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-slate-600">{item.title}</p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {item.value}
            </h2>
          </div>
        </MagicCard>
      ))}
    </div>
  );
}
