"use client"
import { ListItems } from "@/services/itemService";
import { IItem } from "@/types/items/item";
import { Box, Grid, IconButton, InputAdornment, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import debounce from 'lodash/debounce';
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import FilterButton from "@/app/components/FilterButton/FilterButton";
import FilterDateInput from "@/app/components/FilterDateInput/FilterDateInput";
import ItemsTable from "@/app/components/ItemsTable/ItemsTable";
import { inventory } from "@/types/inventory/inventory";
import { ListInventorys } from "@/services/inventoryService";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Modal from "@/app/components/Modal/Modal";
import TransactionAddForm from "@/app/components/Forms/Transaction/TransactionAddForm";

enum Forms {
    add = 'add',
}
export default function Home() {
    const [items, setItems] = useState<IItem[]>([])
    const [query, setQuery] = useState({ inventoryId: '', active: true, includeArchived: false, text: '', from: '', to: '' })
    const [inventorysList, setInventorysList] = useState<inventory[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [form, setForm] = useState<Forms | ''>('')
    useEffect(() => {
        getInventorys()
    }, [])
    useEffect(() => {
        getItems()
    }, [query])

    const handleModal = () => setOpen((state) => !state)

    const getInventorys = async () => {
        await ListInventorys({
            includeVolume: true
        }).then((response) => {
            setInventorysList(response);
        }).catch((error) => {
            console.log(error)
        })
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

    const onChangeFilterText = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (e.target.value) {
            setQuery((state) => ({ ...state, text: e.target.value }))
        } else {
            setQuery((state) => ({ ...state, text: '' }))
        }
    }
    const onSelectInventory = (event: SelectChangeEvent<string>) => {
        if (parseInt(event.target.value) === 0) {
            setQuery((state) => ({ ...state, inventoryId: '' }))
        } else {
            setQuery((state) => ({ ...state, inventoryId: event.target.value }))
        }

    }

    return (
        <Box>
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
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item >
                        <Typography variant='caption' fontWeight='600'>Data Inicial</Typography>
                        <FilterDateInput
                            value={query.from}
                            onChange={(e) => setQuery((state) => ({ ...state, from: e }))}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant='caption' fontWeight='600'>Data Final</Typography>
                        <FilterDateInput
                            value={query.to}
                            onChange={(e) => setQuery((state) => ({ ...state, to: e }))}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant='caption' fontWeight='600'>Patio</Typography>
                        <Select
                            value={query.inventoryId.toString()}
                            onChange={onSelectInventory}
                            fullWidth
                            id="inventory-select"
                            size="small"
                        >
                            {inventorysList.map((item: inventory) => (
                                <MenuItem
                                    key={item.id}
                                    value={item.id}>
                                    {item.name} - Volume {item.totalVolumeM3}M3
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%'
                }} >
                    <Box sx={{
                        width: '100%'
                    }}>
                        {items && <ItemsTable items={items} />}
                    </Box>
                    <Box
                        sx={{
                            width: '100px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            padding: '50px 5px 20px 5px',
                        }}
                    >
                        <IconButton
                            name="add"
                            size="large"
                            onClick={handleModal}
                            sx={{
                                width: '50px',
                                height: '50px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '50%',
                                margin: '0 0 20px 0',
                            }}
                        >
                            <AddCircleOutlineRoundedIcon sx={{ width: '100%', height: '100%' }} />
                        </IconButton>

                    </Box>
                </Box>
            </Box>
            <Modal
                open={open}
                handleModal={handleModal} 
            >
                <TransactionAddForm />
            </Modal>
        </Box >
    )
}