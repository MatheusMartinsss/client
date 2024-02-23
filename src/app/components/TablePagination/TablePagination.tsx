import useFilterUpdater from "@/utils/hooks/useFilterUpdate";
import { TablePagination, TablePaginationProps } from "@mui/material";
import { useSearchParams } from "next/navigation";

type PaginationProps = {
    count: number
} & Partial<TablePaginationProps>

export const Pagination = ({ count, ...rest }: PaginationProps) => {
    const searchParams = useSearchParams()
    const updateFilters = useFilterUpdater()
    const page = Number(searchParams.get('page')) || 0
    const rowsPerPage = Number(searchParams.get('rows')) || 10
    return (
        <TablePagination
            {...rest}
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(_, page) => updateFilters('page', page.toString())}
            onRowsPerPageChange={(e) => updateFilters('rows', e.target.value.toString())}
        />
    )
}