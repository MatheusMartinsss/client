'use client'
import { ListInventorys } from "@/services/inventoryService"
import { Box, Button, Paper } from "@mui/material"
import { useEffect, useState } from "react"
import Modal from "@/app/components/Modal/Modal"
import InventoryTable from "@/app/components/InventoryTable/InventoryTable"
import { inventory } from "@/types/inventory/inventory"
import InventoryCreateForm from "@/app/components/Forms/Inventory/InventoryCreateForm"
const Inventory = () => {
    const [inventory, setInventory] = useState<inventory[]>([])
    const [open, setOpen] = useState<boolean>(false)

    useEffect(() => {
        getInventorys()
    }, [])

    const getInventorys = async () => {
        const response = await ListInventorys({ includeVolume: true })
        setInventory(response)
    }
    const handleModal = () => setOpen((state) => !state)

    const onCreate = (inventory: inventory) => {
        setInventory((state) => ({ ...state, ...inventory }))
    }
    return (
        <Box>
            <Box
                component={Paper}
                p={2}
                sx={{
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    background: '#fff',
                }}
            >
                <Button onClick={handleModal} variant="contained">CADASTRAR</Button>
            </Box>
            <InventoryTable inventory={inventory} />
            <Modal handleModal={handleModal} open={open}>
                <InventoryCreateForm onCreate={onCreate} />
            </Modal>
        </Box>
    )
}

export default Inventory