import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { Paper } from '@mui/material';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2c6433'
        }
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.severity === 'info' && {
                        backgroundColor: '#60a5fa',
                    }),
                }),
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',

                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: theme.palette.primary.main,
                            borderWidth: '0.10rem',
                            transition: 'border-color 0.3s ease',
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.primary.light,
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',

                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.dark,
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Sombra aumentada quando focado
                        }
                    }

                })
            }
        },
        MuiSelect: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    '.MuiOutlinedInput-notchedOutline': {
                        borderWidth: '0.10rem',
                        borderColor: theme.palette.primary.main,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.light,
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.dark,
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    }
                })
            }
        },
        MuiTableHead: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    zIndex: 999
                }),
            },
            defaultProps: {

            }
        },
        MuiTableContainer: {
            styleOverrides: {
                root: ({ theme }) => ({

                }),
            },
            defaultProps: {
                component: Paper
            }
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    color: 'white'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderTop: '5px solid', 
                    borderTopColor: theme.palette.primary.main,
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                   
                })
            }
        },
    },
});

export default theme;