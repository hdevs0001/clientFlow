import RecentProjects from "@/components/ui/recentproject";
import UpcomingTasks from "@/components/ui/upcomingtasks";
import Statuscard from "@/components/ui/statuscard";
import Welcomecard from "@/components/ui/welcomecard";

export default function ProjectCard() {
  return (
    <div className="space-y-6">
      <Welcomecard description="Here's an overview of your freelance business today." />
      <Statuscard />
      <div className="mt-7 flex flex-col gap-6 lg:flex-row">
        <div className="flex-1">
          <RecentProjects />
        </div>

        <div className="w-full lg:w-[320px]">
          <UpcomingTasks />
        </div>
      </div>
    </div>
  );
}
