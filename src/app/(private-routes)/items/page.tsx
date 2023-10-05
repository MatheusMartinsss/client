"use client"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { findOneInventory, ListInventorys } from "@/services/inventoryService";
import { useEffect, useState } from "react";
import { inventory } from "@/types/inventory/inventory";
import TableCellDate from "@/app/components/TableCellDate/TableCellDate";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash/debounce';
import FilterButton from "@/app/components/FilterButton/FilterButton";
import FilterDateInput from "@/app/components/FilterDateInput/FilterDateInput";

const Items = () => {
    const [inventorysList, setInventorysList] = useState<inventory[]>([])
    const [loadingInventorys, setLoadingInventorys] = useState(true)
    const [inventorySelected, setInventorySelected] = useState<string>('')
    const [inventory, setInventory] = useState<inventory | null>(null)
    const [textFilter, setTextFilter] = useState<string>('')
    const [query, setQuery] = useState({ inventoryId: '', active: true, includeArchived: false, text: '', from: '', to: '' })
    useEffect(() => {
        getInventorys()
    }, [])
    useEffect(() => {
        getInventory()
    }, [inventorySelected, query])
    const getInventorys = async () => {
        await ListInventorys()
            .then((response) => {
                setInventorysList(response)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                setLoadingInventorys(false)
            })
    }
    const onSelectInventory = (event: SelectChangeEvent<string>) => {
        setQuery((state) => ({ ...state, inventoryId: event?.target?.value }))
    }
    const onChangeFilterText = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (e.target.value) {
            setQuery((state) => ({ ...state, text: e.target.value }))
        } else {
            setQuery((state) => ({ ...state, text: '' }))
        }
    }
    const getInventory = async () => {
        if (!query.inventoryId)
            return

        const selectedInventoryId: number = parseInt(query.inventoryId)

        await findOneInventory(selectedInventoryId, query.includeArchived, query.text, query.from, query.to, query.active)
            .then((response) => {
                setInventory(response)
            }).catch((error) => {
                console.log(error)
            })
    }
    return (
        <Box display='flex' flexDirection='column' flexGrow={1}>
            <Box>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="inventory-select">Selecione um inventário</InputLabel>
                    <Select
                        value={query.inventoryId}
                        onChange={onSelectInventory}
                        label="Selecione um inventário"
                        id="inventory-select"
                    >
                        {inventorysList.map((item: inventory) => (
                            <MenuItem
                                key={item.id}
                                value={item.id}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box
                display='flex'
                flexDirection='column'
                p={2}
                component={Paper}
                sx={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    background: '#fff',
                }}
            >

                <Grid container spacing={2} sx={{ padding: '16px' }}>
                    <Grid item xs={6}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Inventário: {inventory?.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Descrição: {inventory?.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Volume: {inventory?.volumeTotal}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField
                            onChange={debounce(onChangeFilterText, 300)}
                            placeholder="Pesquisar..."
                            fullWidth
                            variant="outlined"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        ></TextField>
                    </Grid>
                    <Grid item xs={1} >
                        <FilterButton
                            onClick={() => setQuery((state) => ({ ...state, active: !state.active }))}
                            isActive={query.active}
                        >
                            Ativas
                        </FilterButton>
                    </Grid>
                    <Grid item xs={1} >
                        <FilterButton
                            onClick={() => setQuery((state) => ({ ...state, includeArchived: !state.includeArchived }))}
                            isActive={query.includeArchived}
                        >
                            Removidas
                        </FilterButton>
                    </Grid>
                    <Grid item >
                        <FilterDateInput
                            value={query.from}
                            label="Data Inicial"
                            onChange={(e) => setQuery((state) => ({ ...state, from: e }))}
                        />
                    </Grid>
                    <Grid item>
                        <FilterDateInput
                            value={query.to}
                            label="Data Final"
                            onChange={(e) => setQuery((state) => ({ ...state, to: e }))}
                        />
                    </Grid>
                </Grid>
                {inventory?.items?.length ?
                    <TableContainer sx={{
                        display: 'block',
                        maxHeight: 450,
                        overflowY: 'auto',
                        marginTop: 2
                    }}>
                        <Table >
                            <TableHead sx={{ backgroundColor: '#f0f0f0', position: 'sticky', top: 0 }} >
                                <TableRow>
                                    <TableCell>Plaqueta</TableCell>
                                    <TableCell>Produto</TableCell>
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
                            <TableBody>
                                {inventory?.items.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{row.code}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.d1}</TableCell>
                                        <TableCell>{row.d2}</TableCell>
                                        <TableCell>{row.d3}</TableCell>
                                        <TableCell>{row.d4}</TableCell>
                                        <TableCell>{row.meters}</TableCell>
                                        <TableCell>{row.volumeM3}</TableCell>
                                        <TableCellDate date={row.createdAt} />
                                        <TableCellDate date={row.removedAt} />
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
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
                        <Typography variant="h5" color="#555555">{inventory?.name} ainda não possui itens!</Typography>
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default Items;