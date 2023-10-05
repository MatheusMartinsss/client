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
            <Box display='flex' flexDirection='column' width='100%'>
                <Header />
                <Box component='main'sx={{ p: 5 }} >
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

export default Template;