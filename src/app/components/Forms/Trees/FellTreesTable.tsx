import { ITree } from "@/types/tree/tree"
import { Box, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from "@mui/material"
import React, { useState } from "react"
import { ItemForm } from "../Item/ItemCreateForm"
import { FellTreeForm } from "./FellTreeForm"

interface FellTreesTableProps {
    initialValue: customTree[]
}
interface customTree extends ITree {
    subTotalFell?: string
}
const colummns = [{
    id: 'code', label: 'Arvore', sortable: true
}, {
    id: 'scientificName', label: 'Nome Cientifico', sortable: true
}, {
    id: 'commonName', label: 'Nome Popular', sortable: true
}, {
    id: 'meters', label: 'meters', sortable: true
}, {
    id: 'volumeM3', label: 'M3', sortable: true
}]



export const FellTreesTable = ({ initialValue }: FellTreesTableProps) => {
    const [data, setData] = useState<customTree[]>(initialValue || [])
    return (
        <FellTreeForm
            data={data}
            handleSubmit={(e) => console.log(e)}
        />

    )
}