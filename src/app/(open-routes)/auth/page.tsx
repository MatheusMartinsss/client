"use client"

import Link from "next/link";
import { signIn } from 'next-auth/react'
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

    const [email, setEmail] = useState<String>()
    const [password, setPassword] = useState<String>()

    const router = useRouter()

    const onSubmit = async (event: SyntheticEvent) => {

        event.preventDefault()

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        })
        if (result?.error) {
            console.log(result.error)
        }

        return router.replace('/dashboard')

    }
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center text-gray-700">Flona</h1>
                <form className="mt-6" onSubmit={onSubmit} >
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Senha
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e) => setPassword(e.target.value)}
                        />
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