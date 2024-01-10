import { getItemsReport } from "@/services/itemService"
import { Box, Button, FormControlLabel, Grid, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from "@mui/material"
import FilterDateInput from "../../FilterDateInput/FilterDateInput"
import { useEffect, useState } from "react"
import Switch from '@mui/material/Switch';
import { inventory } from "@/types/inventory/inventory";
import { ListInventorys } from "@/services/inventoryService";
import { ListProducts } from "@/services/productsService";
import { IProduct } from "@/types/product/product";

export const Reports = () => {
    const [inventoryList, setInventoryList] = useState<inventory[]>([])
    const [from, setFrom] = useState<Date | null>(null)
    const [to, setTo] = useState<Date | null>(null)
    const [includeAchived, setIncludeArchived] = useState<boolean>(false)
    const [inventorysIds, setInventorysIds] = useState<string[]>([''])
    const [productsList, setProductsList] = useState<IProduct[]>([])
    const [productsIds, setProductsIds] = useState<string[]>([])

    const downloadReport = async () => {
        await getItemsReport({
            from: from,
            to: to,
            includeArchived: includeAchived,
            inventorysIds: getInventorysByName(inventorysIds),
            productsIds: getProductsByName(productsIds)
        })
    }
    useEffect(() => {
        getInventoryList()
        getProductsList()
    }, [])
    const handleChangeIncludeArchived = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIncludeArchived(event.target.checked);
    };
    const getInventoryList = async () => {
        const response = await ListInventorys({})
        setInventoryList(response)
    }
    const getProductsList = async () => {
        const response = await ListProducts({})
        setProductsList(response)
    }
    const selectInventory = (event: SelectChangeEvent<typeof inventorysIds>) => {
        const { target: { value } } = event;
        const selectedValue = value.toString();
        setInventorysIds(
            typeof selectedValue === 'string' ? selectedValue.split(',') : selectedValue
        );
    };
    const selectProduct = (event: SelectChangeEvent<typeof productsIds>) => {
        const { target: { value } } = event;
        const selectedValue = value.toString();
        setProductsIds(
            typeof selectedValue === 'string' ? selectedValue.split(',') : selectedValue
        );
    };
    const getInventorysByName = (inventorys: string[]): string => {
        const result = inventorys
            .map((inventoryName) => {
                const inventory = inventoryList.find((item) => item.name === inventoryName);
                return inventory ? inventory.id : '';
            })
            .filter((id) => id !== '')
            .join(',');
        return result;
    };
    const getProductsByName = (products: string[]): string => {
        const result = products
            .map((productName) => {
                const product = productsList.find((item) => item.scientificName === productName);
                return product ? product.id : '';
            })
            .filter((id) => id !== '')
            .join(',');
        return result;
    };
    return (
        <Box sx={{
            width: 400,
        }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControlLabel
                        value='top'
                        label='Removidas'
                        control={
                            <Switch
                                onChange={handleChangeIncludeArchived}
                                checked={includeAchived}
                            ></Switch>
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption" fontWeight='bolder'>Produtos</Typography>
                    <Select
                        fullWidth
                        value={productsIds}
                        multiple
                        displayEmpty
                        onChange={selectProduct}
                    >
                        {productsList.map((product) => (
                            <MenuItem value={product.scientificName}>{product.scientificName} {product.commonName}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption" fontWeight='bolder'>Patios</Typography>
                    <Select
                        fullWidth
                        value={inventorysIds}
                        multiple
                        displayEmpty
                        onChange={selectInventory}
                    >
                        {inventoryList.map((inventory) => (
                            <MenuItem value={inventory.name}>{inventory.name}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption" fontWeight='bolder'>Data de entrada</Typography>
                    <Grid item container spacing={2}>
                        <Grid item xs={6}>
                            <FilterDateInput
                                value={from}
                                onChange={(value) => setFrom(value)}
                                props={{
                                    fullWidth: true
                                }}
                            >
                            </FilterDateInput>
                        </Grid>
                        <Grid item xs={6}>
                            <FilterDateInput
                                value={to}
                                onChange={(value) => setTo(value)}
                                props={{
                                    fullWidth: true
                                }}
                            >
                            </FilterDateInput>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" onClick={() => downloadReport()}>Gerar Relatorio</Button>
                </Grid>
            </Grid>
        </Box>
    )
}