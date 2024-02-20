"use client"
import { Box, IconButton, SvgIcon } from "@mui/material";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CarpenterRoundedIcon from '@mui/icons-material/CarpenterRounded';
import { useSearchParams, useRouter } from "next/navigation"
import Modal from "@/app/components/Modal/Modal";
import TransactionAddForm from "@/app/components/Forms/Transaction/TransactionAddForm";
import TransactionRemoveForm from "@/app/components/Forms/Transaction/TransactionRemoveForm";
import useFilterUpdater from "@/utils/hooks/useFilterUpdate";

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
    const updateFilters = useFilterUpdater()
    const searchParams = useSearchParams()
    const router = useRouter()
    const queryParams = Object.fromEntries(searchParams);
    const open = searchParams.has('form')
    const form = searchParams.get('form')


    return (
        <Box display='flex' flexDirection='column' >
            {Options.map((option, idx) => {
                return (
                    <IconButton
                        key={idx}
                        name={option.name}
                        onClick={() => updateFilters('form', option.form)}
                        sx={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '50%',
                        }}
                    >
                        <option.Icon />
                    </IconButton>
                )
            })}
            <Modal
                open={open}
                handleModal={() => updateFilters('form', '')}
            >
                {form === Forms.add && (
                    <TransactionAddForm
                        onCancel={() => console.log('')}
                        onSucces={() => console.log('')}
                    />
                )}
            </Modal>
        </Box>
    )
}