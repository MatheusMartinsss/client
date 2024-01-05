"use client"
import { Dialog, DialogContent, DialogProps, DialogTitle, Grow, IconButton, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import React, { ReactNode } from 'react'
interface ModalProps {
    open: boolean
    title?: string | ReactNode
    handleModal: () => void
    children: ReactNode
}

const Modal = ({ open, handleModal, title, children, ...rest }: ModalProps) => {


    return (
        <Dialog
            open={open}
            onClose={handleModal}
            maxWidth='lg'
            autoFocus={false}
            PaperProps={{ style: { borderRadius: 16 } }}
            TransitionComponent={Grow}
            {...rest}
        >
            {title ? (
                <DialogTitle display='flex' alignItems='center' justifyContent='space-between'>
                    <Typography variant="body2" fontWeight='bolder'>{title}</Typography>
                    <IconButton onClick={handleModal} >
                        <CloseIcon fontSize="medium" />
                    </IconButton>
                </DialogTitle>
            ) : (
                <DialogTitle display='flex' justifyContent='flex-end'>
                    <IconButton onClick={handleModal}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle >
            )}
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog >
    )
}
export default Modal