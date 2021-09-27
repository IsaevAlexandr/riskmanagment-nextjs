import React from 'react';
import { observer } from 'mobx-react-lite';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import {
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  useMediaQuery,
  List,
  Toolbar,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Drawer as MuiDrawer,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GridViewIcon from '@mui/icons-material/GridView';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AlbumIcon from '@mui/icons-material/Album';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import { NextLinkComposed } from '../src/Link';
import { useStores } from '../hooks';

import { Logo } from './Logo';
import { AuthUserMenu } from './AuthUserMenu';

const drawerWidth = 320;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export const Layout: React.FC = observer(({ children }) => {
  const theme = useTheme();
  const [session] = useSession();
  const { appState } = useStores();
  const router = useRouter();
  const handleDrawerOpen = () => {
    appState.setMenuOpen(true);
  };

  const handleDrawerClose = () => {
    appState.setMenuOpen(false);
  };

  const isSmallScreen = useMediaQuery('(max-width:500px)');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={appState.menuOpen} sx={{ bgcolor: '#fff' }}>
        <Toolbar>
          {session && (
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: (t) => t.spacing(4),
                ...(appState.menuOpen && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Logo />

          {!isSmallScreen ? (
            <Typography variant="h6" component="div" sx={{ ml: 4 }} color="primary">
              СОН - Cистема обеспечения непрерывности
            </Typography>
          ) : null}

          {session && <AuthUserMenu username={session.user?.name} />}
        </Toolbar>
      </AppBar>
      {session && (
        <Drawer variant="permanent" open={appState.menuOpen}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItemButton component={NextLinkComposed} to="/" selected={router.pathname === '/'}>
              <ListItemIcon>
                <GridViewIcon />
              </ListItemIcon>

              <ListItemText primary="Управление рисками" />
            </ListItemButton>

            <ListItemButton
              component={NextLinkComposed}
              to="/monitoring"
              selected={router.pathname === '/monitoring'}
            >
              <ListItemIcon>
                <AlbumIcon />
              </ListItemIcon>
              <ListItemText primary="Мониторинг рисков" />
            </ListItemButton>

            <ListItemButton
              component={NextLinkComposed}
              to="/events"
              selected={router.pathname === '/events'}
            >
              <ListItemIcon>
                <EventNoteIcon />
              </ListItemIcon>
              <ListItemText primary="Планирование мероприятий" />
            </ListItemButton>
          </List>
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
});
