"use client"
import { Box, Button, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import TableCellDate from "../../TableCellDate/TableCellDate"
import { IItem } from "@/types/items/item"
import { useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface ItemsTableProps {
    items: IItem[];
    handleConfirm: (items: IItem[]) => void
    handleModal: () => void
}

export const ItemsSearchTable = ({ items, handleConfirm, handleModal }: ItemsTableProps) => {
    const [itemsSelected, setItemSelected] = useState<IItem[]>([])


    const SelectItem = (item: IItem) => {
        const itemIsSelected = isSelected(item.id)
        if (itemIsSelected) {
            const newState = itemsSelected.filter((items) => items.id !== item.id)
            setItemSelected([...newState])
        } else {
            setItemSelected([...itemsSelected, item])
        }
    }

    const isSelected = (id: number | undefined) => {
        return itemsSelected.some((selectedItem) => selectedItem.id === id);
    };

    const volumeTotal = items.reduce((a, b) => {
        return a + b.volumeM3
    }, 0.00).toFixed(3)

    const itemsSelectedVolume = itemsSelected.reduce((a, b) => {
        return a + b.volumeM3
    }, 0.00).toFixed(3)

    const handleItems = () => {
        handleConfirm(itemsSelected)
        handleModal()
    }

    return (
        items.length ? (
            <Box >
                <Box
                    mt={2}
                    padding={2}
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    sx={{ backgroundColor: '#f0f0f0' }}
                >
                    {itemsSelected.length > 0 ? (
                        <>
                            <Typography>{itemsSelected.length} Selecionados</Typography>
                            <IconButton
                                size="small"
                                onClick={() => setItemSelected([])}
                            >
                                <DeleteOutlineIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6" fontWeight='bolder'>Items</Typography>
                        </>
                    )}

                </Box>
                <TableContainer sx={{
                    overflowY: 'auto',
                    height: 450
                }}>
                    <Table >
                        <TableHead sx={{ backgroundColor: '#f0f0f0', position: 'sticky', top: 0 }} >
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Plaqueta</TableCell>
                                <TableCell>Produto</TableCell>
                                <TableCell>D1</TableCell>
                                <TableCell>D2</TableCell>
                                <TableCell>D3</TableCell>
                                <TableCell>D4</TableCell>
                                <TableCell>Comprimento</TableCell>
                                <TableCell>M3</TableCell>
                                <TableCell>Entrada</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {items.map((row) => {
                                const itemIsSelected = isSelected(row.id)
                                return (
                                    <TableRow
                                        onClick={() => SelectItem(row)}
                                        selected={itemIsSelected}
                                        key={row.id}
                                        tabIndex={-1}
                                        role="checkbox"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}

                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={itemIsSelected}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row">{row.code}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.d1}</TableCell>
                                        <TableCell>{row.d2}</TableCell>
                                        <TableCell>{row.d3}</TableCell>
                                        <TableCell>{row.d4}</TableCell>
                                        <TableCell>{row.meters}</TableCell>
                                        <TableCell>{row.volumeM3}</TableCell>
                                        <TableCellDate date={row.createdAt} />
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    display='flex'
                    alignItems='center'
                    padding={2}
                    sx={{ height: 80, backgroundColor: '#f0f0f0' }} >

                    <Box display='flex' width='100%' sx={{ justifyContent: 'flex-end' }}>
                        <Typography variant="subtitle1" fontWeight='bolder'>Volume {volumeTotal}M3</Typography>
                    </Box>
                </Box>
                <Box
                    display='flex'
                    width='100%'
                    sx={{ justifyContent: 'flex-end', padding: 2 }}
                >
                    <Button
                        variant='contained'
                        disabled={itemsSelected.length === 0}
                        onClick={handleItems}

                    >
                        Confirmar - {itemsSelectedVolume}M3
                    </Button>
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
export default ItemsSearchTable