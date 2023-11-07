"use client"

import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from "@mui/material"
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useState } from "react";
import { IItem } from "@/types/items/item";
import React, { useEffect } from "react";
import ItemsList from "./components/ItemList";
import { createTransaction } from "@/services/transactionService";
import ToastMessage from '@/app/components/Toast';
import ItemsSearchModal from "../../ItemsSearchModal/ItemsSearchModal";
import Search from '@mui/icons-material/Search'

interface TransactionRemoveFormProps {
    items: IItem[] | []
    onCancel?: () => void
    onSucces?: (result: any) => void
}

const TransactionRemoveForm = ({ items, onCancel, onSucces }: TransactionRemoveFormProps) => {
    const [open, setOpen] = useState<boolean>(false)

    const handleModal = () => {
        setOpen((state) => !state)
    }
    const handleCancel = () => {
        formik.resetForm()
        if (onCancel) {
            onCancel()
            return
        }
    }
    const validationSchema = Yup.object({
        id: Yup.number(),
        transactionType: Yup.string().required('Campo obrigatório'),
        items: Yup.array().of(
            Yup.object().shape({
                code: Yup.string().required(),
                section: Yup.string(),
                product: Yup.string(),
                d1: Yup.string(),
                d2: Yup.string(),
                d3: Yup.string(),
                d4: Yup.string(),
                meters: Yup.string(),
            }),
        ).min(1, 'pelo menos 1 item')

    })
    const formik = useFormik({
        initialValues: {
            id: '',
            transactionType: "remove",
            inventory_id: '',
            items: items || [] as IItem[],
        },
        validationSchema: validationSchema,
        onSubmit: async (values, helper) => {
            await createTransaction(values).then((response) => {
                ToastMessage({ type: 'success', message: 'Transação criada com sucesso!.' })
                helper.resetForm()
                if (onSucces) {
                    onSucces(response)
                }
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
    return (
        <Box component='form' onSubmit={formik.handleSubmit} >
            <Grid container spacing={2}>
                <Grid item xs>
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
                </Grid>
            </Grid>
            <ItemsList
                items={formik.values.items}
                allowEdit={false}
                removeItem={(index, selectedItem) => {
                    const items = formik.values.items.slice();
                    items.splice(index, 1);
                    formik.setFieldValue('items', items);
                }}
            />
            <Box display='flex' justifyContent='flex-end' gap={1}>
                <Button onClick={handleCancel} variant="contained" color="inherit">Cancelar</Button>
                <Button type="submit" variant="contained">Salvar</Button>
            </Box>
        </Box >


    )
}

export default TransactionRemoveForm