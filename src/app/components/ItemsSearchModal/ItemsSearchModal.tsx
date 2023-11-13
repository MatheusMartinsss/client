"use client"
import { IItem } from "@/types/items/item"
import { Box, Dialog, InputAdornment, Paper, TextField } from "@mui/material"
import ItemsSearchTable from "./components/ItemsSearchTable"
import SearchIcon from '@mui/icons-material/Search';

type QueryProps = {
    searchBy: string
}

type ItemsSearchProps = {
    open: boolean
    handleModal: () => void
    handleItems: (items: IItem[]) => void
    itemsSelected: IItem[]
    listItems: IItem[]
    query: QueryProps
    onChangeText: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
    closeModal: () => void
}

const ItemsSearchModal = ({ open, handleModal, handleItems, itemsSelected, query, listItems, onChangeText, closeModal }: ItemsSearchProps) => {


    const getItemsList = (): IItem[] => {
        return listItems.filter((item) => {
            return !itemsSelected.some(selectedItem => selectedItem.id === item.id);
        });
    }
    return (
        <Dialog
            open={open}
            onClose={closeModal}
            maxWidth='lg'
        >
            <Box component={Paper} padding={4}>
                <TextField
                    placeholder="Pesquisar..."
                    onChange={onChangeText}
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