"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Cell, Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetPaymentStatus } from "@/features/payments/hooks/useGetPaymentStatus";
import Spinner from "@/components/Spinner";
import PieSkeleton from "./PieSkeleton";

export const description = "A donut chart with text";

const chartConfig = {
  pending: {
    label: "pending",
    color: "var(--chart-5)",
  },
  success: {
    label: "success",
    color: "var(--chart-2)",
  },
  failed: {
    label: "failed",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

type OrderStatus = "pending" | "success" | "failed";

export function AppPieChart() {
  const { payments, isLoading } = useGetPaymentStatus();
  if (isLoading) return <PieSkeleton />;
  return (
    <div>
      <h1 className="text-lg font-medium mb-6">وضعیت پرداخت ها</h1>

      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={payments}
            dataKey="count"
            nameKey="status"
            innerRadius={60}
            strokeWidth={5}
          >
            {payments.map((item: { status: OrderStatus }, i: number) => (
              <Cell key={i} fill={chartConfig[item.status].color} />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-muted-foreground"
                    >
                      وضعیت
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <div className="mt-4 flex flex-col gap-2 items-center">
        <p className="flex items-center gap-3 font-medium text-sm leading-none">
          وضعیت پرداخت های اخیر محصولات
          <TrendingUp className="h-4 w-4 text-green-500" />
        </p>
        <div className="leading-none md:block hidden text-muted-foreground text-center text-xs">
          بررسی اجمالی و تعداد پرداخت های اخیر موفق و ناموفق و لغو شده
        </div>
      </div>
    </div>
  );
}
