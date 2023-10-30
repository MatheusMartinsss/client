"use client"
import { Box } from "@mui/material"
import TransactionForm from "../../components/TransactionForm"


const Transaction = ({ params }: { params: { id: string } }) => {
    return (
        <Box>
            <TransactionForm transactionId={params.id} />
        </Box>
    )
}

export default Transaction