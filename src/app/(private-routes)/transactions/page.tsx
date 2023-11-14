"use client"
import FilterDateInput from "@/app/components/FilterDateInput/FilterDateInput";
import TransactionsTable from "@/app/components/TransactionsTable/TransactionsTable";
import { ListTransactions, deleteTransaction, findOneTransaction } from "@/services/transactionService"
import { ITransacation, transactionTypes } from "@/types/transaction/transaction";
import { Box, Button, Grid, MenuItem, Paper, Select } from "@mui/material"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import ToastMessage from "@/app/components/Toast";
import Modal from "@/app/components/Modal/Modal";
import { TransactioViewForm } from "@/app/components/Forms/Transaction/TransactionViewForm";

interface IQuery {
    from: Date | null;
    to: Date | null;
    type: transactionTypes | string;
}

const Transactions = () => {
    const [query, setQuery] = useState<IQuery>({ from: null, to: null, type: 'Todos' })
    const [transactions, setTransactions] = useState<ITransacation[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [transactionSelected, setTransactionSelected] = useState<ITransacation>()
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
    const handleModal = () => {
        setOpen((state) => !state)
    }
    const removeTransaction = async (id: string) => {
        await deleteTransaction(id).then((response) => {
            if (response) {
                ToastMessage({ type: 'success', message: 'Transação excluida com sucesso!' })
                const newValue = transactions.filter((transaction) => transaction.id !== parseInt(id))
                setTransactions(newValue)
            }
        }).catch((error) => {
            ToastMessage({ type: 'error', message: 'Erro interno, entre em contato com o suporte!.' })
        })
    }
    const getTransaction = async (transaction: ITransacation) => {
        await findOneTransaction(transaction.id).then((response) => {
            setTransactionSelected(response)
            handleModal()
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
                    <Button variant="contained">
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
                <Grid item >
                    <FilterDateInput
                        label="Data inicial"
                        value={query.from}
                        onChange={(newValue) => setQuery((state) => ({ ...state, from: newValue }))}
                        props={{
                            size: 'small',
                            fullWidth: true
                        }}
                    />
                </Grid>
                <Grid item >
                    <FilterDateInput
                        label="Data Final"
                        value={query.to}
                        onChange={(newValue) => setQuery((state) => ({ ...state, to: newValue }))}
                        props={{
                            size: 'small',
                            fullWidth: true
                        }}
                    />
                </Grid>
            </Grid>
            <TransactionsTable
                transactions={transactions}
                onDelete={removeTransaction}
                onSelect={getTransaction}
            />
            <Modal
                open={open}
                handleModal={handleModal}
            >
                {transactionSelected &&
                    <TransactioViewForm
                        transaction={transactionSelected}
                    />
                }
            </Modal>
        </Box>
    )
}

export default Transactions