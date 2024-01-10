'use client'
import { Box, Grid, MenuItem, Paper, Select, Typography, Divider, SelectChangeEvent, Button } from "@mui/material"
import { useEffect, useState } from "react";
import { ListAutexService } from "@/services/autexService";
import { IAutex } from "@/types/autex/autex";
import { IQueryTree, ITree } from "@/types/tree/tree";
import { ListTreesService } from "@/services/treeService";
import TreesTable from "@/app/components/TreesTable/TreesTable";

const Autex = () => {
    const [selectedAutex, setSelectedAutex] = useState<string>('')
    const [autexList, setAutexList] = useState<IAutex[]>([])
    const [trees, setTrees] = useState<ITree[]>([])
    const [query, setQuery] = useState<IQueryTree>({ autexIds: '', limit: 10, page: 0, count: 1 })
    useEffect(() => {
        getAutexList()
    }, [])
    useEffect(() => {
        selectedAutex && getAutexTrees(selectedAutex)
    }, [selectedAutex, query.page, query.limit])
    const getAutexList = async () => {
        const data = await ListAutexService()
        setAutexList(data)
    }
    const onSelectAutex = (event: SelectChangeEvent<string>) => {
        setSelectedAutex(event.target.value)
    }
    const getAutexSelectedData = (id: number): IAutex | undefined => {
        return autexList.find((autex) => autex.id === id) ?? undefined;
    };
    const getAutexTrees = async (autexId: string) => {
        const { data, total } = await ListTreesService({ autexIds: autexId, page: query.page, limit: query.limit })
        setTrees(data)
        setQuery((state) => ({ ...state, count: total }))
    }
    const onRequestPageChange = (event: any, newPage: number) => {
        setQuery((state) => ({ ...state, page: newPage }))
    }
    const onChangeLimitPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuery((state) => ({ ...state, limit: parseInt(event.target.value), page: 0 }))
    }
    return (
        <Box>
            <Box
                display='flex'
                flexDirection='column'
                p={2}
                component={Paper}
                sx={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    background: '#fff',
                }}
            >
                <Typography variant="h6" fontWeight='bold'>Autex</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Select
                            fullWidth
                            placeholder="Selecione uma autex"
                            onChange={onSelectAutex}
                            value={selectedAutex}
                        >
                            {autexList.map((autex, index) => (
                                <MenuItem key={index} value={autex.id}>{autex.description}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{ marginBottom: 2 }} />
                        {selectedAutex && (
                            <Grid container spacing={1}>
                                <Grid item xs={6} >
                                    <Typography variant="body2">
                                        <span style={{ fontWeight: 'bold' }}>Code </span>{getAutexSelectedData(parseInt(selectedAutex))?.code}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} >
                                    <Typography variant="body2">
                                        <span style={{ fontWeight: 'bold' }}>Description </span>{getAutexSelectedData(parseInt(selectedAutex))?.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        )}
                        <Grid item xs>
                        </Grid>
                        <Grid item xs={3} marginTop={5}>
                            <Button size="small" variant="contained">+ Arvore</Button>
                        </Grid>
                    </Grid>
                </Grid>
                {trees?.length > 0 && trees &&
                    <TreesTable
                        data={trees}
                        onRequestPageChange={onRequestPageChange}
                        rowsPerPage={query?.limit || 10}
                        page={query.page || 0}
                        count={query.count || 1}
                        onRequestLimitChange={onChangeLimitPerPage}

                    />
                }
            </Box>
        </Box >
    )
}

export default Autex;