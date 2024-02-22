import { Autocomplete, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField } from "@mui/material"
import { AggregatedDataItem } from "./TreeImportForm"
import { useEffect, useState } from "react"
import { IProduct } from "@/types/product/product"
import { ListProducts } from "@/services/productsService"
import Modal from "../../Modal/Modal"
import ProductCreateForm from "../Products/ProductCreateForm"

interface TreesTableProps {
    order?: "asc" | "desc"
    orderBy?: string
    data: AggregatedDataItem[]
    handleSubmit: (trees: AggregatedDataItem[]) => void
}
const colummns = [{
    id: 'scientificName', label: 'Nome Cientifico', sortable: true
}, {
    id: 'commonName', label: 'Nome Popular', sortable: true
}, {
    id: 'Quantidade', label: 'Quantidade', sortable: true
}, {
    id: 'volumeM3', label: 'Volume Total', sortable: true
}, {
    id: 'product_id', label: 'Produto Referencia', sortable: true
}]

export const GroupedTreesTable = ({ data, order, orderBy, handleSubmit }: TreesTableProps) => {
    const [trees, setTrees] = useState<AggregatedDataItem[]>(data)
    const [open, setOpen] = useState<boolean>(false)
    const [selectedTree, setSelectedTree] = useState<AggregatedDataItem>()
    const [productList, setProductList] = useState<IProduct[]>([])
    const [treesInvalid, setTreesInvalid] = useState<string[]>()
    useEffect(() => {
        getProductsList()
    }, [])
    const getProductsList = async () => {
        const response = await ListProducts({})
        setProductList(response)
    }
    const associateTreeProduct = (tree: AggregatedDataItem, product: IProduct) => {
        const newData = trees.map((item) => {
            if (item.scientificName === tree.scientificName) {
                return {
                    ...item,
                    product_id: product.id || null
                }
            }
            return item
        })
        setTrees(newData)
    }
    const handleModal = () => setOpen((state) => !state)
    const getOptionName = (option: any) => {
        const { commonName, scientificName } = option
        return `${scientificName} ${commonName}` || ''
    }
    const onCreateProduct = (product: IProduct) => {
        getProductsList()
        if (selectedTree) {
            associateTreeProduct(selectedTree, product)
            setSelectedTree(undefined)
            handleModal()
        }
    }
    const onHandleSubmit = () => {
        const invalidTrees = trees.
            filter(tree => !tree.product_id)
            .map(tree => tree.scientificName)

        const isValid = invalidTrees.length === 0

        if (isValid) {
            handleSubmit(trees)
            setTreesInvalid([])
        } else {
            setTreesInvalid(invalidTrees)
        }
    }
    return (
        <Box>
            <TableContainer
                sx={{
                    marginTop: 2,
                    overflowY: 'auto',
                    height: 450,
                    display: 'flex'
                }}>
                <Table >
                    <TableHead sx={{position: 'sticky', top: 0 }} >
                        <TableRow>
                            {colummns.map((colum) => {
                                const isSortable = colum.sortable
                                const isSelected = orderBy === colum.id
                                return (
                                    <TableCell
                                        key={colum.id}
                                        sortDirection={isSelected ? order : false}
                                    >
                                        {isSortable ?
                                            <TableSortLabel
                                                active={isSelected}
                                                direction={isSelected ? order : 'asc'}
                                            >
                                                {colum.label}
                                            </TableSortLabel>
                                            : (colum.label)
                                        }
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {trees.map((row, index) => {
                            const isInvalid = treesInvalid?.includes(row.scientificName)
                            return (
                                <TableRow
                                    key={index}
                                    role="checkbox"
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        backgroundColor: isInvalid ? '#FFCDD2' : 'inherit', 
                                        boxShadow: isInvalid ? '0px 0px 5px 1px red' : 'none', 
                                    }}
                                >
                                    <TableCell>{row?.scientificName}</TableCell>
                                    <TableCell>{row?.commonName}</TableCell>
                                    <TableCell>{row?.qtd}</TableCell>
                                    <TableCell>{row?.volumeM3.toFixed(3)}</TableCell>
                                    <TableCell >
                                        <Autocomplete
                                            options={productList ?? []}
                                            renderInput={(params) => <TextField {...params} label="Referencia" />}
                                            getOptionLabel={(option) => getOptionName(option) ?? ''}
                                            renderOption={(props, option) => (
                                                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                    {option?.scientificName} {option?.commonName}
                                                </Box>
                                            )}
                                            PaperComponent={({ children }) => {
                                                return (
                                                    <Paper>
                                                        <Box display="flex" justifyContent="center" alignItems="center">
                                                            <Button
                                                                variant="outlined"
                                                                color="primary"
                                                                size="small"
                                                                fullWidth
                                                                onMouseDown={() => {
                                                                    setSelectedTree(row)
                                                                    handleModal()
                                                                }}
                                                            >
                                                                + produto
                                                            </Button>
                                                        </Box>
                                                        {children}
                                                    </Paper>
                                                )
                                            }}
                                            onChange={(event, value) => {
                                                if (value) {
                                                    associateTreeProduct(row, value)
                                                }
                                            }}

                                        >
                                        </Autocomplete>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>

                </Table>
            </TableContainer>
            <Box display='flex' justifyContent='flex-end'>
                <Button variant="contained" onClick={onHandleSubmit}>Confirmar</Button>
            </Box>
            <Modal
                open={open}
                handleModal={handleModal}
            >
                <ProductCreateForm
                    previousProduct={selectedTree}
                    onCreate={onCreateProduct}
                />
            </Modal>
        </Box>
    )
}