import { FormControlLabel, Grid, InputAdornment, MenuItem, Select, SelectChangeEvent, Switch, TextField, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import FilterButton from "@/app/components/FilterButton/FilterButton";
import { useEffect, useState } from "react";
import { inventory } from "@/types/inventory/inventory";
import { ListInventorys } from "@/services/inventoryService";
import { useSearchParams } from "next/navigation";
import useFilterUpdater from "@/utils/hooks/useFilterUpdate";
const FiltersHeader = () => {
    const updateFilters = useFilterUpdater()

    const searchParams = useSearchParams()
    const from = searchParams.get('from') ?? ''
    const to = searchParams.get('to') ?? ''
    const searchBy = searchParams.get('searchBy') ?? ''
    const includeArchived = searchParams.has('includeArchived')
    const inventorysIds = (searchParams.get('inventorysIds')?.split(',')) || []

    const [inventorysList, setInventorysList] = useState<inventory[]>([])
 
    useEffect(() => {
        getInventorys()
    }, [])

    const getInventorys = async () => {
        await ListInventorys({
            includeVolume: true
        }).then((response) => {
            setInventorysList(response);
        }).catch((error) => {
            console.log(error)
        })
    }
    const selectInventory = (event: SelectChangeEvent<typeof inventorysIds>) => {
        const { target: { value } } = event;
        const lastIndex = value[value.length - 1].toString()
        let newValue;
        const selectedValue = value.toString();
        if (value.includes(lastIndex)) {
            const newFormatedValue = value as string[]
            newValue = newFormatedValue.filter((values) => values.toString() !== lastIndex).join(',')
        } else {
            newValue = (typeof selectedValue === 'string' ? selectedValue.split(',') : selectedValue).join(',')
        }
        updateFilters('inventorysIds', newValue);
    };
    return (
        <Grid container spacing={2} >
            <Grid item xs={6}>
                <Typography variant='caption' fontWeight='600'>Pesquisar</Typography>
                <TextField
                    onChange={(e) => updateFilters('searchBy', e.target.value)}
                    placeholder="Pesquisar nome, nome cientifico, plaqueta..."
                    fullWidth
                    variant="outlined"
                    value={searchBy}
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                ></TextField>
            </Grid>
   
            <Grid item xs={12} md={6} container spacing={2}>
                <Grid item xs={12} md = {3} alignItems='flex-end' justifyContent='flex-end' display='flex' >
                    <FormControlLabel
                        value='top'
                        label='Removidas'
                        control={
                            <Switch
                                onChange={() => updateFilters('includeArchived', includeArchived ? 'false' : 'true')}
                                checked={includeArchived}
                            ></Switch>
                        }
                    />

                </Grid>
                <Grid item xs={6} md={3} container>
                    <Grid item xs={12}>
                        <Typography variant='caption' fontWeight='600'>Data Inicial</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="date"
                            fullWidth
                            value={from}
                            onChange={(e) => updateFilters('from', e.target.value)}
                            size="small"
                        >
                        </TextField>
                    </Grid>
                </Grid>
                <Grid item xs={6} md={3} container>
                    <Grid item xs={12}>
                        <Typography variant='caption' fontWeight='600'>Data Final</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="date"
                            onChange={(e) => updateFilters('to', e.target.value)}
                            fullWidth
                            value={to}
                            size="small"
                        >

                        </TextField>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="caption" fontWeight='bolder'>Patios</Typography>
                    <Select
                        fullWidth
                        value={inventorysIds}
                        multiple
                        size="small"
                        displayEmpty
                        onChange={selectInventory}
                    >
                        {inventorysList.map((inventory) => (
                            <MenuItem value={inventory.id}>{inventory.name}</MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default FiltersHeader