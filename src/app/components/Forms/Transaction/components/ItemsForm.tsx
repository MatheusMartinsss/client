import { ICreateItem } from "@/types/items/item"
import { Autocomplete, Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material"
import { Formik, Form, FieldArray } from "formik"
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import React, { useEffect, useState } from "react"
import * as Yup from 'yup'
import { IProduct } from "@/types/product/product";
import { ListProducts } from "@/services/productsService";
import { convertUnit } from "@/utils/unitsFormater";

export const ItemsForm = () => {
    const [productList, setProductList] = useState<IProduct[]>([])
    const initialForm: ICreateItem[] = [{
        code: '',
        tree_id: null,
        commonName: '',
        scientificName: '',
        inventory_id: 0,
        product_id: 0,
        section: '',
        d1: '0.00',
        d2: '0.00',
        d3: '0.00',
        d4: '0.00',
        meters: '0.00',
        volumeM3: '0.000'
    }]
    useEffect(() => {
        getProductsList()
    }, [])
    const getProductsList = async () => {
        const response = await ListProducts({})
        setProductList(response)
    }
    const getOptionName = (option: any) => {
        const { commonName, scientificName } = option
        return `${scientificName} ${commonName}` || ''
    }
    const validationSchema = Yup.object({
        id: Yup.string(),
        code: Yup.string(),
        items: Yup.array().required().of(
            Yup.object().required().shape({
                tree_id: Yup.string(),
                code: Yup.string(),
                inventory_id: Yup.number().required(),
                commonName: Yup.string().required(),
                scientificName: Yup.string().required(),
                product_id: Yup.number(),
                section: Yup.string(),
                d1: Yup.string().required(),
                d2: Yup.string().required(),
                d3: Yup.string().required(),
                d4: Yup.string().required(),
                meters: Yup.string().required(),
                volumeM3: Yup.string()
            })
        )
    })
    const getProductById = (id: number) => {
        return productList.find((product) => product.id === id) ?? null
    }
    return (
        <Formik
            initialValues={{
                items: initialForm
            }}
            onSubmit={(value) => console.log(value)}
            validationSchema={validationSchema}
        >
            {({ values, setFieldValue, handleChange }) => {
                return (
                    <Form autoComplete="off">
                        <FieldArray name="items">
                            {({ push, insert, remove, replace }) => {
                                return (
                                    <Table
                                        size="small"
                                        sx={{
                                            overflowY: 'auto',
                                            height: '100%',
                                            width: '100%'
                                        }}
                                    >
                                        <TableHead>
                                            <TableRow >
                                                <TableCell>
                                                    Produto
                                                </TableCell>
                                                <TableCell>
                                                    Cientifico
                                                </TableCell>
                                                <TableCell>
                                                    Popular
                                                </TableCell>
                                                <TableCell align="center">
                                                    Secção
                                                </TableCell>
                                                <TableCell align="center">
                                                    D1
                                                </TableCell>
                                                <TableCell align="center">
                                                    D2
                                                </TableCell>
                                                <TableCell align="center">
                                                    D3
                                                </TableCell>
                                                <TableCell align="center">
                                                    D4
                                                </TableCell>
                                                <TableCell align="center">
                                                    Comp
                                                </TableCell>
                                                <TableCell align="center">
                                                    M3
                                                </TableCell>
                                                <TableCell align="center">
                                                    #
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {values.items.length > 0 && values.items
                                                .map((fell, index) => {
                                                    const isLastIndex = index === values.items.length - 1
                                                    const TotalM3 = values.items.reduce((acc, b) => {
                                                        if (b.tree_id === fell.tree_id) {
                                                            return acc + parseFloat(b.volumeM3);
                                                        }
                                                        return acc;
                                                    }, 0).toFixed(3)
                                                    return (
                                                        <React.Fragment>
                                                            <TableRow key={index} sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                                <TableCell aria-autocomplete="list"  >
                                                                    <Autocomplete
                                                                        value={getProductById(fell.product_id)}
                                                                        options={productList ?? []}
                                                                        renderInput={(params) => <TextField variant="standard"  {...params} />}
                                                                        getOptionLabel={(option) => String(option.id)}
                                                                        fullWidth
                                                                        renderOption={(props, option) => (
                                                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} >
                                                                                {option?.scientificName} {option?.commonName}
                                                                            </Box>
                                                                        )}
                                                                        PaperComponent={({ children }) => {
                                                                            return (
                                                                                <Paper sx={{ width: 250 }}>
                                                                                    <Box display="flex" justifyContent="center" alignItems="center">
                                                                                        <Button
                                                                                            variant="outlined"
                                                                                            color="primary"
                                                                                            size="small"
                                                                                            fullWidth
                                                                                            onMouseDown={() => {
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
                                                                            setFieldValue(`items[${index}].product_id`, value?.id);
                                                                            setFieldValue(`items[${index}].commonName`, value?.commonName);
                                                                            setFieldValue(`items[${index}].scientificName`, value?.scientificName);

                                                                        }}

                                                                    >
                                                                    </Autocomplete>
                                                                </TableCell>
                                                                <TableCell align="center" width='250px'>
                                                                    <TextField
                                                                        variant="standard"
                                                                        name={`items[${index}].scientificName`}
                                                                        value={fell.scientificName}

                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center" width='200px'>
                                                                    <TextField
                                                                        variant="standard"
                                                                        name={`items[${index}].commonName`}
                                                                        value={fell.commonName}

                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <TextField
                                                                        variant="standard"
                                                                        name={`items[${index}].section`}

                                                                        value={fell.section}
                                                                        onChange={handleChange}

                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <TextField
                                                                        variant="standard"
                                                                        name={`items[${index}].d1`}
                                                                        inputProps={{
                                                                            style: {
                                                                                textAlign: 'center'
                                                                            }
                                                                        }}
                                                                        value={fell.d1}
                                                                        onChange={(e) => {
                                                                            const newValue = convertUnit({
                                                                                unit: 'meters',
                                                                                currentValue: fell.d1,
                                                                                entryValue: e.target.value
                                                                            })
                                                                            setFieldValue(`items[${index}].d1`, newValue);
                                                                        }}

                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <TextField
                                                                        variant="standard"
                                                                        name={`items[${index}].d2`}
                                                                        inputProps={{
                                                                            style: {
                                                                                textAlign: 'center'
                                                                            }
                                                                        }}
                                                                        value={fell.d2}
                                                                        onChange={(e) => {
                                                                            const newValue = convertUnit({
                                                                                unit: 'meters',
                                                                                currentValue: fell.d2,
                                                                                entryValue: e.target.value
                                                                            })
                                                                            setFieldValue(`items[${index}].d2`, newValue);
                                                                        }}

                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <TextField
                                                                        variant="standard"
                                                                        name={`items[${index}].d3`}
                                                                        inputProps={{
                                                                            style: {
                                                                                textAlign: 'center'
                                                                            }
                                                                        }}
                                                                        value={fell.d3}
                                                                        onChange={(e) => {
                                                                            const newValue = convertUnit({
                                                                                unit: 'meters',
                                                                                currentValue: fell.d3,
                                                                                entryValue: e.target.value
                                                                            })
                                                                            setFieldValue(`items[${index}].d3`, newValue);
                                                                        }}

                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <TextField
                                                                        variant="standard"
                                                                        name={`items[${index}].d4`}
                                                                        inputProps={{
                                                                            style: {
                                                                                textAlign: 'center'
                                                                            }
                                                                        }}
                                                                        value={fell.d4}
                                                                        onChange={(e) => {
                                                                            const newValue = convertUnit({
                                                                                unit: 'meters',
                                                                                currentValue: fell.d4,
                                                                                entryValue: e.target.value
                                                                            })
                                                                            setFieldValue(`items[${index}].d4`, newValue);
                                                                        }}

                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <TextField
                                                                        variant="standard"
                                                                        name={`items[${index}].meters`}
                                                                        inputProps={{
                                                                            style: {
                                                                                textAlign: 'center'
                                                                            }
                                                                        }}
                                                                        value={fell.meters}
                                                                        onChange={(e) => {
                                                                            const newValue = convertUnit({
                                                                                unit: 'meters',
                                                                                currentValue: fell.meters,
                                                                                entryValue: e.target.value
                                                                            })
                                                                            setFieldValue(`items[${index}].meters`, newValue);
                                                                        }}

                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    {fell.volumeM3}
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <Box display='flex' justifyContent='center' >
                                                                        <IconButton
                                                                            onClick={() => { push(fell) }}>
                                                                            <ContentCopyIcon />
                                                                        </IconButton>
                                                                        <IconButton
                                                                            onClick={() => { remove(index) }}>
                                                                            <CloseIcon />
                                                                        </IconButton>
                                                                    </Box>
                                                                </TableCell>
                                                            </TableRow >
                                                            {isLastIndex && (
                                                                <React.Fragment>
                                                                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                                        <TableCell colSpan={9}>
                                                                            <Box display='flex' justifyContent='center'>
                                                                                <IconButton
                                                                                    onClick={() => {
                                                                                        push({
                                                                                            code: "",
                                                                                            commonName: "",
                                                                                            scientificName: "",
                                                                                            product_id: 0,
                                                                                            inventory_id: 0,
                                                                                            tree_id: 0 ?? null,
                                                                                            section: '',
                                                                                            d1: '0.00',
                                                                                            d2: '0.00',
                                                                                            d3: '0.00',
                                                                                            d4: '0.00',
                                                                                            meters: '0.00',
                                                                                            volumeM3: '0.000'
                                                                                        })
                                                                                    }}
                                                                                >
                                                                                    <AddIcon />
                                                                                </IconButton>
                                                                            </Box>
                                                                        </TableCell>
                                                                        <TableCell align="center" >
                                                                            {TotalM3}
                                                                        </TableCell>

                                                                    </TableRow>

                                                                </React.Fragment>
                                                            )}
                                                        </React.Fragment>
                                                    )
                                                })}
                                        </TableBody>
                                    </Table>
                                )
                            }}
                        </FieldArray>
                        <TableCell align="center">
                            <Button type='submit' variant="contained">Salvar</Button>
                        </TableCell>
                    </Form>
                )
            }}
        </Formik>
    )
}