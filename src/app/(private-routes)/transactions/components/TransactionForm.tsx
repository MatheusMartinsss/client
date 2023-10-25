"use client"
import { transactionTypes } from "@/types/transaction/transaction"
import { Box, Button, Divider, Grid, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useState } from "react";
import { IItem } from "@/types/items/item";
import React, { useEffect } from "react";
import ItemsSearchModal from "@/app/components/ItemsSearchModal/ItemsSearchModal";
import ItemsList from "../transaction/components/ItemsList";
import { createTransaction } from "@/services/transactionService";
import ToastMessage from '@/app/components/Toast';
import { ItemForm } from "../transaction/components/itemForm";
import Search from '@mui/icons-material/Search'
interface savedItemsProps {
    type: string
    items: IItem[]
}

const TransactionForm = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [savedItems, setSavedItems] = useState<savedItemsProps>({ type: '', items: [] })
    const handleModal = () => {
        setOpen((state) => !state)
    }
    const validationSchema = Yup.object({
        transactionType: Yup.string().required('Campo obrigatório'),
        inventory_id: Yup.string().when('transactionType', ([value], schema) => {
            return value === transactionTypes.ADD ? schema.required('Campo obrigatório') : schema.nullable()
        }),
        items: Yup.array().of(
            Yup.object().shape({
                id: Yup.number(),
                code: Yup.string().required(),
                section: Yup.string(),
                product: Yup.string(),
                d1: Yup.string(),
                d2: Yup.string(),
                d3: Yup.string(),
                d4: Yup.string(),
                meters: Yup.string()
            }),
        ).min(1, 'pelo menos 1 item')
    })
    const formik = useFormik({
        initialValues: {
            transactionType: "",
            inventory_id: '',
            items: [] as IItem[]
        },
        validationSchema: validationSchema,
        onSubmit: async (values, helper) => {
            await createTransaction(values)
                .then((response) => {
                    ToastMessage({ type: 'success', message: 'Transação criada com sucesso!.' })
                    helper.resetForm()
                    return
                }).catch((error) => {
                    if (error.message) {
                        ToastMessage({ type: 'error', message: error.message })
                        return
                    }
                    ToastMessage({ type: 'error', message: 'Ocorreu um erro inesperado!.' })
                    return
                })
        }
    })
    const addSelectItems = (items: IItem[]) => {
        formik.setFieldValue('items', [...formik.values.items, ...items])
    }
    const addItem = (value: any) => {
        formik.setFieldValue('inventory_id', value.inventory_id)
        formik.setFieldValue('items', [...formik.values.items, value])
    }
    const handleChangeTransactionType = (e: SelectChangeEvent) => {
        const { transactionType, items } = formik.values
        if (transactionType === '' || items.length === 0) {
            return formik.setFieldValue('transactionType', e.target.value)
        }
        const oldItems = items
        const oldTransactionType = transactionType
        formik.setFieldValue('items', savedItems.items)
        formik.setFieldValue('transactionType', e.target.value)
        setSavedItems({ type: oldTransactionType, items: oldItems })
        return


    }
    return (
        <Box component={Paper}>
            <Box padding={4} component='form' onSubmit={formik.handleSubmit} >
                <Grid container spacing={2}>
                    <Grid item xs={6} >
                        <Typography variant="overline" fontWeight='bolder'>Transação</Typography>
                        <Select
                            id='type'
                            name="transactionType"
                            fullWidth
                            label='Tipo'
                            onChange={handleChangeTransactionType}
                            value={formik.values.transactionType}
                        >
                            <MenuItem value={transactionTypes.ADD}>Entrada</MenuItem>
                            <MenuItem value={transactionTypes.REMOVE}>Saida</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={12}>
                        {formik.values.transactionType === transactionTypes.ADD && (
                            <ItemForm
                                handleSubmit={addItem}
                                inventorySelected={formik.values.inventory_id}
                            />
                        )}
                        {formik.values.transactionType === transactionTypes.REMOVE && (
                            <React.Fragment>
                                <TextField
                                    onClick={handleModal}
                                    placeholder="Procurar items..."
                                    size="small"
                                    type="search"
                                    InputProps={{
                                        endAdornment: (
                                            <Search />
                                        )
                                    }}
                                ></TextField>
                                <ItemsSearchModal
                                    open={open}
                                    handleModal={handleModal}
                                    handleItems={(items) => addSelectItems(items)}
                                    itemsSelected={formik.values.items}
                                />
                            </React.Fragment>
                        )}
                    </Grid>
                </Grid>
                <ItemsList
                    items={formik.values.items}
                    removeItem={(index) => {
                        const items = formik.values.items.slice();
                        items.splice(index, 1);
                        formik.setFieldValue('items', items);
                    }}
                />
                <Box display='flex' justifyContent='flex-end' gap={1}>
                    <Button onClick={() => formik.resetForm()} variant="contained" color="inherit">Cancelar</Button>
                    <Button type="submit" variant="contained">Salvar</Button>
                </Box>
            </Box >
        </Box>

    )
}

export default TransactionForm