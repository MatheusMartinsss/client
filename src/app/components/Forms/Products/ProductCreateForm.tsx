import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createProduct } from "@/services/productsService";
import ToastMessage from "../../Toast";
import { IProduct } from "@/types/product/product";

interface ProductCreateFormProps {
    onCreate?: (product: IProduct) => void
    previousProduct?: Partial<IProduct>
}

const ProductCreateForm = ({ onCreate, previousProduct }: ProductCreateFormProps) => {
    const validationSchema = Yup.object({
        id: Yup.number(),
        commonName: Yup.string().required("Campo obrigatório").max(32),
        scientificName: Yup.string().required("Campo obrigatório").max(32),
        description: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            id: undefined,
            commonName: "" || previousProduct?.commonName,
            scientificName: "" || previousProduct?.scientificName,
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, helper) => {
            await createProduct(values).then((response) => {
                ToastMessage({ type: 'success', message: 'Produto criado com sucesso!.' })
                if (onCreate) {
                    onCreate(response)
                }
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
                        <Typography variant="subtitle1">Nome Científico</Typography>
                        <TextField
                            fullWidth
                            name="scientificName"
                            value={formik.values.scientificName}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Nome Popular</Typography>
                        <TextField
                            fullWidth
                            name="commonName"
                            value={formik.values.commonName}
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

export default ProductCreateForm;