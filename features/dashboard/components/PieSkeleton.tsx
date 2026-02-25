import Skeleton from "@/components/Skeleton";

export default function PieSkeleton() {
  return (
    <div className=" flex flex-col gap-4 bg-muted/40 p-2 rounded-md h-full w-full">
      <div className="animate-pulse bg-muted/70 h-6 w-40 rounded-md" />

      <div className={`flex flex-col justify-center items-center p-3 gap-4`}>
        <Skeleton className="h-50 w-50 rounded-full" />
        <Skeleton className="w-60 h-6" />
        <Skeleton className="w-80 h-6" />
      </div>
    </div>
  );
}
