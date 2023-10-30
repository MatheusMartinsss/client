"use client"
import { IItem } from "@/types/items/item"
import { Box, Dialog, InputAdornment, Paper, TextField } from "@mui/material"
import ItemsSearchTable from "./components/ItemsSearchTable"
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { ListItems } from "@/services/itemService";

type ItemsSearchProps = {
    open: boolean
    handleModal: () => void
    handleItems: (items: IItem[]) => void
    itemsSelected: IItem[]

}

const ItemsSearchModal = ({ open, handleModal, handleItems, itemsSelected }: ItemsSearchProps) => {
    const [query, setQuery] = useState({ searchBy: '' })
    const [listItems, setListItems] = useState<IItem[]>([])

    useEffect(() => {
        getItems()
    }, [query])

    const getItems = async () => {
        await ListItems({ searchBy: query.searchBy }).then((response) => {
            setListItems(response)
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
    const getItemsList = (): IItem[] => {
        return listItems.filter((item) => {
            return !itemsSelected.some(selectedItem => selectedItem.id === item.id);
        });
    }
    return (
        <Dialog
            open={open}
            onClose={handleModal}
            maxWidth ='lg'
        >
            <Box component={Paper} padding={4}>
                <TextField
                    placeholder="Pesquisar..."
                    onChange={onChangeFilterText}
                    fullWidth
                    value={query.searchBy}
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}

                >
                </TextField>
                <ItemsSearchTable
                    items={getItemsList()}
                    handleConfirm={handleItems}
                    handleModal={handleModal}
                />
            </Box>
        </Dialog>
    )
}
export default ItemsSearchModal