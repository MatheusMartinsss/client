"use client"
import * as Yup from 'yup'
import { forwardRef } from 'react';
import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { useFormik } from 'formik';
import ToastMessage from '@/app/components/Toast';
import { useRouter } from 'next/navigation';
import { styled } from "@mui/material/styles"
import { InputMask, type InputMaskProps } from '@react-input/mask';



const CustomLabel = styled(Typography)({

})
CustomLabel.defaultProps = {
    variant: 'caption',
    fontWeight: 'bolder'
}

const CnpjInputMask = forwardRef<HTMLInputElement, InputMaskProps>((props, forwardedRef) => {
    return <InputMask ref={forwardedRef} mask="__.___.___/____-__" replacement="_" {...props} />;
});

const SignUp = () => {
    const router = useRouter()

    const validationSchema = Yup.object({
        cnpj: Yup.string().required('Campo obrigatório'),
        email: Yup.string().required('Campo obrigatório'),
        name: Yup.string().required('Campo obrigatório!.'),
        password: Yup.string().required('Campo obrigatório!.'),
        confirmPassword: Yup.string().required('Campo obrigatório!.'),
        address: Yup.object().shape({
            street: Yup.string().required('Campo obrigatório'),
            number: Yup.string(),
            neighbordhood: Yup.string(),
            postalCode: Yup.string(),
        })
    })
    const formik = useFormik({
        initialValues: {
            cnpj: "",
            email: "",
            name: "",
            password: "",
            confirmPassword: "",
            address: {
                street: '',
                number: '',
                neighbordhood: '',
                postalCode: ""
            }
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values)
            //            router.replace('/auth')
        }
    })

    return (
        <Box display='flex' justifyContent='center' height='100vh'>
            <Grid container width='500px' height='300px' spacing={2} component='form' onSubmit={formik.handleSubmit}>
                <Grid item xs={12} >
                    <Grid container direction='column'>
                        <Grid item xs>
                            <CustomLabel>
                                CNPJ
                            </CustomLabel>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                InputProps={{
                                    inputComponent: CnpjInputMask
                                }}
                                fullWidth
                                name='cnpj'
                                onChange={formik.handleChange}
                                value={formik.values.cnpj}
                            ></TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction='column'>
                        <Grid item xs>
                            <CustomLabel>
                                Nome Fantasia
                            </CustomLabel>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                name='name'
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            ></TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction='column'>
                        <Grid item xs>
                            <CustomLabel>
                                Email
                            </CustomLabel>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                name='email'
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            ></TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container direction='column'>
                        <Grid item xs>
                            <CustomLabel>
                                Senha
                            </CustomLabel>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                type='password'
                                name='password'
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            ></TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container direction='column'>
                        <Grid item xs>
                            <CustomLabel>
                                Confirma senha
                            </CustomLabel>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                type='password'
                                name='confirmPassword'
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                            ></TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction='column'>
                        <Grid item xs>
                            <CustomLabel>
                                Logradouro
                            </CustomLabel>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                name='address.street'
                                onChange={formik.handleChange}
                                value={formik.values.address.street}
                            ></TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction='column'>
                        <Grid item xs>
                            <CustomLabel>
                                Numero
                            </CustomLabel>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                name='address.number'
                                onChange={formik.handleChange}
                                value={formik.values.address.number}
                            ></TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction='column'>
                        <Grid item xs>
                            <CustomLabel>
                                Bairro
                            </CustomLabel>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                name='address.neighbordhood'
                                onChange={formik.handleChange}
                                value={formik.values.address.neighbordhood}
                            ></TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction='column'>
                        <Grid item xs>
                            <CustomLabel>
                                CEP
                            </CustomLabel>
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                name='address.postalCode'
                                onChange={formik.handleChange}
                                value={formik.values.address.postalCode}
                            ></TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant='contained' type='submit'>Cadastrar</Button>
                </Grid>
            </Grid>

        </Box>
    )
}

export default SignUp