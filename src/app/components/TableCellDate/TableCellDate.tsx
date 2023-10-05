import React from 'react';
import TableCell from '@mui/material/TableCell';
import { format } from 'date-fns';

const TableCellDate = ({ date }: { date: Date }) => {

    return (
        date ? (
            <TableCell>
                {format(new Date(date), 'dd/MM/yyyy')}
            </TableCell >
        ) : (
            <TableCell>
                N/A
            </TableCell>
        )
    );
};

export default TableCellDate;