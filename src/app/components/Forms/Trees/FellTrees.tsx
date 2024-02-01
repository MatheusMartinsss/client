import { Box, Button } from "@mui/material"
import { TreeForm } from "./TreeForm"
import { IAutex } from "@/types/autex/autex"
import { ITree } from "@/types/tree/tree"
import { useState } from "react"
import { TreesTable } from "./TreesTable"
import { CreateTreeService } from "@/services/treeService"
import ToastMessage from "../../Toast"
import { FellTreesTable } from "./FellTreesTable"

interface CreateTreeProps {
    trees: ITree[]
}

export const FellTrees = ({ trees }: CreateTreeProps) => {

    return (
        <Box>

            <FellTreesTable
                initialValue={trees}
            />
            <Box display='flex' justifyContent='flex-end'>
                <Box display='flex' gap={2}>
                    <Button variant="contained" color="inherit">Cancelar</Button>
                    <Button variant="contained" >Salvar</Button>
                </Box>
            </Box>
        </Box>
    )
}