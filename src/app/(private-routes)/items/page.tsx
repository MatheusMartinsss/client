"use client"
import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { ListInventorys } from "@/services/inventoryService";
import { useEffect, useState } from "react";
import { inventory } from "@/types/inventory/inventory";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash/debounce';
import FilterButton from "@/app/components/FilterButton/FilterButton";
import FilterDateInput from "@/app/components/FilterDateInput/FilterDateInput";
import ItemsTable from "@/app/components/ItemsTable/ItemsTable";
import { ListItems } from "@/services/itemService";
import { IItem } from "@/types/items/item";

const Items = () => {
    const [inventorysList, setInventorysList] = useState<inventory[]>([])
    const [loadingInventorys, setLoadingInventorys] = useState(true)
    const [inventory, setInventory] = useState<inventory | null>(null)
    const [items, setItems] = useState<IItem[]>([])
    const [query, setQuery] = useState({ inventoryId: '', active: true, includeArchived: false, text: '', from: '', to: '' })
    useEffect(() => {
        getInventorys()
    }, [])
    useEffect(() => {
        getItems()
    }, [query])
    const getInventorys = async () => {
        await ListInventorys({
            includeVolume: true
        }).then((response) => {
            setInventorysList(response);
            const initialInventorySelected = response.find((item: inventory) => item.id === 0)
            setInventory(initialInventorySelected)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoadingInventorys(false)
        })
    }
    const onSelectInventory = (event: SelectChangeEvent<string>) => {

        const inventorySelect = inventorysList.find((item) => item.id === parseInt(event.target.value))
        if (inventorySelect) {
            setInventory(inventorySelect)
        }
        if (parseInt(event.target.value) === 0) {
            setQuery((state) => ({ ...state, inventoryId: '' }))
        } else {
            setQuery((state) => ({ ...state, inventoryId: event.target.value }))
        }

    }
    const onChangeFilterText = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (e.target.value) {
            setQuery((state) => ({ ...state, text: e.target.value }))
        } else {
            setQuery((state) => ({ ...state, text: '' }))
        }
    }

    const getItems = async () => {
        await ListItems({
            inventoryId: query.inventoryId,
            includeArchived: query.includeArchived,
            from: query.from,
            to: query.to,
            searchBy: query.text
        })
            .then((response) => {
                setItems(response)
            }).catch((error) => {
                console.log(error)
            })
    }
    return (
        <Box display='flex' flexDirection='column' flexGrow={1}>
            {loadingInventorys ? (
                <Box>
                </Box>
            ) : (
                <Box>
                    <Box>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="inventory-select">Selecione um inventário</InputLabel>
                            <Select
                                value={inventory?.id.toString()}
                                onChange={onSelectInventory}
                                label="Selecione um inventário"
                                id="inventory-select"
                            >
                                {inventorysList.map((item: inventory) => (
                                    <MenuItem
                                        key={item.id}
                                        value={item.id}>
                                        {item.name} - Volume {item.totalVolumeM3}M3
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
                                    Volume: {inventory?.totalVolumeM3}
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
                            <Grid item xs={2}>
                                <FilterButton
                                    onClick={() => setQuery((state) => ({ ...state, active: !state.active }))}
                                    isActive={query.active}
                                >
                                    Ativas
                                </FilterButton>
                            </Grid>
                            <Grid item xs={2} >
                                <FilterButton
                                    onClick={() => setQuery((state) => ({ ...state, includeArchived: !state.includeArchived }))}
                                    isActive={query.includeArchived}
                                >
                                    Removidas
                                </FilterButton>
                            </Grid>
                            <Grid item xs>

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
                        {items && <ItemsTable items={items} />}
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default Items;