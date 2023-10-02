"use client"
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Box, Stack, Toolbar } from "@mui/material";
import { MenuItems } from './MenuItems';
import { SideBarItem } from './SiderBarItem';
import { usePathname } from 'next/navigation'

const drawerWidth = 240

const Drawer = styled(MuiDrawer)({

    width: drawerWidth,
    flexShrink: 0,
    display: 'flex',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
        backgroundColor: '#1C2536',
        width: drawerWidth,
    }
});

export const Sidebar = () => {
    const path = usePathname()

    return (
        <Drawer
            variant='permanent'
            open={true}
        >
            <Toolbar >
                <Box>
                    Flona
                </Box>
            </Toolbar>
            <Box sx={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                mt: 2,
                p: '12px'
            }}>
                <Stack
                    component='ul'
                    spacing={0.5}
                    sx={{
                        listStyle: 'none',
                        p: 0,
                        m: 0
                    }}
                >
                    {MenuItems.map((item, idx) => (
                        <SideBarItem
                            key={idx}
                            active={item.path === path}
                            path={item.path}
                            Icon={item.Icon}
                            name={item.name}
                        />
                    ))}
                </Stack>
            </Box>
        </Drawer>
    )
}