import { Box, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TableSortLabel, TableFooter, TablePagination } from "@mui/material"
import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ITree } from "@/types/tree/tree";
import Modal from "../Modal/Modal";
import { TreeEditForm } from "../Forms/Trees/TreeEditForm";
import { UpdateTreeService } from "@/services/treeService";
import ToastMessage from "../Toast";

interface TreesTableProps {
    data: ITree[]
    treesSelected?: ITree[]
    order?: "asc" | "desc"
    orderBy?: string
    page?: number
    count?: number
    rowsPerPage?: number
    onRequestPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void
    onRequestLimitChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleSortChange: (key: string) => void
    onSelect?: (tree: ITree) => void
    clearSelected?: () => void
    onUpdated?: (tree: ITree) => void
}
const colummns = [{
    id: '#', label: '#', sortable: false
}, {
    id: 'code', label: 'Arvore', sortable: true
}, {
    id: 'scientificName', label: 'Nome Cientifico', sortable: true
}, {
    id: 'commonName', label: 'Nome Popular', sortable: true
}, {
    id: 'meters', label: 'meters', sortable: true
}, {
    id: 'volumeM3', label: 'M3', sortable: true
}, {
    id: 'options', label: 'Opções', sortable: false
}]

export const TreesTable = ({
    data,
    order,
    orderBy,
    onRequestPageChange,
    onRequestLimitChange,
    page = 0,
    count = 0,
    rowsPerPage = 10,
    handleSortChange,
    treesSelected,
    onSelect,
    clearSelected,
    onUpdated
}: TreesTableProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const [treeSelected, setTreeSelected] = useState<ITree>()
    const handleOpen = () => {
        setOpen((state) => !state)
    }

    const onRequestEdit = (tree: ITree) => {
        setTreeSelected(tree)
        handleOpen()
    }
    const handleEdited = async (tree: ITree) => {
        try {
            const result = await UpdateTreeService({ id: tree.id, data: tree })
            ToastMessage({ type: 'success', message: 'Arvore atualizada com sucesso!.' })
            handleOpen()
            onUpdated && onUpdated(result)
        } catch (error) {
            ToastMessage({ type: 'error', message: 'Não foi possivel atualizar, tente novamente mais tarde...' })
        }

    }
    const isSelected = (id: number | undefined) => {
        return treesSelected?.some((selectedItem) => selectedItem.id === id);
    };

    return (
        data?.length ? (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }} >
                <TableContainer sx={{
                    overflowY: 'auto',
                    height: 500,
                }}>
                    {treesSelected && treesSelected.length > 0 &&
                        <Box
                            mt={2}
                            padding={2}
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'
                            sx={{ backgroundColor: '#f0f0f0' }}
                        >
                            <>
                                <Typography>{treesSelected.length} Selecionados</Typography>
                                <IconButton
                                    size="small"
                                    onClick={() => clearSelected && clearSelected()}
                                >
                                    <DeleteOutlineIcon />
                                </IconButton>
                            </>
                        </Box>
                    }
                    <Table >
                        <TableHead sx={{ backgroundColor: '#f0f0f0', position: 'sticky', top: 0 }} >
                            <TableRow>
                                {colummns.map((colum) => {
                                    const isSortable = colum.sortable
                                    const isSelected = orderBy === colum.id
                                    return (
                                        <TableCell
                                            key={colum.id}
                                            sortDirection={isSelected ? order : false}
                                        >
                                            {isSortable ?
                                                <TableSortLabel
                                                    active={isSelected}
                                                    direction={isSelected ? order : 'asc'}
                                                    onClick={() => {
                                                        handleSortChange(colum.id)
                                                    }}
                                                >
                                                    {colum.label}
                                                </TableSortLabel>
                                                : (colum.label)
                                            }
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {data.map((row) => {
                                const treeIsSelected = isSelected(row.id)
                                return (
                                    <TableRow
                                        key={row.id}
                                        role="checkbox"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        selected={treeIsSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onClick={() => onSelect && onSelect(row)}
                                                checked={treeIsSelected}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row">{row.code}</TableCell>
                                        <TableCell>{row.scientificName}</TableCell>
                                        <TableCell>{row.commonName}</TableCell>
                                        <TableCell>{row.meters}</TableCell>
                                        <TableCell>{row.volumeM3}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => onRequestEdit(row)}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component='div'
                    count={count}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onPageChange={onRequestPageChange}
                    onRowsPerPageChange={onRequestLimitChange}
                />
                <Modal
                    open={open}
                    handleModal={handleOpen}
                    title="Editar Arvore"
                >
                    {treeSelected &&
                        <TreeEditForm
                            tree={treeSelected}
                            handleSubmit={handleEdited}
                        />
                    }
                </Modal>
            </Box>
        ) : (
            <Box
                component={Paper}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                    marginTop: '16px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    background: '#f0f0f0',
                    minHeight: '350px',
                }}
            >
                <Typography variant="h5" color="#555555">Nenhum item encontrado!</Typography>
            </Box>
        )
    )
}
export default TreesTable