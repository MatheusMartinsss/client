import { ITree } from "@/types/tree/tree"
import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import React, { useState } from "react"
import { FellTreeForm } from "./FellTreeForm"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
interface FellTreesTableProps {
    initialValue: ITreeFell[]
}

interface ITreeFell extends ITree {
    id?: number | undefined;
    meters: number
    code: string;
    commonName: string;
    scientificName: string;
    volumeM3: number
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

export const FellTreesTable = ({ initialValue }: FellTreesTableProps) => {
    const [data, setData] = useState<ITreeFell[]>(initialValue)
    const [fellingTree, setFellingTree] = useState<number | undefined>(initialValue[0].id)
    const handleSubmit = (value: ITreeFell) => {
        const newValue = data.map((tree) => {
            if (tree.id === value.id) {
                return {
                    ...tree,
                    feels: value.feels
                }
            }
            return tree
        })
        setData(newValue)
        const currentIndex = data.findIndex((tree) => tree.id === value.id)
        if (currentIndex < data.length - 1) {
            setFellingTree(initialValue[currentIndex + 1].id)
        } else {
            setFellingTree(undefined)
        }
    }
    return (
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650, minHeight: 550 }} aria-label="simple table">
                <TableHead>
                    <TableCell align="center">
                        Arvore
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                        Nome
                    </TableCell>
                    <TableCell align="center">
                        Altura
                    </TableCell>
                    <TableCell align="center">
                        M3
                    </TableCell>
                    <TableCell align="center">
                        Total Abate M3
                    </TableCell>
                    <TableCell align="center">
                        #
                    </TableCell>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => {
                        const isFelling = item.id === fellingTree
                        const volumeM3Felled = item.feels?.reduce((acc, b) => {
                            const volume = parseFloat(b.volumeM3);
                            if (!isNaN(volume)) { 
                                return acc + volume;
                            }
                            return acc;
                        }, 0).toFixed(3)
                        return (
                            <React.Fragment key={index}>
                                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                    <TableCell align="center">
                                        {item.code}
                                    </TableCell>
                                    <TableCell align="left">
                                        {item.commonName} {item.scientificName}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.meters}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.volumeM3}
                                    </TableCell>
                                    <TableCell align="center">
                                        {volumeM3Felled}
                                    </TableCell>
                                    <TableCell align="center">
                                        {isFelling ? (
                                            <IconButton onClick={() => {
                                                setFellingTree(undefined)
                                            }}>
                                                <ArrowUpwardIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton onClick={() => {
                                                setFellingTree(item.id)
                                            }}>
                                                <ArrowDownwardIcon />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                        <Collapse in={isFelling} timeout="auto" unmountOnExit>
                                            <Box margin={1}>
                                                <FellTreeForm
                                                    data={item}
                                                    handleSubmit={handleSubmit}
                                                />
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>

    )
}

{/*  <TableCell>
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
                                                                                        </TableCell> */}