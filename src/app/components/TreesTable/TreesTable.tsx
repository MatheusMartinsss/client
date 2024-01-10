import { Box, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TableSortLabel, TableFooter, TablePagination } from "@mui/material"
import React from "react";
import { ITree } from "@/types/tree/tree";

interface TreesTableProps {
    data: ITree[]
    order?: "asc" | "desc"
    orderBy?: string
    page: number
    count: number
    rowsPerPage: number
    onRequestPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
    onRequestLimitChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
const colummns = [{
    id: 'code', label: 'Arvore', sortable: true
}, {
    id: 'scientificName', label: 'Nome Cientifico', sortable: true
}, {
    id: 'commonName', label: 'Nome Popular', sortable: true
}, {
    id: 'meters', label: 'meters', sortable: true
}, {
    id: 'volumeM3', label: 'M3', sortable: true
}]



export const TreesTable = ({ data, order, orderBy, onRequestPageChange, onRequestLimitChange, page, count, rowsPerPage }: TreesTableProps) => {
    return (
        data?.length ? (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }} >
                <TableContainer sx={{
                    marginTop: 2,
                    overflowY: 'auto',
                    height: 450,
                }}>
                    <Table >
                        <TableHead sx={{ backgroundColor: '#f0f0f0', position: 'sticky', top: 0 }} >
                            <TableRow>
                                {colummns.map((colum) => {
                                    const isSortable = colum.sortable
                                    const isSelected = orderBy === colum.id
                                    return (
                                        <TableCell
                                            key={colum.id}
                                            sortDirection={isSelected ? order : false}
                                        >
                                            {isSortable ?
                                                <TableSortLabel
                                                    active={isSelected}
                                                    direction={isSelected ? order : 'asc'}
                                                //  onClick={() => {
                                                //     handleSortChange(colum.id)
                                                //</TableCell>  }}
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
                        <TableBody >
                            {data.map((row) => {
                                return (
                                    <TableRow
                                        key={row.id}
                                        role="checkbox"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{row.code}</TableCell>
                                        <TableCell>{row.scientificName}</TableCell>
                                        <TableCell>{row.commonName}</TableCell>
                                        <TableCell>{row.meters}</TableCell>
                                        <TableCell>{row.volumeM3}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>

                    </Table>
                </TableContainer>
                <TablePagination
                    component='div'
                    count={count}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={onRequestPageChange}
                    onRowsPerPageChange={onRequestLimitChange}
                

                />
            </Box>
        ) : (
            <Box
                component={Paper}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                    marginTop: '16px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    background: '#f0f0f0',
                    minHeight: '350px',
                }}
            >
                <Typography variant="h5" color="#555555">Nenhum item encontrado!</Typography>
            </Box>
        )
    )
}
export default TreesTable