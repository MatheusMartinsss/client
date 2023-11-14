import { IItem } from "@/types/items/item"
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from "@mui/icons-material/Edit"

interface ItemsTableProps {
    items: IItem[] | []
    removeItem: (index: number, item: IItem) => void
    editItem: (item: IItem) => void
    allowEdit?: boolean
}

export const ItemsList = ({ items, removeItem, editItem, allowEdit }: ItemsTableProps) => {

    //@ts-ignore
    const volumeTotal = items.reduce((a, b) => a + parseFloat(b.volumeM3), 0.00).toFixed(3)

    const handleEdit = (item: IItem) => {
        if (!allowEdit) return
        if (editItem) {
            editItem(item)
        }
    }
    return (
        <Box >
            <TableContainer sx={{
                marginTop: 2,
                overflowY: 'auto',
                height: 300
            }}>
                <Table >
                    <TableHead sx={{ backgroundColor: '#f0f0f0', position: 'sticky', top: 0, zIndex: 999 }} >
                        <TableRow>
                            <TableCell>Plaqueta</TableCell>
                            <TableCell>Nome Cientifico</TableCell>
                            <TableCell>Nome Popular</TableCell>
                            <TableCell>Secção</TableCell>
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
                                    <TableCell>{row.scientificName}</TableCell>
                                    <TableCell>{row.commonName}</TableCell>
                                    <TableCell>{row.section}</TableCell>
                                    <TableCell>{row.d1}</TableCell>
                                    <TableCell>{row.d2}</TableCell>
                                    <TableCell>{row.d3}</TableCell>
                                    <TableCell>{row.d4}</TableCell>
                                    <TableCell>{row.meters}</TableCell>
                                    <TableCell>{row.volumeM3}</TableCell>
                                    <TableCell>
                                        {!allowEdit &&
                                            <IconButton onClick={() => removeItem(index, row)}>
                                                <CloseIcon />
                                            </IconButton>
                                        }
                                        {allowEdit &&
                                            <IconButton onClick={() => handleEdit(row)} >
                                                <EditIcon />
                                            </IconButton>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={12}>
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
                sx={{ height: 50, mt: 2 }} >

                <Box display='flex' sx={{ justifyContent: 'flex-end' }}>
                    <Typography variant="subtitle1">Volume {volumeTotal}M3</Typography>
                </Box>
            </Box>
        </Box>
    )
}
export default ItemsList 