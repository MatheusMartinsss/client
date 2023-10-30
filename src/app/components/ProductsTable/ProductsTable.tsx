import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import TableCellDate from "../TableCellDate/TableCellDate"
import { IProduct } from "@/types/product/product"

interface ProductsTableProps {
    products: IProduct[]
}

export const ProductsTable = ({ products }: ProductsTableProps) => {
    return (
        products.length ? (
            <Box >
                <TableContainer sx={{
                    marginTop: 2,
                    overflowY: 'auto',
                    height: 450
                }}>
                    <Table >
                        <TableHead sx={{ backgroundColor: '#f0f0f0', position: 'sticky', top: 0 }} >
                            <TableRow>
                                <TableCell>Nome Cientifico</TableCell>
                                <TableCell>Nome Popular</TableCell>
                                <TableCell>M3</TableCell>
                                <TableCell>Entrada</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {products.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{row.scientificName}</TableCell>
                                    <TableCell>{row.commonName}</TableCell>                    
                                    <TableCell>{row.volumeTotal || '0.00'}</TableCell>
                                    <TableCellDate date={row.createdAt} />
                                </TableRow>
                            ))}
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
                <Typography variant="h5" color="#555555">Nenhum produto encontrado!</Typography>
            </Box>
        )
    )
}
export default ProductsTable