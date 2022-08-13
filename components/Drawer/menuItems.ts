import { Group, Home, Mail, PersonAdd } from '@mui/icons-material';

export const menuItems = [
  {
    Icon: Home,
    name: 'Home',
    path: '/',
  },
  {
    Icon: Group,
    name: 'Customers',
    path: '/customers/list',
  },
  {
    Icon: PersonAdd,
    name: 'Add Customers',
    path: '/customers/add',
  },
  {
    Icon: Mail,
    name: 'Invoices',
    path: '/invoices/add',
  },
];
