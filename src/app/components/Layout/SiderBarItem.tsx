import { Box, ButtonBase } from "@mui/material";
import { common } from "@mui/material/colors";
import { useRouter } from "next/navigation";


interface sideBarItemProps {
    path: string;
    name: string;
    active?: boolean;
    Icon?: any;
}

export const SideBarItem = ({ path, active, Icon, name }: sideBarItemProps) => {
    const router = useRouter()
    return (
        <li>
            <ButtonBase
                onClick={() => router.push(path)}
                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    pl: '16px',
                    pr: '16px',
                    py: '6px',
                    textAlign: 'left',
                    width: '100%',
                    ...(active && {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }),
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }
                }}>
                {Icon && (
                    <Box
                        component="span"
                        sx={{
                            alignItems: 'center',
                            color: common.white,
                            display: 'inline-flex',
                            justifyContent: 'center',
                            mr: 2,
                            ...(active && {
                                color: 'black'
                            })
                        }}
                    >
                        <Icon />
                    </Box>
                )}
                <Box
                    component="span"
                    sx={{
                        flexGrow: 1,
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: '24px',
                        color: common.white,
                        whiteSpace: 'nowrap',
                        ...(active && {
                            color: 'black'
                        }),

                    }}
                >
                    {name}
                </Box>
            </ButtonBase>
        </li>
    )
}