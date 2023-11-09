
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
    path: '/transactions',
    name: 'Transações',
    Icon: InventoryIcon
}, {
    path: '/products',
    name: 'Produtos',
    Icon: InventoryIcon
}, {
    path: '/inventory',
    name: 'Inventários',
    Icon: InventoryIcon
}]