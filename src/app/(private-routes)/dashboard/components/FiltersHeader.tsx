import { Grid, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material"
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
    const inventoryId = searchParams.get('inventoryId') ?? ''

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
    return (
        <Grid container spacing={2} >
            <Grid item xs={4}>
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
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={6} container>
                <Grid item xs={2} display='flex' alignItems='flex-end' >
                    <FilterButton
                        onClick={() => updateFilters('includeArchived', includeArchived ? 'false' : 'true')}
                        isActive={includeArchived}
                    >
                        Removidas
                    </FilterButton>
                </Grid>
            </Grid>
            <Grid item xs={6} container spacing={2}>
                <Grid item xs={3} container>
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
                <Grid item xs={3} container>
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
                <Grid item xs={6}>
                    <Typography variant='caption' fontWeight='600'>Patio</Typography>
                    <Select
                        value={inventoryId}
                        fullWidth
                        id="inventory-select"
                        onChange={(e) => updateFilters('inventoryId', e.target.value ?? '')}
                        size="small"
                    >
                        <MenuItem value={''}></MenuItem>
                        {inventorysList?.length > 0 && inventorysList?.map((item: inventory) => (
                            <MenuItem
                                key={item.id}
                                value={item.id}>
                                {item.name} - {item.volumeM3}M3
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default FiltersHeader