import { authService } from "@/services/authService"
import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

interface User {
    name: string;
    email: string;
    role: string;
    token: string;
    id: number;
}

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                id: { label: "id", type: "number" },
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                role: { label: "Role", type: "text" },
                token: { label: "Token", type: "text" },

            },
            async authorize(credentials, req) {

                if (!credentials?.email || !credentials.password)
                    return null

                const response = await authService(credentials?.email, credentials?.password)
                if (response) {
                    return {
                        id: response.id,
                        email: response.email,
                        role: response.role,
                        token: response.token,
                    }
                } else {
                    return null
                }

            }
        })
    ],
    pages: {
        signIn: '/auth'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
                token.email = user.email
                token.name = user.name
                token.token = user.token
            }
            return token
        },
        async session({ session, token }) {
            session.user = token as any
            return session
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }