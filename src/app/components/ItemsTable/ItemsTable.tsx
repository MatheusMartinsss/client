import { IItem } from "@/types/items/item"
import { Box, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TableSortLabel, TableFooter, TablePagination } from "@mui/material"
import TableCellDate from "../TableCellDate/TableCellDate"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React from "react";
import useFilterUpdater from "@/utils/hooks/useFilterUpdate";
import { useSearchParams } from "next/navigation";
import { Pagination } from "../TablePagination/TablePagination";
interface ItemsTableProps {
    items: IItem[]
    handleSelectItem: (item: IItem) => void
    itemsSelected: IItem[]
    clearItemsSelected: () => void
    count?: number | 1
}
const colummns = [{
    id: '', label: '#', sortable: false,
}, {
    id: 'code', label: 'Plaqueta', sortable: true
}, {
    id: 'scientificName', label: 'Cientifico', sortable: true
}, {
    id: 'commonName', label: 'Popular', sortable: true
}, {
    id: 'section', label: 'Secção', sortable: true
}, {
    id: 'd1', label: 'D1', sortable: true
}, {
    id: 'd2', label: 'D2', sortable: true
}, {
    id: 'd3', label: 'D3', sortable: true
}, {
    id: 'd4', label: 'D4', sortable: true
}, {
    id: 'meters', label: 'meters', sortable: true
}, {
    id: 'volumeM3', label: 'M3', sortable: true
}, {
    id: 'createdAt', label: 'Entrada', sortable: true
}, {
    id: 'archivedAt', label: 'Saida', sortable: true
}]


export const ItemsTable = ({
    items,
    handleSelectItem,
    itemsSelected,
    clearItemsSelected,
    count = 1
}: ItemsTableProps) => {
    const searchParams = useSearchParams()
    const updateFilters = useFilterUpdater()

    const orderBy = searchParams.get('orderBy') ?? ''
    const order: 'asc' | 'desc' = (searchParams.get('order') as 'asc' | 'desc') ?? 'asc';

    const SelectItem = (item: IItem) => {
        handleSelectItem(item)
    }
    const isSelected = (id: number | undefined) => {
        return itemsSelected?.some((selectedItem) => selectedItem.id === id);
    };
    const volumeTotal = items?.reduce((a, b) => {
        return a + b.volumeM3
    }, 0.00).toFixed(3)

    const sortChange = (key: string) => {
        updateFilters('orderBy', key)
    }
    return (
        items.length ? (
            <TableContainer
                sx={{
                    height: '600px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    borderRadius: '16px',
                }}
            >
                <Table
                    size="medium"
                >
                    <TableHead
                        sx={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 999
                        }}>
                        <TableRow >
                            {colummns.map((colum) => {
                                const isSortable = colum.sortable
                                const isSelected = colum.id === orderBy
                                return (
                                    <TableCell
                                        key={colum.id}
                                        sortDirection={order}
                                        align="center"
                                        sx={{
                                            fontSize: 'bolder',
                                            color: 'white'
                                        }}
                                    >
                                        {isSortable ?
                                            <TableSortLabel
                                                active={isSelected}
                                                direction={order}
                                                onClick={() => {
                                                    sortChange(colum.id)
                                                }}
                                            >
                                                {colum.label}
                                            </TableSortLabel>
                                            : (colum.label)
                                        }
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody
                        sx={{
                            height: '100%',
                            flexGrow: 1
                        }}
                    >
                        {items.map((row) => {
                            const itemIsSelected = isSelected(row.id)
                            return (
                                <TableRow
                                    onClick={() => SelectItem(row)}
                                    key={row.id}
                                    selected={itemIsSelected}

                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={itemIsSelected}
                                        />
                                    </TableCell>
                                    <TableCell align="center" >{row.code}</TableCell>
                                    <TableCell align="center">{row.scientificName}</TableCell>
                                    <TableCell align="center">{row.commonName}</TableCell>
                                    <TableCell align="center">{row.section}</TableCell>
                                    <TableCell align="center">{row.d1}</TableCell>
                                    <TableCell align="center">{row.d2}</TableCell>
                                    <TableCell align="center">{row.d3}</TableCell>
                                    <TableCell align="center">{row.d4}</TableCell>
                                    <TableCell align="center">{row.meters}</TableCell>
                                    <TableCell align="center">{row.volumeM3}</TableCell>
                                    <TableCellDate date={row.createdAt} />
                                    <TableCellDate date={row.archivedAt} />
                                </TableRow>
                            )
                        })}
                    </TableBody>
                    <TableFooter sx={{
                        position: 'sticky',
                        bottom: 0,
                        zIndex: 999
                    }}>
                        <TableRow>
                            <Pagination
                                colSpan={13}
                                count={count}

                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        ) : (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width='100%'
                sx={{
                    marginTop: '16px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    background: '#f0f0f0',
                    minHeight: '550px',
                    height: '100%'
                }}
            >
                <Typography variant="h5" color="#555555">Nenhum item encontrado!</Typography>
            </Box>
        )
    )
}
export default ItemsTable