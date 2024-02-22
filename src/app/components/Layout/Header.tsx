"use client"
import { common } from '@mui/material/colors';
import { Box, Typography, Button, IconButton } from "@mui/material"
import { useSession, signOut } from 'next-auth/react'
import { alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import useFilterUpdater from '@/utils/hooks/useFilterUpdate';

export const Header = () => {
    const updateFilters = useFilterUpdater()
    const { data } = useSession()
    const user = data?.user
    return (
        <Box
            component='header'
            sx={{
                backdropFilter: 'blur(6px)',
                position: 'sticky',
                backgroundColor: alpha(common.white, 0.5),
                padding: '0px 25px 0px 25px',
                display: 'flex',
                height: 64,
                zIndex: (theme) => theme.zIndex.appBar,
                boxShadow: "0 2px 4px rgba(128, 128, 128, 0.2)"
            }}
        >
            <Box display='flex' alignItems='center'>
                <IconButton
                    onClick={() => updateFilters('menu', 'open')}
                >
                    <MenuIcon></MenuIcon>
                </IconButton>
            </Box>
            <Box display='flex' justifyContent='flex-end' alignItems='center' gap={2} flexGrow={1} padding={2}>
                <Typography variant="h6" component='div'>Bem-vindo, {user?.name}</Typography>
                <Button onClick={() => signOut()} variant='contained'>Logout</Button>
            </Box>

        </Box>
    )
}