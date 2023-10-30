"use client"
import { Dialog, DialogContent, DialogProps, DialogTitle, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import React, { ReactNode } from 'react'
interface ModalProps {
    open: boolean
    handleModal: () => void
    children: ReactNode
    rest?: DialogProps
}

const Modal = ({ open, handleModal, children, ...rest }: ModalProps) => {


    return (
        <Dialog
            open={open}
            onClose={handleModal}
            maxWidth='lg'
            autoFocus={false}
            {...rest}
        >
            <DialogTitle display='flex' justifyContent='flex-end'>
                <IconButton onClick={handleModal}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}
export default Modal