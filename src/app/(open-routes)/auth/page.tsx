"use client"
import * as Yup from 'yup'
import Link from "next/link";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import ToastMessage from '@/app/components/Toast';

export default function Login() {

    const router = useRouter()

    const validationSchema = Yup.object({
        cnpj: Yup.string().required('Campo obrigatório'),
        password: Yup.string().required('Campo obrigatório!.')
    })

    const formik = useFormik({
        initialValues: {
            cnpj: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            const result = await signIn('credentials', {
                cnpj: values.cnpj,
                password: values.password,
                redirect: false,

            })
            if (result?.error) {
                ToastMessage({ type: 'error', message: "Acesso negado!" })
                return
            }

            router.replace('/dashboard')
        }
    })

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center text-gray-700">Flona</h1>
                <form className="mt-6" onSubmit={formik.handleSubmit}  >
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            id='cnpj'
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={formik.handleChange}
                            value={formik.values.cnpj}
                        />
                        {formik.touched.cnpj && formik.errors.cnpj ? (
                            <div className="text-red-600">{formik.errors.cnpj}</div>
                        ) : null}
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Senha
                        </label>
                        <input
                            id='password'
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-600">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <Link
                        href="/forget"
                        className="text-xs text-blue-600 hover:underline"
                    >
                        Esqueceu sua senha?
                    </Link>
                    <div className="mt-2">
                        <button
                            type='submit'
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}