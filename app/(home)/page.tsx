"use client";
import AppBarChart from "@/features/dashboard/components/AppBarchart";
import { AppPieChart } from "@/features/dashboard/components/AppPieChart";
import AppAreaChart from "@/features/dashboard/components/AppAreaChart";
import LatestProductList from "@/features/products/components/LatestProductList";
import LatestOrders from "@/features/orders/components/LatestOrders";
import PopulateProductList from "@/features/products/components/PopulateProductList";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 text-right">
      {/* <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart />
      </div> */}
      <div className="bg-primary-foreground p-4 rounded-lg">
        <LatestOrders />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>

      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <PopulateProductList />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <LatestProductList />
      </div>
    </div>
  );
}
