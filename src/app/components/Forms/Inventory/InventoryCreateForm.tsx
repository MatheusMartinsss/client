import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import ToastMessage from "../../Toast";
import { createInventory } from "@/services/inventoryService";
import { inventory } from "@/types/inventory/inventory";

interface InventorytCreateFormProps {
    onCreate: (inventory: inventory) => void
}

const InventoryCreateForm = ({ onCreate }: InventorytCreateFormProps) => {
    const validationSchema = Yup.object({
        id: Yup.number(),
        name: Yup.string().required("Campo obrigatório").max(32),
        description: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            id: undefined,
            name: "",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, helper) => {
            await createInventory(values).then((response) => {
                ToastMessage({ type: 'success', message: 'Produto criado com sucesso!.' })
                onCreate(response)
                formik.resetForm()
            }).catch((error) => {
                ToastMessage({ type: 'error', message: 'Não foi possivel criar o produto!.' })
            })
        },
    });

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography variant="subtitle1">Código</Typography>
                        <TextField
                            fullWidth
                            name="id"
                            value={formik.values.id}
                            disabled={true}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Nome</Typography>
                        <TextField
                            fullWidth
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Descrição</Typography>
                        <TextField
                            fullWidth
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} display="flex" gap={2} justifyContent="space-between">
                        <Button variant="contained" fullWidth color="inherit">
                            Cancelar
                        </Button>
                        <Button variant="contained" fullWidth type="submit">
                            Salvar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default InventoryCreateForm;