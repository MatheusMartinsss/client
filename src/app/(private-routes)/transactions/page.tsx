"use client"
import FilterDateInput from "@/app/components/FilterDateInput/FilterDateInput";
import TransactionsTable from "@/app/components/TransactionsTable/TransactionsTable";
import { ListTransactions } from "@/services/transactionService"
import { ITransacation, transactionTypes } from "@/types/transaction/transaction";
import { Box, Button, Grid, MenuItem, Paper, Select } from "@mui/material"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

interface IQuery {
    from: string;
    to: string;
    type: transactionTypes | string;
}

const Transactions = () => {
    const [query, setQuery] = useState<IQuery>({ from: '', to: '', type: 'Todos' })
    const [transactions, setTransactions] = useState<ITransacation[]>([])
    useEffect(() => {
        getTransactions()
    }, [query])

    const router = useRouter()

    const getTransactions = async () => {
        await ListTransactions({
            from: query.from,
            to: query.to,
            type: query.type

        }).then((response) => {
            setTransactions(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <Box
            component={Paper}
            p={2}
            sx={{
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                background: '#fff',
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs>
                    <Button variant="contained" onClick={() => router.push('/transactions/transaction')}>
                        Nova transação
                    </Button>
                </Grid>
                <Grid item xs >

                </Grid>
                <Grid item >
                    <Select
                        fullWidth
                        value={query.type}
                        onChange={(event) => setQuery((state) => ({ ...state, type: event.target.value }))}
                        size="small"
                    >
                        <MenuItem value='Todos'>Todos</MenuItem>
                        <MenuItem value={transactionTypes.ADD}>Entrada</MenuItem>
                        <MenuItem value={transactionTypes.REMOVE}>Saida</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs>
                    <FilterDateInput
                        label="Data inicial"
                        value={query.from}
                        onChange={(newValue) => setQuery((state) => ({ ...state, from: newValue }))}
                    />
                </Grid>
                <Grid item xs>
                    <FilterDateInput
                        label="Data Final"
                        value={query.to}
                        onChange={(newValue) => setQuery((state) => ({ ...state, to: newValue }))}
                    />
                </Grid>
            </Grid>
            <TransactionsTable transactions={transactions} />
        </Box>
    )
}

export default Transactions