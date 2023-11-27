"use client"
import { transactionTypes } from "@/types/transaction/transaction"
import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from "@mui/material"
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useState } from "react";
import { IItem } from "@/types/items/item";
import React, { useEffect } from "react";
import ItemsList from "./components/ItemList";
import { createTransaction } from "@/services/transactionService";
import ToastMessage from '@/app/components/Toast';
import { ItemForm } from "../Item/ItemCreateForm";
import { ListInventorys } from "@/services/inventoryService";
import { inventory } from "@/types/inventory/inventory";

interface TransactionAddFormProps {
    onSucces: (item: IItem) => void
    onCancel: () => void
}

const TransactionAddForm = ({ onSucces, onCancel }: TransactionAddFormProps) => {
    const [inventorysList, setInventoryList] = useState<inventory[]>([])
    const [item, setItem] = useState<IItem | null>(null)
    useEffect(() => {
        getInventorys()
    }, [])
    const getInventorys = async () => {
        const response = await ListInventorys({})
        setInventoryList(response)
    }
    const validationSchema = Yup.object({
        id: Yup.number(),
        transactionType: Yup.string().required('Campo obrigatório'),
        document: Yup.string(),
        inventory_id: Yup.string().when('transactionType', ([value], schema) => {
            return value === transactionTypes.ADD ? schema.required('Campo obrigatório') : schema.nullable()
        }),
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
            transactionType: "add",
            inventory_id: '1',
            document: '',
            items: [] as IItem[],
        },
        validationSchema: validationSchema,
        onSubmit: async (values, helper) => {
            await createTransaction(values).then((response) => {
                ToastMessage({ type: 'success', message: 'Transação criada com sucesso!.' })
                onSucces(response)
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

    const addItem = (value: any) => {
        if (!item) {
            formik.setFieldValue('items', [...formik.values.items, value])
            return
        }
        const newItems = formik.values.items.map((state) => {
            if (state.id === item.id) return value
            return state
        })
        formik.setFieldValue('items', newItems)
        setItem(null)
    }

    const handleEditItem = (item: IItem) => {
        setItem(item)
    }
    const handleCancel = () => {
        formik.resetForm()
        if (onCancel) {
            onCancel()
        }
    }
    return (
        <Box component='form' onSubmit={formik.handleSubmit} >
            <Grid container spacing={2}>
                {formik.values.transactionType === transactionTypes.ADD &&
                    <Grid item xs={6}>
                        <Typography variant="caption" fontWeight='bolder'>Inventário*</Typography>
                        <Select
                            fullWidth
                            label='Patio'
                            size="small"
                            name='inventory_id'
                            disabled={formik.values.items.length > 0}
                            placeholder="Selecione o tipo de transação..."
                            value={formik.values.inventory_id}
                            onChange={formik.handleChange}
                        >
                            {inventorysList.map((inventory) => (
                                <MenuItem key={inventory.id} value={inventory.id}>{inventory.name}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                }
                <Grid item xs={6} container>
                    <Grid item xs={12}>
                        <Typography variant="caption" fontWeight='bolder'>DOF</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name='document'
                            fullWidth
                            value={formik.values.document}
                            onChange={formik.handleChange}
                            size="small"
                        >

                        </TextField>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <ItemForm
                        handleSubmit={addItem}
                        inventorySelected={formik.values.inventory_id}
                        item={item}
                    />
                </Grid>
            </Grid>
            <ItemsList
                items={formik.values.items}
                allowEdit={true}
                removeItem={(index, selectedItem) => {
                    const items = formik.values.items.slice();
                    items.splice(index, 1);
                    formik.setFieldValue('items', items);
                }}
                editItem={handleEditItem}
            />
            <Box display='flex' justifyContent='flex-end' gap={1}>
                <Button onClick={handleCancel} variant="contained" color="inherit">Cancelar</Button>
                <Button type="submit" variant="contained">Salvar</Button>
            </Box>
        </Box >


    )
}

export default TransactionAddForm