import React from 'react';
import { Button, ListItemIcon, ListItemText, Menu, MenuItem, useTheme } from '@mui/material';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { signOut } from 'next-auth/client';

interface AuthUserMenuProps {
  username?: string | null;
}

export const AuthUserMenu: React.FC<AuthUserMenuProps> = ({ username }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Button color="primary" aria-haspopup="true" onClick={handleMenu} sx={{ ml: 'auto' }}>
        <AccountCircle sx={{ mr: 1 }} />
        {username}
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
        style={{ zIndex: theme.zIndex.modal + 1 }}
      >
        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Выйти из аккаунта" />
        </MenuItem>
      </Menu>
    </>
  );
};
