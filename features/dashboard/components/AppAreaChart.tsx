"use client";
import Spinner from "@/components/Spinner";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useGetMonthlySales } from "@/features/payments/hooks/useGetMonthlySales";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import AppAreaChartSkeleton from "./AppAreaChartSkeleton";

const chartConfig = {
  totalAmountSales: {
    label: "مجموع فروش ماهانه",
    color: "var(--chart-2)",
  },
  totalSales: {
    label: "تعداد فروش در ماه ",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const AppAreaChart = () => {
  const { sales, isLoading } = useGetMonthlySales();
  if (isLoading) return <AppAreaChartSkeleton />;

  return (
    <div className="overflow-x-auto">
      <h1 className="text-lg font-medium mb-6">نمودار فروش ماهانه </h1>
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] overflow-x-auto"
      >
        <AreaChart data={sales}>
          <CartesianGrid />

          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />

          <YAxis
            yAxisId="left"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />

          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />

          <Area
            yAxisId="left"
            dataKey="totalAmountSales"
            type="natural"
            fill="var(--chart-1)"
            stroke="var(--chart-1)"
            fillOpacity={0.4}
          />
          <Area
            yAxisId="left"
            dataKey="totalSales"
            type="natural"
            fill="var(--chart-2)"
            stroke="var(--chart-2)"
            fillOpacity={0.4}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default AppAreaChart;
