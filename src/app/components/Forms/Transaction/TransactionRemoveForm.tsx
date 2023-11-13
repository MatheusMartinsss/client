"use client"

import { Box, Button, Grid, IconButton, TextField, Typography } from "@mui/material"
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
import FilterDateInput from "../../FilterDateInput/FilterDateInput";
import { format } from "date-fns";
import { ListItems } from "@/services/itemService";

interface TransactionRemoveFormProps {
    items: IItem[] | []
    onCancel?: () => void
    onSucces?: (result: any) => void
}

const TransactionRemoveForm = ({ items, onCancel, onSucces }: TransactionRemoveFormProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const [query, setQuery] = useState({ searchBy: '' })
    const [listItems, setListItems] = useState<IItem[]>([])

    useEffect(() => {
        getItemsOnModalOpen()
    }, [query])

    const getItemsOnModalOpen = async (): Promise<void> => {
        if (open) {
            const response = await ListItems({ searchBy: query.searchBy })
            setListItems(response)
        }
    }
    const openModal = async () => {
        const result = await ListItems({ searchBy: query.searchBy })
        if (!query.searchBy || query.searchBy && result.length > 1) {
            setListItems(result)
            setOpen(true)
            return
        }
        setQuery((state) => ({ ...state, searchBy: '' }))
        result.map((item: IItem) => { return addItem(item) })
    }
    const closeModal = () => {
        setOpen(false)
    }
    const handleCancel = () => {
        formik.resetForm()
        if (onCancel) {
            onCancel()
            return
        }
    }
    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            //@ts-ignore
            const { target: { value } } = event
            openModal()
        }
    }
    const onChangeFilterText = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (e.target.value) {
            setQuery((state) => ({ ...state, searchBy: e.target.value }))
        } else {
            setQuery((state) => ({ ...state, searchBy: '' }))
        }
    }
    const validationSchema = Yup.object({
        id: Yup.number(),
        transactionType: Yup.string().required('Campo obrigatório'),
        archivedAt: Yup.string(),
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
            archivedAt: format(new Date(), 'yyyy-MM-dd'),
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
    const addItem = (item: IItem) => {
        formik.setFieldValue('items', [...formik.values.items, item])
    }
    return (
        <Box component='form' onSubmit={formik.handleSubmit} >
            <Grid container spacing={2}>
                <Grid item xs display='flex' flexDirection='column'>
                    <Typography variant="caption" fontWeight='bolder'>Procurar</Typography>
                    <TextField
                        placeholder="Plaqueta do iem..."
                        size="small"
                        value={query.searchBy}
                        onChange={({ target: { value } }) => setQuery((state) => ({ ...state, searchBy: value }))}
                        onKeyDown={handleKeyDown}
                        type="search"
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={openModal}>
                                    <Search />
                                </IconButton>
                            )
                        }}
                    ></TextField>
                    <ItemsSearchModal
                        open={open}
                        onChangeText={onChangeFilterText}
                        listItems={listItems}
                        query={query}
                        handleModal={openModal}
                        closeModal={closeModal}
                        handleItems={(items) => addSelectItems(items)}
                        itemsSelected={formik.values.items}
                    />
                </Grid>
                <Grid item xs display='flex' flexDirection='column'>
                    <Typography variant="caption" fontWeight='bolder'>Dt. Baixa</Typography>
                    <FilterDateInput
                        value={formik.values.archivedAt.toString()}
                        onChange={(value) => {
                            formik.setFieldValue('archivedAt', value)
                        }}
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