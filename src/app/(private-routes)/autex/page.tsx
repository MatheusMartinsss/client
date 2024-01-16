'use client'
import { Box, Grid, MenuItem, Paper, Select, Typography, Divider, SelectChangeEvent, Button } from "@mui/material"
import { useEffect, useState } from "react";
import { ListAutexService } from "@/services/autexService";
import { IAutex } from "@/types/autex/autex";
import { IQueryTree, ITree } from "@/types/tree/tree";
import { ListTreesService } from "@/services/treeService";
import TreesTable from "@/app/components/TreesTable/TreesTable";
import Modal from "@/app/components/Modal/Modal";
import { TreeForm } from "@/app/components/Forms/Trees/TreeForm";
import { CreateTrees } from "@/app/components/Forms/Trees/CreateTrees";
import { TreeImportForm } from "@/app/components/Forms/Trees/TreeImportForm";

enum Forms {
    createForm = "addForm",
    importForm = 'importForm'
}

const Autex = () => {
    const [selectedAutex, setSelectedAutex] = useState<string>('')
    const [autexList, setAutexList] = useState<IAutex[]>([])
    const [trees, setTrees] = useState<ITree[]>([])
    const [query, setQuery] = useState<IQueryTree>({ autexIds: '', limit: 10, page: 0, count: 1 })
    const [open, setOpen] = useState<boolean>(false)
    const [form, setForm] = useState<Forms>()
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
    const getAutexSelectedData = (id: string): IAutex | undefined => {
        return autexList.find((autex) => autex.id === parseInt(id)) ?? undefined;
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
    const handleOpen = (form: Forms) => {
        setForm(form)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
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
                    <Grid item xs={12}>
                        <Divider sx={{ marginBottom: 2 }} />
                    </Grid>
                    {selectedAutex && (
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={6} >
                                    <Typography variant="body2">
                                        <span style={{ fontWeight: 'bold' }}>Code </span>{getAutexSelectedData(selectedAutex)?.code}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} >
                                    <Typography variant="body2">
                                        <span style={{ fontWeight: 'bold' }}>Description </span>{getAutexSelectedData(selectedAutex)?.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item >
                            </Grid>
                            <Grid item xs marginTop={5} display='flex' gap={2} >
                                <Button onClick={() => handleOpen(Forms.createForm)} size="small" variant="contained">+ Arvore</Button>
                                <Button onClick={() => handleOpen(Forms.importForm)} size="small" variant="contained">Importar Arvores</Button>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
                {trees?.length > 0 && trees &&
                    <TreesTable
                        data={trees}
                        onRequestPageChange={onRequestPageChange}
                        rowsPerPage={query?.limit}
                        page={query.page}
                        count={query.count}
                        onRequestLimitChange={onChangeLimitPerPage}
                    />
                }
                <Modal
                    handleModal={handleClose}
                    open={open}
                    title='Arvores'
                    fullWidth
                >
                    {form === Forms.createForm && selectedAutex && (
                        <CreateTrees
                            autex={getAutexSelectedData(selectedAutex)}
                        />
                    )}
                    {form === Forms.importForm && (
                        <TreeImportForm
                            autex={getAutexSelectedData(selectedAutex)}
                        />
                    )}
                </Modal>
            </Box>
        </Box >
    )
}

export default Autex;