"use client"

import {  Box, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material"
import {  Formik, Form, FieldArray } from "formik"
import { styled } from "@mui/material/styles"
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import * as Yup from 'yup'
import { DecimalInput } from "@/app/components/DecimalInput/DecimalInput";
import { calculateVolume } from "@/utils/calculateVolume";
import React from "react";
import { ITree } from "@/types/tree/tree";


interface FellTreeFormProps {
    handleSubmit: (item: any) => void
    data: CustomTree
}
interface CustomTree extends ITree {
    feels?: fell[]
}
type fell = {
    tree_id: number | undefined;
    section: string
    code: string
    d1: string
    d2: string;
    d3: string
    d4: string
    meters: string
    volumeM3: string
}
const CustomTextField = styled(TextField)({
    width: '50px'
})
CustomTextField.defaultProps = {
    variant: 'standard',
    size: 'small',
    inputProps: {
        style: {
            textAlign: 'center'
        }
    }
}
const CustomDecimalTextField = styled(DecimalInput)({
    width: 50
})
CustomDecimalTextField.defaultProps = {
    variant: 'standard',
    size: 'small',
    inputProps: {
        style: {
            textAlign: 'center'
        }
    }
}

export const FellTreeForm = ({ handleSubmit, data }: FellTreeFormProps) => {
    const initialForm: fell[] = [{
        code: data.code,
        tree_id: data.id,
        section: '',
        d1: '',
        d2: '',
        d3: '',
        d4: '',
        meters: '',
        volumeM3: '0.00'
    }]
    const validationSchema = Yup.object({
        id: Yup.string(),
        code: Yup.string(),
        feels: Yup.array().required().of(
            Yup.object().required().shape({
                tree_id: Yup.string(),
                code: Yup.string(),
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
    return (
        <Formik
            initialValues={{
                id: data.id,
                code: data.code,
                feels: data.feels && data.feels?.length > 0 ? data.feels : initialForm
            }}
            onSubmit={(values) => {
                handleSubmit(values)
            }}
            validationSchema={validationSchema}
        >
            {({ values, handleChange, setFieldValue }) => {
                return (
                    <Form noValidate autoComplete="off">
                        <FieldArray name="feels">
                            {({ insert, remove, push }) => {
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
                                            {values.feels.length > 0 && values.feels
                                                .map((fell, index) => {
                                                    fell.volumeM3 = calculateVolume({
                                                        d1: fell.d1,
                                                        d2: fell.d2,
                                                        d3: fell.d3,
                                                        d4: fell.d4,
                                                        meters: fell.meters.toString()
                                                    }).toFixed(3);
                                                    const isLastIndex = index === values.feels.length - 1
                                                    const TotalM3 = values.feels.reduce((acc, b) => {
                                                        if (b.tree_id === fell.tree_id) {
                                                            return acc + parseFloat(b.volumeM3);
                                                        }
                                                        return acc;
                                                    }, 0).toFixed(3)
                                                    const difTotalM3 = (parseFloat(TotalM3) - data.volumeM3).toFixed(3)
                                                    const allowRemove = values.feels.length > 1
                                                    return (
                                                        <React.Fragment>
                                                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 2 } }}>
                                                                <TableCell align="center">
                                                                    <CustomTextField
                                                                        name={`feels[${index}].section`}
                                                                        value={fell.section}
                                                                        onChange={handleChange}

                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <CustomDecimalTextField
                                                                        name={`feels[${index}].d1`}
                                                                        value={fell.d1}
                                                                        handleChange={(value) => {
                                                                            setFieldValue(`feels[${index}].d1`, value);
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <CustomDecimalTextField
                                                                        name={`feels[${index}].d2`}
                                                                        value={fell.d2}
                                                                        handleChange={(value) => {
                                                                            setFieldValue(`feels[${index}].d2`, value);
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <CustomDecimalTextField
                                                                        name={`feels[${index}].d3`}
                                                                        value={fell.d3}
                                                                        handleChange={(value) => {
                                                                            setFieldValue(`feels[${index}].d3`, value);
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <CustomDecimalTextField
                                                                        name={`feels[${index}].d4`}
                                                                        value={fell.d4}
                                                                        handleChange={(value) => {
                                                                            setFieldValue(`feels[${index}].d4`, value);
                                                                        }}
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <CustomDecimalTextField
                                                                        name={`feels[${index}].meters`}
                                                                        value={fell.meters}
                                                                        handleChange={(value) => {
                                                                            setFieldValue(`feels[${index}].meters`, value);
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
                                                                            disabled={!allowRemove}
                                                                            onClick={() => { remove(index) }}>
                                                                            <CloseIcon />
                                                                        </IconButton>
                                                                    </Box>
                                                                </TableCell>
                                                            </TableRow >
                                                            {isLastIndex && (
                                                                <React.Fragment>
                                                                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                                        <TableCell colSpan={6}>
                                                                            <Box display='flex' justifyContent='center'>
                                                                                <IconButton
                                                                                    onClick={() => {
                                                                                        push({
                                                                                            code: data.code,
                                                                                            tree_id: data.id,
                                                                                            section: '',
                                                                                            d1: '',
                                                                                            d2: '',
                                                                                            d3: '',
                                                                                            d4: '',
                                                                                            meters: '',
                                                                                            volumeM3: '0.00'
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
                                                                        <TableCell align="center">
                                                                            Dif. {difTotalM3}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                                        <TableCell colSpan={7} >
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            <Button type='submit' variant="contained">Salvar</Button>
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
                    </Form>
                )
            }}
        </Formik >
    )
}
