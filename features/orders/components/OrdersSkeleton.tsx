import Skeleton from "@/components/Skeleton";

export default function OrdersSkeleton({ rows = 5 }) {
  return (
    <div className=" flex flex-col gap-4">
      <div className="animate-pulse bg-muted/70 h-6 w-40 rounded-md" />
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="rounded-md border">
          <div
            className={`bg-muted/40 rounded flex justify-between items-center p-3 gap-6`}
          >
            <Skeleton className="w-11 h-8" />
            <Skeleton className="w-40 h-8" />
            <Skeleton className="w-30 h-8" />
            <Skeleton className="w-12 h-8" />
          </div>
        </div>
      ))}
    </div>
  );
}
