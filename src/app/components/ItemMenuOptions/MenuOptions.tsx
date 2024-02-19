"use client"
import { useEffect } from 'react';
import { Box, IconButton, SvgIcon, Icon } from "@mui/material";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CarpenterRoundedIcon from '@mui/icons-material/CarpenterRounded';
import { useSearchParams } from "next/navigation"
export enum Forms {
    add = 'add',
    remove = 'remove',
    reports = 'report'
}
type MenuProps = {
    form: Forms;
    Icon: typeof SvgIcon;
    name: string;
}


const Options: MenuProps[] = [{
    Icon: AddCircleOutlineRoundedIcon,
    name: 'add',
    form: Forms.add
}, {
    Icon: CarpenterRoundedIcon,
    name: 'remove',
    form: Forms.remove,
}, {
    Icon: CarpenterRoundedIcon,
    name: 'report',
    form: Forms.reports
}]


export const MenuOptions = () => {
    const searchParams = useSearchParams()

    const updateParams = (form: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('form', form)
        window.history.pushState(null, '', `?${params.toString()}`)
    }

    const form = searchParams.get('form')

    useEffect(() => {
        console.log(form)
    }, [form])

    console.log(form)
    return (
        <Box display='flex' flexDirection='column'>
            {Options.map((option, idx) => {
                return (
                    <Box key={idx}>
                        <IconButton
                            name={option.name}
                            onClick={() => updateParams(option.form)}
                            sx={{
                                width: '50px',
                                height: '50px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '50%',
                                margin: '0 0 20px 0',
                            }}
                        >
                            <option.Icon />
                        </IconButton>
                    </Box>
                )
            })}
        </Box>
    )
}