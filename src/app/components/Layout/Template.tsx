import { Box } from "@mui/material"
import { ReactNode } from "react"
import { Header } from "./Header"
import { Sidebar } from "./SideBar"
type TemplateProps = {
    children: ReactNode
}

const Template = ({ children }: TemplateProps) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Header />
            <Box component='main'
                sx={{ flexGrow: 1, p: 3, mt: 5 }} >
                {children}
            </Box>
        </Box>
    )
}

export default Template;