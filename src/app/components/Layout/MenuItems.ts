
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import { SvgIcon } from '@mui/material';

type MenuItem = {
    path: string;
    Icon: typeof SvgIcon;
    name: string;
}


export const MenuItems: MenuItem[] = [{
    path: '/dashboard',
    name: 'Inicio',
    Icon: HomeIcon
}, {
    path: '/items',
    name: 'Items',
    Icon: InventoryIcon
}, {
    path: '/transactions',
    name: 'Transações',
    Icon: InventoryIcon
}]