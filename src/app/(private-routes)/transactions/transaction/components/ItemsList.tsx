import { IItem } from "@/types/items/item"
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

interface ItemsTableProps {
    items: IItem[]
    removeItem: (index: number) => void
}

export const ItemsList = ({ items, removeItem }: ItemsTableProps) => {
    //@ts-ignore
    const volumeTotal = items.reduce((a, b) => a + parseFloat(b.volumeM3), 0.00).toFixed(3)
    return (
        <Box >
            <TableContainer sx={{
                marginTop: 2,
                overflowY: 'auto',
                height: 450
            }}>
                <Table >
                    <TableHead sx={{ backgroundColor: '#f0f0f0', position: 'sticky', top: 0, zIndex: 999 }} >
                        <TableRow>
                            <TableCell>Plaqueta</TableCell>
                            <TableCell>Produto</TableCell>
                            <TableCell>Seccção</TableCell>
                            <TableCell>D1</TableCell>
                            <TableCell>D2</TableCell>
                            <TableCell>D3</TableCell>
                            <TableCell>D4</TableCell>
                            <TableCell>Comprimento</TableCell>
                            <TableCell>M3</TableCell>
                            <TableCell>Opções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {items.length > 0 ? (
                            items.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <TableCell component="th" scope="row">{row.code}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.section}</TableCell>
                                    <TableCell>{row.d1}</TableCell>
                                    <TableCell>{row.d2}</TableCell>
                                    <TableCell>{row.d3}</TableCell>
                                    <TableCell>{row.d4}</TableCell>
                                    <TableCell>{row.meters}</TableCell>
                                    <TableCell>{row.volumeM3}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => removeItem(index)}>
                                            <CloseIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={10}>
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        sx={{
                                            marginTop: '16px',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                            minHeight: '320px',
                                        }}
                                    >
                                        <Typography variant="h5" color="#555555">
                                            Nenhum item encontrado!
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                display='flex'
                justifyContent='flex-end'
                sx={{ height: 80, mt: 2 }} >

                <Box display='flex' sx={{ justifyContent: 'flex-end' }}>
                    <Typography variant="subtitle1">Volume {volumeTotal}M3</Typography>
                </Box>
            </Box>
        </Box>
    )
}
export default ItemsList 