import { ICutFell, ITree } from "@/types/tree/tree"
import { Box, Button, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import React, { useEffect, useState } from "react"
import { FellTreeForm } from "./FellTreeForm"
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { createTransaction } from "@/services/transactionService";
import { IAutex } from "@/types/autex/autex";
import { ICreateTransaction, transactionTypes } from "@/types/transaction/transaction";
import { ICreateItem } from "@/types/items/item";

interface FellTreesTableProps {
    trees: ITree[]
    autex: IAutex
}

export const FellTreesTable = ({ trees, autex }: FellTreesTableProps) => {
    const [data, setData] = useState<ICutFell[]>([])
    const [fellingTree, setFellingTree] = useState<number | undefined>(trees[0].id)
    const handleSubmit = (value: ICutFell) => {
        const newValue: ICutFell[] = data.map((tree) => {
            if (tree.id === value.id) {
                return {
                    ...tree,

                    items: value.items
                }
            }
            return tree
        })
        setData(newValue)
        const currentIndex = data.findIndex((tree) => tree.id === value.id)
        if (currentIndex < data.length - 1) {
            setFellingTree(trees[currentIndex + 1].id)
        } else {
            setFellingTree(undefined)
        }
    }
    useEffect(() => {
        const newData: ICutFell[] = trees.map((item: ITree) => {
            return {
                id: item.id,
                meters: item.meters,
                autex_id: item.autex_id,
                dap: item.dap,
                product_id: item.product_id,
                code: item.code,
                commonName: item.commonName,
                scientificName: item.scientificName,
                volumeM3: item.volumeM3,
                inventory_id: autex.inventory?.id ?? 0,
                items: []

            }
        })
        setData(newData)
    }, [])
    const onSubmit = async () => {
        const body: ICreateTransaction = {
            type: transactionTypes.FELL,
            inventory_id: autex.inventory?.id ?? 0,
            document: '',
            items: data.flatMap((obj: any) => obj.items)

        }
        await createTransaction(body).then((response) => {

        })
    }
    return (
        data.length > 0 &&
        <Box>
            <TableContainer>
                <Table sx={{ minHeight: 550 }} >
                    <TableHead>
                        <TableCell align="center">
                            Arvore
                        </TableCell>
                        <TableCell align="left">
                            Nome
                        </TableCell>
                        <TableCell align="center">
                            Altura
                        </TableCell>
                        <TableCell align="center">
                            DAP
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
                            const volumeM3Felled = item.items?.reduce((acc, b) => {
                                const volume = parseFloat(b.volumeM3);
                                if (!isNaN(volume)) {
                                    return acc + volume;
                                }
                                return acc;
                            }, 0).toFixed(3)
                            return (
                                <React.Fragment key={index}>
                                    <TableRow sx={{ borderBottom: 'unset' }}>
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
                                            {item.dap}
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
                                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
            <Box
                display='flex'
                justifyContent='flex-end'
                sx={{
                    gap: '10px'
                }}>
                <Button variant="contained" color="inherit">
                    Cancelar
                </Button>
                <Button onClick={onSubmit} variant="contained">
                    Salvar
                </Button>
            </Box>
        </Box >
    )
}

