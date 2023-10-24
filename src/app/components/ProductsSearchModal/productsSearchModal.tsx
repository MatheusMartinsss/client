"use client"
import { IItem } from "@/types/items/item"
import { Box, Dialog, InputAdornment, Paper, TextField } from "@mui/material"
import ProductsTable from "./components/productsTable"
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { ListItems } from "@/services/itemService";
import { ListProducts } from "@/services/productsService";
import { IProduct } from "@/types/product/product";
type ProductsSearchProps = {
    open: boolean
    handleModal: () => void
    onSelectProduct: (product: IProduct) => void

}

const ProductSearchModal = ({ open, handleModal, onSelectProduct }: ProductsSearchProps) => {
    const [query, setQuery] = useState({ searchBy: '' })
    const [listProducts, setListProducts] = useState<IItem[]>([])

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

    return (
        <Dialog
            open={open}
            onClose={handleModal}
            maxWidth='lg'
            autoFocus = {false}
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
                <ProductsTable
                    products={listProducts}
                    onSelect={onSelectProduct}
                    handleModal={handleModal}
                />
            </Box>
        </Dialog>
    )
}
export default ProductSearchModal