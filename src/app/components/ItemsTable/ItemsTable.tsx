import { IItem } from "@/types/items/item"
import { Box, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import TableCellDate from "../TableCellDate/TableCellDate"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
interface ItemsTableProps {
    items: IItem[]
    handleSelectItem: (item: IItem) => void
    itemsSelected: IItem[]
    clearItemsSelected: () => void
}

export const ItemsTable = ({ items, handleSelectItem, itemsSelected, clearItemsSelected }: ItemsTableProps) => {

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

    const clearItemsSelect = () => {

    }
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
                                onClick={clearItemsSelect}
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
                                <TableCell>#</TableCell>
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
                                <TableCell>Entrada</TableCell>
                                <TableCell>Saida</TableCell>
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
                                        <TableCellDate date={row.removedAt} />
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