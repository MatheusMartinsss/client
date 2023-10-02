"use client"
import { common } from '@mui/material/colors';
import { Box, Typography, Button } from "@mui/material"
import { useSession, signOut } from 'next-auth/react'
import { alpha } from '@mui/material/styles';

export const Header = () => {
    const { data } = useSession()
    const user = data?.user
    return (
        <Box
            component='header'
            sx={{
                backdropFilter: 'blur(6px)',
                position: 'sticky',
                backgroundColor: alpha(common.white, 0.5),
                left: {
                    lg: 240
                },
                top: 0,
                width: {
                    lg: `calc(100% - 240px)`
                },
                zIndex: (theme) => theme.zIndex.appBar
            }}
        >

            <Box display='flex' justifyContent='flex-end' alignItems='center' gap={2} flexGrow={1} padding={2}>
                <Typography variant="h6" component='div'>Bem-vindo, {user?.name}</Typography>
                <Button onClick={() => signOut()} variant='contained'>Logout</Button>
            </Box>

        </Box>
    )
}