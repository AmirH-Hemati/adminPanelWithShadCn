import { DataTable } from "@/components/DataTable";
import TableSkeleton from "@/components/TableSkeleton";
import { columns } from "@/features/comments/components/columns";
import { useGetComments } from "@/features/comments/hooks/useGetComments";
export default function CommentsTable() {
  const { commetns, isLoading } = useGetComments();
  if (isLoading) {
    return <TableSkeleton rows={7} />;
  }
  return <DataTable columns={columns} data={commetns} />;
}
