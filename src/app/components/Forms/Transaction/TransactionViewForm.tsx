import { ITransacation } from "@/types/transaction/transaction"
import { Box, Grid, TextField, Typography } from "@mui/material"
import FilterDateInput from "../../FilterDateInput/FilterDateInput"
import { useFormik } from "formik"
import ItemsList from "./components/ItemList"


type TransactionViewFormProps = {
    transaction: ITransacation
}


export const TransactioViewForm = ({ transaction }: TransactionViewFormProps) => {

    const form = useFormik({
        initialValues: transaction,
        onSubmit: () => {

        }
    })
    return (
        <Box>
            <Grid container>
                <Grid item xs={3} display='flex' flexDirection='column'>
                    <Typography variant="caption" fontWeight='bolder'>Tipo</Typography>
                    <TextField
                        size="small"
                        value={form.values.transactionType}
                        disabled
                    >

                    </TextField>
                </Grid>
                <Grid item xs>
                </Grid>
                <Grid item xs={6} container spacing={2}>
                    <Grid  item xs={6} display='flex' flexDirection='column'>
                        <Typography variant="caption" fontWeight='bolder'>Dt. Emissão</Typography>
                        <FilterDateInput
                            value={new Date(form.values.createdAt)}
                            onChange={form.handleChange}
                            props={{
                                disabled: true,
                                size: 'small',
                                fullWidth: true
                            }}
                        />


                    </Grid>
                    <Grid item xs={6} display='flex' flexDirection='column'>
                        <Typography variant="caption" fontWeight='bolder'>Dt. Baixa</Typography>
                        <FilterDateInput
                            value={new Date(form.values.archivedAt)}
                            onChange={form.handleChange}
                            props={{
                                disabled: true,
                                size: 'small',
                                fullWidth: true
                            }}
                        />


                    </Grid>
                </Grid>
            </Grid>
            <ItemsList
                items={transaction.transactionItems?.map((item) => Object(item.item)) || []}
            />

        </Box>
    )
}