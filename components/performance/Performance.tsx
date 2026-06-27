import Headingcard from "../ui/headingcard";
import Cards from "./performanceComponent/Cards";
import CardsData, {
  PieChart,
  RevenueAreaChart,
} from "@/app/server/performance/Queries";
import { ChartAreaInteractive } from "./performanceComponent/Areachart";
import { ChartPieLabelList } from "./performanceComponent/Piechart";

export default async function PerformancePage() {
  const dataForCards = await CardsData();
  const dataforcharts = await RevenueAreaChart();
  const dataforpiechart = await PieChart();
  return (
    <div>
      <Headingcard
        title="Performance Analytics"
        description="Track your freelance business metrics and project health"
      />
      <div className="mb-4 ">
        <Cards data={dataForCards} />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-10">
          <div className="lg:col-span-7">
            <ChartAreaInteractive data={dataforcharts} />
          </div>

          <div className="lg:col-span-3 mt-4">
            <ChartPieLabelList data={dataforpiechart} />
          </div>
        </div>
      </div>
    </div>
  );
}
