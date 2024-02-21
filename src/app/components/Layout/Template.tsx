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
    minHeight: '90vh',
    maxWidth: 'calc(100vw - 240px)',
    padding: '20px 25px 10px 25px',

})
const Template = ({ children }: TemplateProps) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box sx={{
                width: 'calc(100% - 240px)',
                flexDirection: 'column'
            }} >
                <Header />
                <ContentBox bgcolor='#fafafa'>
                    {children}
                </ContentBox>
            </Box>
        </Box>
    )
}

export default Template;