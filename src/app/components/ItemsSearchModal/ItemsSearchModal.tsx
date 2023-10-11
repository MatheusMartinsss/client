import { IItem } from "@/types/items/item"
import { Box, Dialog, Paper, TextField } from "@mui/material"
import ItemsSearchTable from "./components/ItemsSearchTable"

type ItemsSearchProps = {
    open: boolean
    items: IItem[]
    handleModal: () => void
    handleItems: (items: IItem[]) => void
}

const ItemsSearchModal = ({ open, items, handleModal, handleItems }: ItemsSearchProps) => {
    return (
        <Dialog
            open={open}
            onClose={handleModal}
            maxWidth='xl'

        >
            <Box component={Paper} padding={4}>
                <TextField fullWidth></TextField>
                <ItemsSearchTable items={items} handleConfirm={handleItems} handleModal = {handleModal} />
            </Box>

        </Dialog>
    )
}
export default ItemsSearchModal