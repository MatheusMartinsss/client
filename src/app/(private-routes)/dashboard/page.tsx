"use client"
import { ListItems } from "@/services/itemService";
import { IItem, ItemQuerys } from "@/types/items/item";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ItemsTable from "@/app/components/ItemsTable/ItemsTable";
import { MenuOptions } from "@/app/components/ItemMenuOptions/MenuOptions";
import { useSearchParams } from "next/navigation";
import FiltersHeader from "./components/FiltersHeader";

export default function Home() {
    const searchParams = useSearchParams()
    const [items, setItems] = useState<IItem[]>([])
    const [itemsSelected, setItemsSelected] = useState<IItem[]>([])
    const from = searchParams.get('from') ?? ''
    const to = searchParams.get('to') ?? ''
    const searchBy = searchParams.get('searchBy') ?? ''
    const includeArchived = searchParams.has('includeArchived')
    const inventoryId = searchParams.get('inventoryId') ?? ''
    const order: 'asc' | 'desc' = (searchParams.get('order') as 'asc' | 'desc') ?? 'asc';
    const orderBy = searchParams.get('orderBy') ?? ''
    useEffect(() => {
        getItems()
    }, [from, to, searchBy, includeArchived, inventoryId, order, orderBy])

    const getItems = async () => {
        await ListItems({
            inventoryId: inventoryId,
            includeArchived: includeArchived,
            from: from,
            to: to,
            searchBy: searchBy,
            order: order,
            orderBy: orderBy,

        })
            .then((response) => {
                setItems(response)
            }).catch((error) => {
                console.log(error)
            })
    }
    const isSelected = (id: number | undefined) => {
        return itemsSelected?.some((selectedItem) => selectedItem.id === id);
    };

    const onSelectItem = (item: IItem) => {
        const itemIsSelected = isSelected(item.id)
        if (itemIsSelected) {
            const newState = itemsSelected?.filter((items) => items.id !== item.id)
            setItemsSelected([...newState])
        } else {
            setItemsSelected([...itemsSelected, item])
        }
    }
    const clearItemsSelected = () => {
        setItemsSelected([])
    }

    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
        }}>
            <FiltersHeader />
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                padding: '5px 0px 0px 0px',
                justifyContent: 'space-between',
                gap: '5px'
            }} >
                <ItemsTable
                    items={items}
                    handleSelectItem={onSelectItem}
                    itemsSelected={itemsSelected}
                    clearItemsSelected={clearItemsSelected}
                />
                <MenuOptions />
            </Box>
        </Box >
    )
}