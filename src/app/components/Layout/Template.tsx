"use client"
import { Box, styled } from "@mui/material"
import { ReactNode } from "react"
import { Header } from "./Header"
import { Sidebar } from "./SideBar"
type TemplateProps = {
    children: ReactNode
}

const ContentBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 64px)',
    maxWidth: '100vw',
    padding: '20px 25px 10px 25px',
    boxSizing: 'border-box'

})
const Template = ({ children }: TemplateProps) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box sx={{
                width: '100%',
                flexDirection: 'column'
            }} >
                <Header />
                <ContentBox bgcolor='#dedede'>
                    {children}
                </ContentBox>
            </Box>
        </Box>
    )
}

export default Template;