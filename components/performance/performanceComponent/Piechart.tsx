"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Sector } from "recharts";
import type { PieSectorShapeProps } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  visitors: {
    label: "Invoices",
  },
  PAID: {
    label: "PAID",
    color: "#93C5FD",
  },
  UNPAID: {
    label: "UNPAID",
    color: "#60A5FA",
  },
  CANCELLED: {
    label: "CANCELLED",
    color: "#1D4ED8",
  },
} satisfies ChartConfig;

const ACTIVE_INDEX = 0;

type InvoiceStatusData = {
  status: string;
  _count: {
    status: number;
  };
};

type InvoiceStatusCounts = InvoiceStatusData[];

export function ChartPieLabelList({ data }: { data: InvoiceStatusCounts }) {
  const statusColors: Record<string, string> = {
    PAID: "#93C5FD",
    UNPAID: "#60A5FA",
    CANCELLED: "#1D4ED8",
  };

  const chartData = data.map((item) => ({
    status: item.status,
    visitors: item._count.status,
    fill: statusColors[item.status] ?? "#2563EB",
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Invoice Status Distribution</CardTitle>
        <CardDescription>All invoices</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="status"
              innerRadius={70}
              outerRadius={100}
              strokeWidth={5}
              isAnimationActive
              animationDuration={800}
              animationEasing="ease-out"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Invoice status overview
          <TrendingUp className="h-4 w-4" />
        </div>

        <div className="leading-none text-muted-foreground">
          Distribution of paid, unpaid and cancelled invoices
        </div>
      </CardFooter>
    </Card>
  );
}
