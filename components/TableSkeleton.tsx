import Skeleton from "./Skeleton";

export default function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="rounded-md border">
          <div
            className={` bg-muted/30 rounded flex justify-between items-center p-3 gap-10`}
          >
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="w-60 h-10" />
            <Skeleton className="w-40 h-10" />
            <Skeleton className="w-30 h-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
