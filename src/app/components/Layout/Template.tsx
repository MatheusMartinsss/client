import { Box } from "@mui/material"
import { ReactNode } from "react"
import { Header } from "./Header"
import { Sidebar } from "./SideBar"
type TemplateProps = {
    children: ReactNode
}

const Template = ({ children }: TemplateProps) => {
    return (
        <Box>
            <Sidebar />
            <Header />
            <Box sx={{ display: 'flex' }} >
                {children}
            </Box>
        </Box>
    )
}

export default Template;