import { Box, Button } from "@mui/material"
import { TreeForm } from "./TreeForm"
import { IAutex } from "@/types/autex/autex"
import { ITree } from "@/types/tree/tree"
import { useState } from "react"
import { TreesTable } from "./TreesTable"
import { CreateTreeService } from "@/services/treeService"
import ToastMessage from "../../Toast"

interface CreateTreeProps {
    autex?: IAutex
}

export const CreateTrees = ({ autex }: CreateTreeProps) => {
    const [trees, setTrees] = useState<ITree[]>([])
    const handleTreeFormSubmit = (data: ITree) => {
        setTrees((state) => ([...state, data]))
    }
    const handleSubmit = async () => {
        if (!trees.length) return
        try {
            const response = await CreateTreeService(trees)
            ToastMessage({ type: 'success', message: 'Arvores cadastradas com sucesso!' })
            setTrees([])
        } catch (error) {
            ToastMessage({ type: 'error', message: 'Ocorreu um erro!.' })
            throw error
        }
    }
    return (
        <Box>
            <TreeForm
                autexSelected={autex?.id}
                handleSubmit={handleTreeFormSubmit}
            />
            <TreesTable
                data={trees}
            />
            <Box display='flex' justifyContent='flex-end'>
                <Box display='flex' gap={2}>
                    <Button variant="contained" color="inherit">Cancelar</Button>
                    <Button variant="contained" onClick={handleSubmit}>Salvar</Button>
                </Box>
            </Box>
        </Box>
    )
}