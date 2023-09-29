import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            email: string
            name: string
            token: string
            role: string
        }
    }
    interface User {
        role: string
        token: string
    }
    interface Jwt {
        role: string
        token: string
    }
}