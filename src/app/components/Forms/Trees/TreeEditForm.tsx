"use client"

import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import { styled } from "@mui/material/styles"
import { IProduct } from "@/types/product/product";
import { useState, useRef } from "react"
import SearchIcon from '@mui/icons-material/Search'
import * as Yup from 'yup'
import ProductSearchModal from "@/app/components/ProductsSearchModal/productsSearchModal";
import { DecimalInput } from "@/app/components/DecimalInput/DecimalInput";
import React from "react";
import { ITree } from "@/types/tree/tree";

interface TreeFormProps {
    handleSubmit: (tree: ITree) => void
    tree: ITree
}

const CustomTextField = styled(TextField)({})
CustomTextField.defaultProps = {
    size: 'small'
}
const CustomDecimalTextField = styled(DecimalInput)({})
CustomDecimalTextField.defaultProps = {
    size: 'small'
}
export const TreeEditForm = ({ handleSubmit, tree }: TreeFormProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const treeIdInputRef = useRef<HTMLInputElement | null>(null);
    const codeInputRef = useRef<HTMLInputElement | null>(null);
    const metersInputRef = useRef<HTMLInputElement | null>(null);
    const productInputRef = useRef<HTMLInputElement | null>(null);
    const volumeInputRef = useRef<HTMLInputElement | null>(null);
    const submitButtonRef = useRef<HTMLButtonElement | null>(null)

    const validationSchema = Yup.object({
        id: Yup.number().nullable(),
        autex_id: Yup.number(),
        product_id: Yup.number().nullable(),
        code: Yup.string().required(),
        range: Yup.number().required(),
        dap: Yup.number().required(),
        scientificName: Yup.string().required(),
        commonName: Yup.string().required(),
        meters: Yup.number().required(),
        volumeM3: Yup.number().required()
    })
    const TreeForm = useFormik({
        initialValues: {
            id: tree.id,
            autex_id: tree.autex_id,
            code: tree.code,
            scientificName: tree.scientificName,
            range: tree.range,
            dap: tree.dap,
            commonName: tree.commonName,
            product_id: tree.product_id,
            meters: tree.meters,
            volumeM3: tree.volumeM3,
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
        TreeForm.setFieldValue('id', '')
        TreeForm.setFieldValue('code', '')
        TreeForm.setFieldValue('range', 0)
        TreeForm.setFieldValue('commonName', '')
        TreeForm.setFieldValue('scientificName', '')
        TreeForm.setFieldValue('product_id', '')
        TreeForm.setFieldValue('dap', 0.00)
        TreeForm.setFieldValue('meters', 0.00)
        TreeForm.setFieldValue('volumeM3', 0.00)
    }

    const onSelectProduct = (product: IProduct) => {
        TreeForm.setFieldValue('product_id', product.id)
        TreeForm.setFieldValue('scientificName', product.scientificName)
        TreeForm.setFieldValue('commonName', product.commonName)
        setTimeout(() => {
            if (codeInputRef.current) {
                codeInputRef.current.focus();
            }
        }, 0);
    }
    /*   useEffect(() => {
           if (tree) {
               TreeForm.setFieldValue('id', tree.id)
               TreeForm.setFieldValue('code', tree.code)
               TreeForm.setFieldValue('commonName', tree.commonName)
               TreeForm.setFieldValue('scientificName', tree.scientificName)
               TreeForm.setFieldValue('product_id', tree.product_id)
               TreeForm.setFieldValue('meters', tree.meters)
               TreeForm.setFieldValue('volumeM3', tree.volumeM3)
           }
       }, [tree])*/
    return (
        <Box display='flex' gap={2} component='form' onSubmit={TreeForm.handleSubmit} >
            <Grid container spacing={2} >
                <React.Fragment>
                    <Grid item xs={1}>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="caption">Cód. produto</Typography>
                            </Grid>
                            <Grid item>
                                <CustomTextField
                                    name='product_id'
                                    inputRef={productInputRef}
                                    value={TreeForm.values.product_id}
                                    onChange={TreeForm.handleChange}
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
                    <Grid item xs={1}>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="caption">N. Arvore</Typography>
                            </Grid>
                            <Grid item>
                                <CustomTextField
                                    name='code'
                                    inputRef={treeIdInputRef}
                                    value={TreeForm.values.code}
                                    onChange={TreeForm.handleChange}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            if (codeInputRef.current) {
                                                codeInputRef.current.focus();
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
                                <Typography variant="caption">Picada</Typography>
                            </Grid>
                            <Grid item>
                                <CustomTextField
                                    name='range'
                                    value={TreeForm.values.range}
                                    onChange={TreeForm.handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="caption">Cientifico</Typography>
                            </Grid>
                            <Grid item>
                                <CustomTextField
                                    name='scientificName'
                                    fullWidth
                                    value={TreeForm.values.scientificName}
                                    onChange={TreeForm.handleChange}
                                    disabled={true}
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
                                    name='commonName'
                                    fullWidth
                                    value={TreeForm.values.commonName}
                                    onChange={TreeForm.handleChange}
                                    disabled={true}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="caption">DAP</Typography>
                            </Grid>
                            <Grid item>
                                <CustomDecimalTextField
                                    name='dap'
                                    value={TreeForm.values.dap}
                                    handleChange={(e) => {
                                        TreeForm.setFieldValue('dap', e)
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
                                    value={TreeForm.values.meters}
                                    handleChange={(e) => {
                                        TreeForm.setFieldValue('meters', e)
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            if (volumeInputRef.current) {
                                                volumeInputRef.current.focus();
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
                                <CustomDecimalTextField
                                    name="volumeM3"
                                    inputRef={volumeInputRef}
                                    value={TreeForm.values.volumeM3}
                                    handleChange={(e) => {
                                        TreeForm.setFieldValue('volumeM3', e)
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='flex-end' gap={2} alignItems='center' >
                        <Button
                            ref={submitButtonRef}
                            type="button"
                            variant="contained"
                            color="inherit"
                            onClick={() => resetProduct()}
                            size="small"
                        >Cancelar</Button>
                        <Button
                            ref={submitButtonRef}
                            type="button"
                            variant="contained"
                            onClick={() => TreeForm.handleSubmit()}
                            size="small"
                        >Confirmar</Button>
                    </Grid>
                </React.Fragment>
            </Grid>
            <ProductSearchModal
                handleModal={handleModal}
                open={open}
                onSelectProduct={onSelectProduct}
            />
        </Box>
    )
}
