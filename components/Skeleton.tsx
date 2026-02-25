function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-muted/70 rounded ${className}`} />;
}
export default Skeleton;
