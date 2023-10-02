import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Template from "../components/Layout/Template";
interface PrivateLayoutProps {
    children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect('/auth')
    }

    return (
        <Template>
            {children}
        </Template>
    )
}