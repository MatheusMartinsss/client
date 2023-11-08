import { IItem } from "@/types/items/item"
import { Box, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TableSortLabel } from "@mui/material"
import TableCellDate from "../TableCellDate/TableCellDate"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React from "react";

interface ItemsTableProps {
    items: IItem[]
    handleSelectItem: (item: IItem) => void
    itemsSelected: IItem[]
    clearItemsSelected: () => void
    handleSortChange: (key: string) => void
    order?: "asc" | "desc"
    orderBy?: string
}
const colummns = [{
    id: '', label: '#', sortable: false,
}, {
    id: 'code', label: 'Plaqueta', sortable: true
}, {
    id: 'scientificName', label: 'Nome Cientifico', sortable: true
}, {
    id: 'commonName', label: 'Nome Popular', sortable: true
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


export const ItemsTable = ({ items, handleSelectItem, itemsSelected, clearItemsSelected, order, orderBy, handleSortChange }: ItemsTableProps) => {


    const SelectItem = (item: IItem) => {
        handleSelectItem(item)
    }
    const isSelected = (id: number | undefined) => {
        return itemsSelected?.some((selectedItem) => selectedItem.id === id);
    };

    const itemsSelectedVolume = itemsSelected.reduce((a, b) => {
        return a + b.volumeM3
    }, 0.00).toFixed(3)

    const volumeTotal = items?.reduce((a, b) => {
        return a + b.volumeM3
    }, 0.00).toFixed(3)

    return (
        items?.length ? (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }} >
                {itemsSelected.length > 0 &&
                    <Box
                        mt={2}
                        padding={2}
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        sx={{ backgroundColor: '#f0f0f0' }}
                    >
                        <>
                            <Typography>{itemsSelected.length} Selecionados</Typography>
                            <IconButton
                                size="small"
                                onClick={clearItemsSelected}
                            >
                                <DeleteOutlineIcon />
                            </IconButton>
                        </>
                    </Box>
                }
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
                                                    onClick={() => {
                                                        handleSortChange(colum.id)
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
                        <TableBody >
                            {items.map((row) => {
                                const itemIsSelected = isSelected(row.id)
                                return (
                                    <TableRow
                                        onClick={() => SelectItem(row)}
                                        key={row.id}
                                        selected={itemIsSelected}
                                        role="checkbox"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={itemIsSelected}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row">{row.code}</TableCell>
                                        <TableCell>{row.scientificName}</TableCell>
                                        <TableCell>{row.commonName}</TableCell>
                                        <TableCell>{row.section}</TableCell>
                                        <TableCell>{row.d1}</TableCell>
                                        <TableCell>{row.d2}</TableCell>
                                        <TableCell>{row.d3}</TableCell>
                                        <TableCell>{row.d4}</TableCell>
                                        <TableCell>{row.meters}</TableCell>
                                        <TableCell>{row.volumeM3}</TableCell>
                                        <TableCellDate date={row.createdAt} />
                                        <TableCellDate date={row.archivedAt} />
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    display='flex'
                    justifyContent='flex-end'
                    paddingLeft={5}
                    paddingRight={5}
                    sx={{ height: 80, mt: 2 }} >

                    <Box display='flex' sx={{ justifyContent: 'flex-end' }}>
                        <Typography variant="subtitle1">Volume {volumeTotal}M3</Typography>
                    </Box>
                </Box>
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
export default ItemsTable