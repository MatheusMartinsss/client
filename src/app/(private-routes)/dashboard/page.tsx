"use client"
import { ListItems } from "@/services/itemService";
import { IItem, ItemQuerys } from "@/types/items/item";
import { Box, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import ItemsTable from "@/app/components/ItemsTable/ItemsTable";
import { MenuOptions } from "@/app/components/ItemMenuOptions/MenuOptions";
import { useSearchParams } from "next/navigation";
import FiltersHeader from "./components/FiltersHeader";

export default function Home() {
    const searchParams = useSearchParams()
    const [items, setItems] = useState<IItem[]>([])
    const [count, setCount] = useState<number>(1)
    const [itemsSelected, setItemsSelected] = useState<IItem[]>([])
    const from = searchParams.get('from') || ''
    const to = searchParams.get('to') || ''
    const searchBy = searchParams.get('searchBy') || ''
    const includeArchived = searchParams.has('includeArchived')
    const inventoryId = searchParams.get('inventoryId') || ''
    const order: 'asc' | 'desc' = (searchParams.get('order') as 'asc' | 'desc') || 'asc';
    const orderBy = searchParams.get('orderBy') || ''
    const page = Number(searchParams.get('page')) || 0
    const limit = Number(searchParams.get('rows')) || 10
    useEffect(() => {
        getItems()
    }, [from, to, searchBy, includeArchived, inventoryId, order, orderBy, page, limit])

    const getItems = async () => {
        const { data, total } = await ListItems({
            inventoryId: inventoryId,
            includeArchived: includeArchived,
            from: from,
            to: to,
            searchBy: searchBy,
            order: order,
            orderBy: orderBy,
            page: page,
            limit: limit

        })
        setItems(data)
        setCount(total)

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
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                height: '100%',
            }}>
            <Box

                component={Paper}
                sx={{
                    padding: '5px 10px 10px 10px',
                }}
            >
                <FiltersHeader />
            </Box>
            <Box
                component={Paper}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '10px 10px 10px 10px',
                    height: '100%',
                    justifyContent: 'space-between',
                    gap: '5px'
                }} >
                <ItemsTable
                    items={items}
                    handleSelectItem={onSelectItem}
                    itemsSelected={itemsSelected}
                    clearItemsSelected={clearItemsSelected}
                    count={count}
                />
                <MenuOptions />
            </Box>
        </Box >
    )
}