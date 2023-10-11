"use client"
import { transactionTypes } from "@/types/transaction/transaction"
import { Autocomplete, Box, Button, Divider, Grid, MenuItem, Paper, Select, TextField } from "@mui/material"
import * as Yup from 'yup'
import { FieldArray, Formik, useFormik } from 'formik';
import { useEffect, useState } from "react";
import { ListInventorys } from "@/services/inventoryService";
import { inventory } from "@/types/inventory/inventory";
import { IItem } from "@/types/items/item";
import { ListItems } from "@/services/itemService";
import React from "react";
import ItemsSearchModal from "@/app/components/ItemsSearchModal/ItemsSearchModal";
import ItemsList from "../transaction/components/ItemsList";


const TransactionForm = () => {
    const [inventorysList, setInventoryList] = useState<inventory[]>([])
    const [listItems, setListItems] = useState<IItem[]>([])
    const [open, setOpen] = useState<boolean>(false)
    useEffect(() => {
        getInventorys()
        getItems()
    }, [])

    const handleModal = () => {
        setOpen((state) => !state)
    }

    const getInventorys = async () => {
        await ListInventorys({})
            .then((response) => {
                setInventoryList(response)
            }).catch((error) => {
                console.log(error)
            })
    }
    const getItems = async () => {
        await ListItems({}).then((response) => {
            setListItems(response)
        }).catch((error) => {
            console.log(error)
        })
    }
    const validationSchema = Yup.object({
        type: Yup.string().required('Campo obrigatório'),
        inventory: Yup.string(),
        items: Yup.array().of(
            Yup.object().shape({
                code: Yup.string().required(),
                section: Yup.string().required(),
                product: Yup.string().required(''),
                d1: Yup.number().required(),
                d2: Yup.number().required(),
                d3: Yup.number().required(),
                d4: Yup.number().required(),
                meters: Yup.number().required()
            })
        )
    })

    return (
        <Box>
            <Formik
                initialValues={{
                    type: "",
                    inventory: '',
                    items: [{
                        code: undefined,
                        section: '',
                        product: undefined,
                        d1: 0,
                        d2: 0,
                        d3: 0,
                        d4: 0,
                        meters: 0,
                        name: '',
                        volumeM3: 0,
                    }] as IItem[]
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => console.log(values)}

            >
                {formik => (
                    <Box padding={4} component='form' onSubmit={formik.handleSubmit} >
                        <Grid container spacing={2}>
                            <Grid item xs={6} >
                                <Select
                                    id='type'
                                    name="type"
                                    fullWidth
                                    label='Tipo'
                                    onChange={formik.handleChange}
                                    value={formik.values.type}
                                >
                                    <MenuItem value={transactionTypes.ADD}>Entrada</MenuItem>
                                    <MenuItem value={transactionTypes.REMOVE}>Saida</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                            {inventorysList.length > 0 &&
                                <Grid item xs={6}>
                                    <Select
                                        fullWidth
                                        disabled={formik.values.type === transactionTypes.REMOVE}
                                        label='Patio'
                                        name='inventory'
                                        value={formik.values.inventory}
                                        onChange={formik.handleChange}
                                    >
                                        {inventorysList.map((inventory) => (
                                            <MenuItem key={inventory.id} value={inventory.id}>{inventory.name}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>

                            }
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={handleModal} variant="contained">Adicionar</Button>
                            </Grid>
                        </Grid>
                        <ItemsSearchModal
                            open={open}
                            items={listItems}
                            handleModal={handleModal}
                            handleItems={(items: any) => formik.setFieldValue('items', [...formik.values.items, ...items])}
                        />
                        <ItemsList items={formik.values.items} />
                    </Box >
                )}
            </Formik >
        </Box>

    )
}

export default TransactionForm