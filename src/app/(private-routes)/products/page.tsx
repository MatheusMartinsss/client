'use client'
import ProductsTable from "@/app/components/ProductsTable/ProductsTable"
import { ListProducts } from "@/services/productsService"
import { IProduct } from "@/types/product/product"
import { Box, Button, Paper } from "@mui/material"
import { useEffect, useState } from "react"
import ProductCreateForm from "@/app/components/Forms/Products/ProductCreateForm"
import Modal from "@/app/components/Modal/Modal"

const Products = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        const response = await ListProducts({ includeVolume: true })
        setProducts(response)
    }
    const handleModal = () => setOpen((state) => !state)

    const onCreate = (product: IProduct) => {
        setProducts((state) => ({ ...state, ...product }))
    }
    return (
        <Box>
            <Box
                component={Paper}
                p={2}
                sx={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    background: '#fff',
                }}
            >
                <Button onClick={handleModal} variant="contained">CADASTRAR</Button>
            </Box>
            <ProductsTable products={products} />
            <Modal handleModal={handleModal} open={open}>
                <ProductCreateForm onCreate={onCreate} />
            </Modal>
        </Box>
    )
}

export default Products