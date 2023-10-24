"use client"
import { Box, Button, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import TableCellDate from "../../TableCellDate/TableCellDate"
import { IItem } from "@/types/items/item"
import { useEffect, useRef, useState } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IProduct } from "@/types/product/product";

interface ProductsTableProps {
    products: IProduct[];
    onSelect: (product: IProduct) => void
    handleModal: () => void
}

export const ProductsTable = ({ products, onSelect, handleModal }: ProductsTableProps) => {
    const tableRef = useRef<HTMLDivElement | null>(null);
    const firstRowRef = useRef<HTMLTableRowElement | null>(null);
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1);

    useEffect(() => {
        if (firstRowRef.current) {
            firstRowRef.current.focus();
            setSelectedRowIndex(0);
        }
    }, []);

    const handleSelect = (product: IProduct) => {
        onSelect(product)
        handleModal()
    }
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (selectedRowIndex < products.length - 1) {
                setSelectedRowIndex(selectedRowIndex + 1);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (selectedRowIndex > 0) {
                setSelectedRowIndex(selectedRowIndex - 1);
            }
        } else if (e.key === 'Enter' && selectedRowIndex >= 0) {
            handleSelect(products[selectedRowIndex]);
        }
    };

    return (
        <Box width='950px' height='650px'>
            <TableContainer
                ref={tableRef}
                onKeyDown={handleKeyDown}
                sx={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    height: 450
                }}>
                <Table >
                    <TableHead sx={{ backgroundColor: '#f0f0f0', position: 'sticky', top: 0, zIndex: 999 }} >
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Produto</TableCell>
                            <TableCell>Descrição</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {products.length > 0 ?
                            (products.map((row, index) => {
                                return (
                                    <TableRow
                                        ref={index === 0 ? firstRowRef : null}
                                        onClick={() => handleSelect(row)}
                                        key={row.id}
                                        tabIndex={-1}
                                        role="checkbox"
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            cursor: 'pointer',
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',
                                            },
                                            backgroundColor: index === selectedRowIndex ? '#f5f5f5' : 'transparent',
                                        }}

                                    >
                                        <TableCell component="th" scope="row">{row.id}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                    </TableRow>
                                )
                            })) : (
                                <TableRow>
                                    <TableCell colSpan={10}>
                                        <Box
                                            component={Paper}
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            sx={{
                                                marginTop: '16px',
                                                borderRadius: '8px',
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',

                                                minHeight: '350px',
                                            }}
                                        >
                                            <Typography variant="h5" color="#555555">
                                                Nenhum produto encontrado!
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
export default ProductsTable