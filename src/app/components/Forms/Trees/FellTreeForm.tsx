"use client"

import { Autocomplete, Box, Button, Grid, IconButton, Input, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { useFormik, Formik, Form, FieldArray, Field } from "formik"
import { styled } from "@mui/material/styles"
import { IProduct } from "@/types/product/product";
import { useState, useEffect, useRef } from "react"
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import * as Yup from 'yup'
import { DecimalInput } from "@/app/components/DecimalInput/DecimalInput";
import { calculateVolume } from "@/utils/calculateVolume";
import React from "react";
import { IQueryTree, ITree } from "@/types/tree/tree";
import { ListTreesService } from "@/services/treeService";



interface FellTreeFormProps {
    handleSubmit: (item: any) => void
    data: ITree[]

}

interface ITreeFell extends Partial<ITree> {
    tree?: ITree;
    name: string;
    section?: string;
    code: string
    d1: string
    d2: string;
    d3: string
    d4: string
    meters: number
    volumeM3: number
}

const CustomTextField = styled(TextField)({})
CustomTextField.defaultProps = {
    variant: 'standard',
    size: 'small'
}
const InputContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 75
})
const CustomDecimalTextField = styled(DecimalInput)({
    width: 50
})
CustomDecimalTextField.defaultProps = {
    variant: 'standard',
    size: 'small'
}
const initialForm = {
    code: '',
    name: '',
    tree: {
        id: undefined,
        commonName: '',
        scientificName: '',
        meters: 0.00,
        volumeM3: 0.00
    } as ITree,
    tree_id: '',
    section: '',
    d1: '0.00',
    d2: '0.00',
    d3: '0.00',
    d4: '0.00',
    meters: '0.00',
    volumeM3: '0.00'
}

export const FellTreeForm = ({ handleSubmit, data }: FellTreeFormProps) => {
    const [trees, setTrees] = useState<ITree[]>([])
    const [query, setQuery] = useState<IQueryTree>({ autexIds: '', limit: 50, page: 0, count: 1, order: 'asc', orderBy: '', searchBy: '' })
    const validationSchema = Yup.object({
        id: Yup.string().nullable(),
        meters: Yup.string(),
        code: Yup.string(),
        volumeTotal: Yup.string(),
        feels: Yup.array().of(
            Yup.object().shape({
                tree_id: Yup.string(),
                code: Yup.string(),
                product_id: Yup.number(),
                section: Yup.string(),
                d1: Yup.string().required(),
                d2: Yup.string().required(),
                d3: Yup.string().required(),
                d4: Yup.string().required(),
                meters: Yup.string().required(),
                volumeTotal: Yup.string()
            })
        )
    })
    const getAutexTrees = async () => {
        const { data, total } = await ListTreesService({ autexIds: '', page: query.page, limit: query.limit, order: query.order, orderBy: query.orderBy, searchBy: query.searchBy })
        setTrees(data)
        setQuery((state) => ({ ...state, count: total }))
    }
    useEffect(() => {
        getAutexTrees()
    }, [query.order, query.orderBy, query.page, query.limit, query.searchBy])

    return (
        <Formik
            initialValues={{
                feels: [initialForm]
            }}
            onSubmit={(values) => {
                console.log(values)
            }}
            validationSchema={validationSchema}
        >
            {({ values, handleChange, setFieldValue }) => {
                return (
                    <Form noValidate autoComplete="off">
                        <FieldArray name="feels">
                            {({ insert, remove, push, }) => {
                                return (

                                    <TableContainer
                                        sx={{
                                            overflowY: 'auto',
                                            height: '100%',
                                            width: '100%'
                                        }}
                                    >
                                        <Table
                                            sx={{
                                                overflowY: 'auto',
                                                height: '100%',
                                                width: '100%'
                                            }}
                                        >
                                            <TableHead sx={{ backgroundColor: '#f0f0f0', position: 'sticky', top: 0 }}>
                                                <TableRow>
                                                    <TableCell>
                                                        Arvore
                                                    </TableCell>
                                                    <TableCell>
                                                        Nome
                                                    </TableCell>
                                                    <TableCell>
                                                        Secção
                                                    </TableCell>
                                                    <TableCell>
                                                        D1
                                                    </TableCell>
                                                    <TableCell>
                                                        D2
                                                    </TableCell>
                                                    <TableCell>
                                                        D3
                                                    </TableCell>
                                                    <TableCell>
                                                        D4
                                                    </TableCell>
                                                    <TableCell>
                                                        Comp
                                                    </TableCell>
                                                    <TableCell>
                                                        M3
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        #
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody >
                                                {values.feels.length > 0 &&
                                                
                                                    values.feels
                                                        .map((fell, index) => {
                                                            fell.volumeM3 = calculateVolume({
                                                                d1: fell.d1,
                                                                d2: fell.d2,
                                                                d3: fell.d3,
                                                                d4: fell.d4,
                                                                meters: fell.meters
                                                            }).toFixed(3);
                                                            const isLastIndex = index === values.feels.length - 1
                                                            return (
                                                                <React.Fragment>
                                                                    <TableRow key={index}>
                                                                        <TableCell>
                                                                            <Autocomplete
                                                                                fullWidth
                                                                                options={trees}
                                                                                getOptionLabel={(option) => option.code && option.code.toString() || ''}
                                                                                renderInput={(params) => <CustomTextField  {...params} />}
                                                                                value={fell.tree}
                                                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                                                onChange={(event, value) => {
                                                                                    if (value) {
                                                                                        setFieldValue(`feels[${index}].tree`, value)
                                                                                        return
                                                                                    }
                                                                                    setFieldValue(`feels[${index}].tree`, {
                                                                                        id: undefined,
                                                                                        commonName: '',
                                                                                        scientificName: '',
                                                                                        meters: 0.00,
                                                                                        volumeM3: 0.00
                                                                                    })
                                                                                }}
                                                                                renderOption={(props, option) => (
                                                                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={option.id}>
                                                                                        {option.code} {option.commonName}
                                                                                    </Box>
                                                                                )}
                                                                            >

                                                                            </Autocomplete>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <CustomTextField
                                                                                value={fell?.tree?.commonName}
                                                                                fullWidth
                                                                                onChange={handleChange}
                                                                                disabled
                                                                            >

                                                                            </CustomTextField>
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <CustomTextField
                                                                                name={`feels[${index}].section`}
                                                                                value={fell.section}
                                                                                onChange={handleChange}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <CustomDecimalTextField
                                                                                name={`feels[${index}].d1`}
                                                                                value={fell.d1}
                                                                                handleChange={(value) => {
                                                                                    setFieldValue(`feels[${index}].d1`, value);
                                                                                }}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <CustomDecimalTextField
                                                                                name={`feels[${index}].d2`}
                                                                                value={fell.d2}
                                                                                handleChange={(value) => {
                                                                                    setFieldValue(`feels[${index}].d2`, value);
                                                                                }}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <CustomDecimalTextField
                                                                                name={`feels[${index}].d3`}
                                                                                value={fell.d3}
                                                                                handleChange={(value) => {
                                                                                    setFieldValue(`feels[${index}].d3`, value);
                                                                                }}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <CustomDecimalTextField
                                                                                name={`feels[${index}].d4`}
                                                                                value={fell.d4}
                                                                                handleChange={(value) => {
                                                                                    setFieldValue(`feels[${index}].d4`, value);
                                                                                }}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <CustomDecimalTextField
                                                                                name={`feels[${index}].meters`}
                                                                                value={fell.meters}
                                                                                handleChange={(value) => {
                                                                                    setFieldValue(`feels[${index}].meters`, value);
                                                                                }}
                                                                            />
                                                                        </TableCell>
                                                                        <TableCell>{fell.volumeM3}</TableCell>
                                                                        <TableCell align="center">
                                                                            <Box display='flex' >
                                                                                <IconButton
                                                                                    onClick={() => {
                                                                                        push({ ...fell })
                                                                                    }}
                                                                                >
                                                                                    <ContentCopyIcon />
                                                                                </IconButton>
                                                                                <IconButton
                                                                                    onClick={() => {
                                                                                        remove(index)
                                                                                    }}
                                                                                >
                                                                                    <CloseIcon />
                                                                                </IconButton>
                                                                            </Box>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    {isLastIndex && (
                                                                        <TableRow>
                                                                            <TableCell colSpan={10}>
                                                                                <Box display='flex' justifyContent='center'>
                                                                                    <IconButton
                                                                                        onClick={() =>
                                                                                            push(initialForm)
                                                                                        }
                                                                                    >
                                                                                        <AddIcon />
                                                                                    </IconButton>
                                                                                </Box>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )}
                                                                </React.Fragment>

                                                            )
                                                        })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )
                            }}
                        </FieldArray>
                    </Form>
                )
            }}
        </Formik>
    )
}
