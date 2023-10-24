"use client"

import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { styled } from "@mui/material/styles"
import { IProduct } from "@/types/product/product";
import { useState, useEffect, useRef } from "react"
import SearchIcon from '@mui/icons-material/Search'
import * as Yup from 'yup'
import ProductSearchModal from "@/app/components/ProductsSearchModal/productsSearchModal";
import { DecimalInput } from "@/app/components/DecimalInput/DecimalInput";
import { calculateVolume } from "@/utils/calculateVolume";
import { ListInventorys } from "@/services/inventoryService";
import { inventory } from "@/types/inventory/inventory";
import React from "react";

interface ItemFormProps {
    handleSubmit: (item: any) => void
    inventorySelected: string | ''
}

const CustomTextField = styled(TextField)({})
CustomTextField.defaultProps = {
    size: 'small'
}
const CustomDecimalTextField = styled(DecimalInput)({})
CustomDecimalTextField.defaultProps = {
    size: 'small'
}
export const ItemForm = ({ handleSubmit, inventorySelected }: ItemFormProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const codeInputRef = useRef<HTMLInputElement | null>(null);
    const sectionInputRef = useRef<HTMLInputElement | null>(null);
    const d1InputRef = useRef<HTMLInputElement | null>(null);
    const d2InputRef = useRef<HTMLInputElement | null>(null);
    const d3InputRef = useRef<HTMLInputElement | null>(null);
    const d4InputRef = useRef<HTMLInputElement | null>(null);
    const metersInputRef = useRef<HTMLInputElement | null>(null);
    const productInputRef = useRef<HTMLInputElement | null>(null);
    const submitButtonRef = useRef<HTMLButtonElement | null>(null)
    const [inventorysList, setInventoryList] = useState<inventory[]>([])

    useEffect(() => {
        getInventorys()
    }, [])

    const getInventorys = async () => {
        await ListInventorys({}).then((response) => {
            setInventoryList(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    const validationSchema = Yup.object({
        inventory: Yup.string(),
        product: Yup.number(),
        code: Yup.string().required(),
        section: Yup.string(),
        name: Yup.string().required(),
        d1: Yup.string().required(),
        d2: Yup.string().required(),
        d3: Yup.string().required(),
        d4: Yup.string().required(),
        meters: Yup.string().required(),
        volumeTotal: Yup.string()
    })
    const ProductForm = useFormik({
        initialValues: {
            inventory: inventorySelected,
            code: '',
            name: '',
            product: '',
            section: '',
            d1: '0',
            d2: '0',
            d3: '0',
            d4: '0',
            meters: '0',
            volumeM3: '0.00',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
            resetProduct()
            setTimeout(() => {
                if (productInputRef.current) {
                    productInputRef.current.focus();
                }
            }, 0)
        }
    })
    const handleModal = () => {
        setOpen((state) => !state)
    }
    const resetProduct = () => {
        ProductForm.setFieldValue('code', '')
        ProductForm.setFieldValue('name', '')
        ProductForm.setFieldValue('product', '')
        ProductForm.setFieldValue('section', '')
        ProductForm.setFieldValue('d1', '0')
        ProductForm.setFieldValue('d2', '0')
        ProductForm.setFieldValue('d3', '0')
        ProductForm.setFieldValue('d4', '0')
        ProductForm.setFieldValue('meters', '0')
        ProductForm.setFieldValue('volumeM3', '0.00')
    }
    useEffect(() => {
        updateVolume()
    }, [ProductForm.values.d1, ProductForm.values.d2, ProductForm.values.d3, ProductForm.values.d4, ProductForm.values.meters])
    const updateVolume = () => {
        const { d1, d2, d3, d4, meters } = ProductForm.values
        const volume = calculateVolume({ d1, d2, d3, d4, meters })
        ProductForm.setFieldValue('volumeM3', volume.toFixed(3))
    }

    const onSelectProduct = (product: IProduct) => {
        ProductForm.setFieldValue('product', product.id)
        ProductForm.setFieldValue('name', product.name)
        setTimeout(() => {
            if (codeInputRef.current) {
                codeInputRef.current.focus();
            }
        }, 0);
    }
    return (
        <Box display='flex' gap={2} component='form' onSubmit={ProductForm.handleSubmit} >
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Typography variant="overline" fontWeight='bolder'>Inventário*</Typography>
                    <Select
                        fullWidth
                        label='Patio'
                        name='inventory'
                        placeholder="Selecione o tipo de transação..."
                        value={ProductForm.values.inventory}
                        onChange={ProductForm.handleChange}
                    >
                        {inventorysList.map((inventory) => (
                            <MenuItem key={inventory.id} value={inventory.id}>{inventory.name}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                {ProductForm.values.inventory && (
                    <React.Fragment>
                        <Grid item xs={1}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="caption">Código</Typography>
                                </Grid>
                                <Grid item>
                                    <CustomTextField
                                        name='product'
                                        inputRef={productInputRef}
                                        value={ProductForm.values.product}
                                        onChange={ProductForm.handleChange}
                                        InputProps={{
                                            endAdornment: (
                                                <SearchIcon style={{ cursor: 'pointer' }} onClick={handleModal} />
                                            ),
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleModal()
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="caption">Nome</Typography>
                                </Grid>
                                <Grid item>
                                    <CustomTextField
                                        name='name'
                                        fullWidth
                                        value={ProductForm.values.name}
                                        onChange={ProductForm.handleChange}
                                        disabled={true}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="caption">Plaqueta</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <CustomTextField
                                        name='code'
                                        fullWidth
                                        inputRef={codeInputRef}
                                        value={ProductForm.values.code}
                                        onChange={ProductForm.handleChange}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (sectionInputRef.current) {
                                                    sectionInputRef.current.focus();
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="caption">Seção</Typography>
                                </Grid>
                                <Grid item>
                                    <CustomTextField
                                        name='section'
                                        inputRef={sectionInputRef}
                                        value={ProductForm.values.section}
                                        onChange={ProductForm.handleChange}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (d1InputRef.current) {
                                                    d1InputRef.current.focus();
                                                }
                                            }
                                        }}

                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="caption">D1</Typography>
                                </Grid>
                                <Grid item>
                                    <CustomDecimalTextField
                                        name='d1'
                                        inputRef={d1InputRef}
                                        value={ProductForm.values.d1}
                                        handleChange={(e) => {
                                            ProductForm.setFieldValue('d1', e)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (d2InputRef.current) {
                                                    d2InputRef.current.focus();
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="caption">D2</Typography>
                                </Grid>
                                <Grid item>
                                    <CustomDecimalTextField
                                        name='d2'
                                        inputRef={d2InputRef}
                                        value={ProductForm.values.d2}
                                        handleChange={(e) => {
                                            ProductForm.setFieldValue('d2', e)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (d3InputRef.current) {
                                                    d3InputRef.current.focus();
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="caption">D3</Typography>
                                </Grid>
                                <Grid item>
                                    <CustomDecimalTextField
                                        name='d3'
                                        inputRef={d3InputRef}
                                        value={ProductForm.values.d3}
                                        handleChange={(e) => {
                                            ProductForm.setFieldValue('d3', e)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (d4InputRef.current) {
                                                    d4InputRef.current.focus();
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="caption">D4</Typography>
                                </Grid>
                                <Grid item>
                                    <CustomDecimalTextField
                                        name='d4'
                                        inputRef={d4InputRef}
                                        value={ProductForm.values.d4}
                                        handleChange={(e) => {
                                            ProductForm.setFieldValue('d4', e)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (metersInputRef.current) {
                                                    metersInputRef.current.focus();
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="caption">Comprimento</Typography>
                                </Grid>
                                <Grid item>
                                    <CustomDecimalTextField
                                        name='meters'
                                        inputRef={metersInputRef}
                                        value={ProductForm.values.meters}
                                        handleChange={(e) => {
                                            ProductForm.setFieldValue('meters', e)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (submitButtonRef.current) {
                                                    submitButtonRef.current.focus();
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="caption">Volume</Typography>
                                </Grid>
                                <Grid item>
                                    <CustomTextField
                                        name='volumeTotal'
                                        value={ProductForm.values.volumeM3}
                                        disabled={true}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='flex-end' alignItems='center' >
                            <Button
                                ref={submitButtonRef}
                                type="button"
                                variant="contained"
                                onClick={() => ProductForm.handleSubmit()}
                                size="small"
                            >Confirmar</Button>
                        </Grid>
                    </React.Fragment>
                )}
            </Grid>
            <ProductSearchModal
                handleModal={handleModal}
                open={open}
                onSelectProduct={onSelectProduct}
            />
        </Box>
    )
}
