import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IconButton, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import BaseDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import { drawerWidth } from 'config/constants';
import Link from 'next/link';
import { FC, Fragment, MouseEventHandler } from 'react';

import { menuItems } from './menuItems';

const DrawerHeader = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export type DrawerProps = {
  open: boolean;
  handleDrawerClose: MouseEventHandler<HTMLButtonElement>;
};

const Drawer: FC<DrawerProps> = ({ handleDrawerClose, open }) => {
  const theme = useTheme();
  return (
    <BaseDrawer
      anchor="left"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
        flexShrink: 0,
        width: drawerWidth,
      }}
      variant="persistent">
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
      </DrawerHeader>
      <Divider />
      <List disablePadding>
        {menuItems.map(({ Icon, name, path }) => (
          <Fragment key={name}>
            <ListItem key={name} disablePadding>
              <Link href={path}>
                <ListItemButton>
                  {Icon && (
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                  )}
                  <ListItemText primary={name} />
                </ListItemButton>
              </Link>
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    </BaseDrawer>
  );
};

export default Drawer;
