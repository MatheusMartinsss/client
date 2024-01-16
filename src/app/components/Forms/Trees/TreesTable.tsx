import { ITree } from "@/types/tree/tree"
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material"

interface TreesTableProps {
    order?: "asc" | "desc"
    orderBy?: string
    data: ITree[]
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



export const TreesTable = ({ data, order, orderBy }: TreesTableProps) => {
    return (
        <TableContainer sx={{
            marginTop: 2,
            overflowY: 'auto',
            height: 450,
        }}>
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
                                        //  onClick={() => {
                                        //     handleSortChange(colum.id)
                                        //</TableCell>  }}
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
                        return (
                            <TableRow
                                key={row.code}
                                role="checkbox"
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.code}</TableCell>
                                <TableCell>{row.scientificName}</TableCell>
                                <TableCell>{row.commonName}</TableCell>
                                <TableCell>{row.meters}</TableCell>
                                <TableCell>{row.volumeM3}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>

            </Table>
        </TableContainer>
    )
}