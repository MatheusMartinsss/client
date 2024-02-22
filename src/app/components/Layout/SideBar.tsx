"use client"
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Box, Stack, Toolbar } from "@mui/material";
import { MenuItems } from './MenuItems';
import { SideBarItem } from './SiderBarItem';
import { usePathname, useSearchParams } from 'next/navigation'
import useFilterUpdater from '@/utils/hooks/useFilterUpdate';
const drawerWidth = 240

const Drawer = styled(MuiDrawer)({
    width: drawerWidth,
    flexShrink: 0,
    display: 'flex',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
        backgroundColor: '#2c6433',
        width: drawerWidth,
    }
});

export const Sidebar = () => {
    const updateFilter = useFilterUpdater()
    const searchParams = useSearchParams()
    const menu = searchParams.has('menu')
    const path = usePathname()

    return (
        <Drawer
            variant='temporary'
            open={menu}
            onClose={() => updateFilter('menu', 'false')}
        >
            <Toolbar sx={{ boxShadow: "0 2px 4px rgba(128, 128, 128, 0.2)" }} >
                <Box color='white'>
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