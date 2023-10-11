import { IItem } from "@/types/items/item"
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import TableCellDate from "../TableCellDate/TableCellDate"
import { ITransacation } from "@/types/transaction/transaction"
import TransactionTypeCell from "@/app/(private-routes)/transactions/components/TransactionTypeCell"

interface TransactionsTableProps {
    transactions: ITransacation[]
}

export const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
    const volumeTotal = transactions?.reduce((a, b) => {
        return a + b.volumeTotal
    }, 0.00).toFixed(3)

    return (
        transactions?.length > 0 ? (
            <Box >
                <TableContainer sx={{
                    marginTop: 2,
                    overflowY: 'auto',
                    height: 450
                }}>
                    <Table >
                        <TableHead sx={{ backgroundColor: '#f0f0f0', position: 'sticky', top: 0 }} >
                            <TableRow>
                                <TableCell>Numero</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Volume</TableCell>
                                <TableCell>Emissão</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {transactions.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{row.id}</TableCell>
                                    <TransactionTypeCell type={row.transactionType} />
                                    <TableCell>{row.volumeTotal}</TableCell>
                                    <TableCellDate date={row.createdAt} />
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    display='flex'
                    justifyContent='flex-end'
                    paddingLeft={5}
                    paddingRight={5}
                    sx={{ height: 80, mt: 2 }} >

                    <Box display='flex' sx={{ justifyContent: 'flex-end' }}>
                        <Typography variant="subtitle1">Volume {volumeTotal}M3</Typography>
                    </Box>
                </Box>
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
                <Typography variant="h5" color="#555555">Nenhuma transação encontrada!</Typography>
            </Box>
        )
    )
}
export default TransactionsTable


