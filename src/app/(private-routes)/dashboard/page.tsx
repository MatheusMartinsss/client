"use client"
import { ListItems } from "@/services/itemService";
import { IItem, ItemQuerys } from "@/types/items/item";
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
import CarpenterRoundedIcon from '@mui/icons-material/CarpenterRounded';
import Modal from "@/app/components/Modal/Modal";
import TransactionAddForm from "@/app/components/Forms/Transaction/TransactionAddForm";
import TransactionRemoveForm from "@/app/components/Forms/Transaction/TransactionRemoveForm";

enum Forms {
    add = 'add',
    remove = 'remove'
}

type order = "asc" | 'desc'

export default function Home() {
    const [items, setItems] = useState<IItem[]>([])
    const [query, setQuery] = useState<ItemQuerys>({ inventoryId: '', includeArchived: false, searchBy: '', from: '', to: '', order: 'asc', orderBy: '' })
    const [inventorysList, setInventorysList] = useState<inventory[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [form, setForm] = useState<Forms | null>(null)
    const [itemsSelected, setItemsSelected] = useState<IItem[]>([])
    useEffect(() => {
        getInventorys()
    }, [])
    useEffect(() => {
        getItems()
    }, [query])

    const handleModal = (form?: Forms | null) => {
        setOpen((state) => !state)
        setForm(form || null)
        if (!form) {
            clearItemsSelected()
        }
    }

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
            searchBy: query.searchBy,
            order: query.order,
            orderBy: query.orderBy
        })
            .then((response) => {
                setItems(response)
            }).catch((error) => {
                console.log(error)
            })
    }

    const onChangeFilterText = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (e.target.value) {
            setQuery((state) => ({ ...state, searchBy: e.target.value }))
        } else {
            setQuery((state) => ({ ...state, searchBy: '' }))
        }
    }
    const onSelectInventory = (event: SelectChangeEvent<string>) => {
        if (parseInt(event.target.value) === 0) {
            setQuery((state) => ({ ...state, inventoryId: '' }))
        } else {
            setQuery((state) => ({ ...state, inventoryId: event.target.value }))
        }

    }
    const isSelected = (id: number | undefined) => {
        return itemsSelected?.some((selectedItem) => selectedItem.id === id);
    };

    const onSelectItem = (item: IItem) => {
        const itemIsSelected = isSelected(item.id)
        if (itemIsSelected) {
            const newState = itemsSelected?.filter((items) => items.id !== item.id)
            setItemsSelected([...newState])
        } else {
            setItemsSelected([...itemsSelected, item])
        }
    }
    const clearItemsSelected = () => {
        setItemsSelected([])
    }

    const onCreateItemSucces = (item: any) => {
        getItems()
        getInventorys()
        handleModal(null)
    }
    const onRemoveItemsSuccess = (result: any) => {
        getItems()
        getInventorys()
        handleModal(null)
    }
    const handleOrderQuery = (key: string) => {
        setQuery((state) => ({ ...state, order: state.order === 'asc' ? 'desc' : 'asc', orderBy: key }))
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
                            value={query?.inventoryId?.toString()}
                            onChange={onSelectInventory}
                            fullWidth
                            id="inventory-select"
                            size="small"
                        >
                            {inventorysList?.length > 0 && inventorysList?.map((item: inventory) => (
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
                        <ItemsTable
                            items={items}
                            handleSelectItem={onSelectItem}
                            itemsSelected={itemsSelected}
                            order={query.order}
                            orderBy={query.orderBy}
                            clearItemsSelected={clearItemsSelected}
                            handleSortChange={handleOrderQuery}
                        />
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
                            onClick={() => handleModal(Forms.add)}
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
                        <IconButton
                            name="add"
                            size="large"
                            onClick={() => handleModal(Forms.remove)}
                            sx={{
                                width: '50px',
                                height: '50px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '50%',
                                margin: '0 0 20px 0',
                                boxShadow: itemsSelected.length > 0 ? '0 0 10px rgba(255, 0, 0, 0.5)' : 'none',
                            }}
                        >
                            <CarpenterRoundedIcon sx={{ width: '100%', height: '100%' }} />
                        </IconButton>

                    </Box>
                </Box>
            </Box>
            <Modal
                open={open}
                handleModal={handleModal}
            >
                {form === Forms.add &&
                    <TransactionAddForm
                        onSucces={onCreateItemSucces}
                        onCancel={() => handleModal(null)}
                    />
                }
                {form === Forms.remove &&
                    <TransactionRemoveForm
                        items={itemsSelected}
                        onSucces={onRemoveItemsSuccess}
                        onCancel={() => handleModal(null)}
                    />
                }
            </Modal>
        </Box >
    )
}