'use client'
import { Box, Grid, MenuItem, Paper, Select, Typography, Divider, SelectChangeEvent, Button, TextField, InputAdornment } from "@mui/material"
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
import SearchIcon from '@mui/icons-material/Search';
import { FellTrees } from "@/app/components/Forms/Trees/FellTrees";
enum Forms {
    createForm = "addForm",
    importForm = 'importForm',
    fellForm = 'fellForm'
}

const Autex = () => {
    const [selectedAutex, setSelectedAutex] = useState<string>('')
    const [autexList, setAutexList] = useState<IAutex[]>([])
    const [trees, setTrees] = useState<ITree[]>([])
    const [query, setQuery] = useState<IQueryTree>({ autexIds: '', limit: 10, page: 0, count: 1, order: 'asc', orderBy: '', searchBy: '' })
    const [open, setOpen] = useState<boolean>(false)
    const [form, setForm] = useState<Forms>()
    const [treesSelected, setSelectedTrees] = useState<ITree[]>([])
    useEffect(() => {
        getAutexList()
    }, [])
    useEffect(() => {
        selectedAutex && getAutexTrees(selectedAutex)
    }, [selectedAutex, query.order, query.orderBy, query.page, query.limit, query.searchBy])
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
        const { data, total } = await ListTreesService({ autexIds: autexId, page: query.page, limit: query.limit, order: query.order, orderBy: query.orderBy, searchBy: query.searchBy })
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
    const handleSortChange = (key: string) => {
        setQuery((state) => ({ ...state, order: state.order === 'asc' ? 'desc' : 'asc', orderBy: key }))
    }
    const onChangeTextFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery((state) => ({ ...state, searchBy: event.target.value }))
    }
    const isSelected = (id: number | undefined) => {
        return treesSelected?.some((selectedItem) => selectedItem.id === id);
    };
    const handleSelectTree = (tree: ITree) => {
        const treeIsSelected = isSelected(tree.id)
        if (treeIsSelected) {
            const newState = treesSelected?.filter((items) => items.id !== tree.id)
            setSelectedTrees([...newState])
        } else {
            setSelectedTrees([...treesSelected, tree])
        }
    }
    const clearSelectedTrees = () => {
        setSelectedTrees([])
    }
    const onUpdated = (tree: ITree) => {
        const newData = trees.map((item) => {
            if (item.id === tree.id) {
                return {
                    ...tree
                }
            }
            return item
        })
        setTrees(newData)
    }
    return (
        <Box
            component={Paper}
            display='flex'
            width='100%'
            height='100%'
            flexDirection='column'
            p={2}
        >
            <Box>
                <Typography variant="h6" fontWeight='bold'>Autex</Typography>
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
            </Box>
            <Box
                display='flex'
                flexDirection='column'
                width='100%'
                height='100%'
            >
                {selectedAutex && (
                    <Box display='flex' flexDirection='column' gap={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} spacing={2}>
                                <Grid item xs={6} >
                                    <Typography variant="body1">
                                        <span style={{ fontWeight: 'bold' }}>Cod. Autex </span>{getAutexSelectedData(selectedAutex)?.code}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} >
                                    <Typography variant="body1">
                                        <span style={{ fontWeight: 'bold' }}>Autex </span>{getAutexSelectedData(selectedAutex)?.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box display='flex' flexDirection='row' alignItems='center' marginBottom={2} >
                            <Box display='flex' flexDirection='row' gap={2}>
                                <Button onClick={() => handleOpen(Forms.createForm)} variant="contained">+ Arvore</Button>
                                <Button onClick={() => handleOpen(Forms.importForm)} variant="contained">Importar Arvores</Button>
                                <Button
                                    onClick={() => handleOpen(Forms.fellForm)}
                                    variant="contained"
                                >Abater</Button>
                            </Box>
                            <Box marginLeft={2} display='flex' width='100%' maxWidth='450px'>
                                <TextField
                                    placeholder="Pesquisar nome, nome cientifico, plaqueta..."
                                    fullWidth
                                    value={query.searchBy}
                                    onChange={onChangeTextFilter}
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                )}
                {trees?.length > 0 && trees ? (
                    <TreesTable
                        data={trees}
                        onRequestPageChange={onRequestPageChange}
                        rowsPerPage={query?.limit}
                        page={query.page}
                        orderBy={query.orderBy}
                        order={query.order}
                        count={query.count}
                        handleSortChange={handleSortChange}
                        onRequestLimitChange={onChangeLimitPerPage}
                        onSelect={handleSelectTree}
                        treesSelected={treesSelected}
                        clearSelected={clearSelectedTrees}
                        onUpdated={onUpdated}
                    />
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h5" color="textSecondary">
                            Nenhuma "Autex" Selecionada!
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Por favor, selecione pelo menos uma "Autex" para visualizar.
                        </Typography>
                    </Box>
                )}
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
                    {form === Forms.fellForm && (
                        <FellTrees
                            trees={treesSelected}
                        />
                    )}
                </Modal>
            </Box>
        </Box >
    )
}

export default Autex;