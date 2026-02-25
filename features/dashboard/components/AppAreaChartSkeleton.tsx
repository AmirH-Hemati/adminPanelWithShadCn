import Skeleton from "@/components/Skeleton";

export default function AppAreaChartSkeleton() {
  return (
    <div className="flex flex-col h-[500px] gap-4 bg-muted/40 p-4 rounded-md  w-full">
      <div className="animate-pulse bg-muted/70 h-6 w-48 rounded-md" />

      <Skeleton className="w-full h-full rounded-md" />
    </div>
  );
}
