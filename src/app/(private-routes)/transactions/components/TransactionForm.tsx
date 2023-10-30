"use client"
import { transactionTypes } from "@/types/transaction/transaction"
import { Box, Button, Grid, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { useState } from "react";
import { IItem } from "@/types/items/item";
import React, { useEffect } from "react";
import ItemsSearchModal from "@/app/components/ItemsSearchModal/ItemsSearchModal";
import ItemsList from "../transaction/components/ItemsList";
import { createTransaction, findOneTransaction, updateTransaction } from "@/services/transactionService";
import ToastMessage from '@/app/components/Toast';
import { ItemForm } from "../transaction/components/itemForm";
import Search from '@mui/icons-material/Search'
import { ListInventorys } from "@/services/inventoryService";
import { inventory } from "@/types/inventory/inventory";

interface savedItemsProps {
    type: string
    items: IItem[]
}

const TransactionForm = ({ transactionId }: { transactionId: string }) => {
    const [open, setOpen] = useState<boolean>(false)
    const [savedItems, setSavedItems] = useState<savedItemsProps>({ type: '', items: [] })
    const isEditing = !!transactionId
    const [inventorysList, setInventoryList] = useState<inventory[]>([])
    const [item, setItem] = useState<IItem | null>(null)

    useEffect(() => {
        getInventorys()
    }, [])

    const getInventorys = async () => {
        const response = await ListInventorys({})
        setInventoryList(response)
    }
    const handleModal = () => {
        setOpen((state) => !state)
    }
    const validationSchema = Yup.object({
        id: Yup.number(),
        transactionType: Yup.string().required('Campo obrigatório'),
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
                meters: Yup.string()
            }),
        ).min(1, 'pelo menos 1 item')

    })
    if (isEditing) {
        validationSchema.shape({
            updatedItems: Yup.array().of(Yup.object().shape({
                id: Yup.number(),
                code: Yup.string().required(),
                section: Yup.string(),
                product: Yup.string(),
                d1: Yup.string(),
                d2: Yup.string(),
                d3: Yup.string(),
                d4: Yup.string(),
                meters: Yup.string()
            }))
        });
    }
    const formik = useFormik({
        initialValues: {
            id: '',
            transactionType: "",
            inventory_id: '',
            updatedItems: [],
            items: [] as IItem[],
            addItems: []
        },
        validationSchema: validationSchema,
        onSubmit: async (values, helper) => {
            if (isEditing) {
                await updateTransaction(values.id, values).then((response) => {
                    ToastMessage({ type: 'success', message: 'Transação atualizada com sucesso!.' })
                }).catch((error) => {
                    ToastMessage({ type: 'error', message: 'Não foi possivel atualizar a transação!.' })
                }).finally(() => {
                    formik.setFieldValue('updatedItems', [])
                    formik.setFieldValue('addItems', [])
                })
            } else {
                await createTransaction(values).then((response) => {
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
        }
    })
    const addSelectItems = (items: IItem[]) => {
        formik.setFieldValue('items', [...formik.values.items, ...items])
    }
    const addItem = (value: any) => {
        if (item) {
            const newItems = formik.values.items.map((state) => {
                if (state.id === item.id) {
                    return value
                } else {
                    return state
                }
            })
            formik.setFieldValue('items', newItems)
            if (isEditing) {
                formik.setFieldValue('updatedItems', [...formik.values.updatedItems, value])
            }
            setItem(null)
        } else {
            formik.setFieldValue('items', [...formik.values.items, value])
        }
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

    useEffect(() => {
        if (isEditing) {
            fetchTransaction()
        }
    }, [isEditing])

    const fetchTransaction = async () => {
        const id = parseInt(transactionId)
        await findOneTransaction(id).then((response) => {
            formik.setFieldValue('id', response.id)
            formik.setFieldValue('inventory_id', response.inventory_id)
            formik.setFieldValue('transactionType', response.transactionType)
            formik.setFieldValue('items', response.transactionItems.map((item: any) => item.item))
        })
    }
    const handleEditItem = (item: IItem) => {
        setItem(item)
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
                            disabled={isEditing}
                            onChange={handleChangeTransactionType}
                            value={formik.values.transactionType}
                        >
                            <MenuItem value={transactionTypes.ADD}>Entrada</MenuItem>
                            <MenuItem value={transactionTypes.REMOVE}>Saida</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    {formik.values.transactionType === transactionTypes.ADD &&
                        <Grid item xs={12}>
                            <Typography variant="overline" fontWeight='bolder'>Inventário*</Typography>
                            <Select
                                fullWidth
                                label='Patio'
                                name='inventory_id'
                                disabled={isEditing || formik.values.items.length > 0}
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
                    <Grid item xs={12}>
                        {formik.values.transactionType === transactionTypes.ADD && (
                            <ItemForm
                                handleSubmit={addItem}
                                inventorySelected={formik.values.inventory_id}
                                item={item}
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
                    allowEdit={isEditing || formik.values.transactionType !== transactionTypes.REMOVE}
                    removeItem={(index, selectedItem) => {
                        const items = formik.values.items.slice();
                        items.splice(index, 1);
                        formik.setFieldValue('items', items);
                    }}
                    editItem={handleEditItem}
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