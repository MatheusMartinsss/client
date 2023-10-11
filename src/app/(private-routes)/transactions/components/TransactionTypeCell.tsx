import React from 'react';
import TableCell from '@mui/material/TableCell';
import { transactionTypes } from '@/types/transaction/transaction';

const TransactionTypeCell = ({ type }: { type: string }) => {
    const description = type === transactionTypes.ADD ? 'Entrada' : 'Saida'

    return (
        <TableCell
            color={type == transactionTypes.ADD ? 'black' : 'red'}
        >
            {description}
        </TableCell >

    );
};

export default TransactionTypeCell;