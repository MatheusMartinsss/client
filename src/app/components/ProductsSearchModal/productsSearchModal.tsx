"use client"
import { IItem } from "@/types/items/item"
import { Box, Button, Dialog, InputAdornment, Paper, TextField } from "@mui/material"
import ProductsTable from "./components/productsTable"
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { ListItems } from "@/services/itemService";
import { ListProducts } from "@/services/productsService";
import { IProduct } from "@/types/product/product";
import Modal from "../Modal/Modal";
import ProductCreateForm from "../Forms/Products/ProductCreateForm";
type ProductsSearchProps = {
    open: boolean
    handleModal: () => void
    onSelectProduct: (product: IProduct) => void
}

const ProductSearchModal = ({ open, handleModal, onSelectProduct }: ProductsSearchProps) => {
    const [query, setQuery] = useState({ searchBy: '' })
    const [listProducts, setListProducts] = useState<IItem[]>([])
    const [openProductForm, setOpenProductForm] = useState<boolean>(false)

    useEffect(() => {
        getProducts()
    }, [query])
    const getProducts = async () => {
        await ListProducts({}).then((response) => {
            setListProducts(response)
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
    const handleOpenProductForm = () => {
        setOpenProductForm((state) => !state)
    }
    return (
        <Dialog
            open={open}
            onClose={handleModal}
            maxWidth='lg'
            autoFocus={false}
        >
            <Box component={Paper} padding={4} gap={2} display='flex' flexDirection='column'>
                <Box display='flex' gap={2}>
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
                    <Button size="small" variant="contained" onClick={handleOpenProductForm}>CADASTRAR</Button>
                </Box>
                <ProductsTable
                    products={listProducts}
                    onSelect={onSelectProduct}
                    handleModal={handleModal}
                />
            </Box>
            <Modal
                open={openProductForm}
                handleModal={handleOpenProductForm}
            >
                <ProductCreateForm
                    onCreate={handleOpenProductForm}
                />
            </Modal>
        </Dialog>
    )
}
export default ProductSearchModal