import React, { useState } from 'react';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import {
  Drawer,
  Button,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  styled,
  IconButton,
  Avatar,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { PATH_AUTH } from '../../routes/paths';
import useFirebase from '../../hooks/useFirebase';

export default function DrawerCom() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { isAuthenticated, user } = useFirebase();
  const StyledNavlink = styled(NavLink)(() => ({
    textDecoration: 'none',
    activeStyle: '#FF6C2C',
    color: '#FFFFFF',
    fontWeight: '400',
    cursor: 'pointer',
  }));

  return (
    <div>
      <Drawer
        open={openDrawer}
        PaperProps={{ sx: { backgroundColor: 'rgba(0, 0, 0, 0.79)' } }}
        onClose={() => setOpenDrawer(false)}
        anchor="right"
      >
        <List>
          <ListItemButton open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <ListItemIcon>
              <ListItemText>
                <StyledNavlink to="/">Home</StyledNavlink>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>
                <StyledNavlink to="/about">About</StyledNavlink>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>
                <StyledNavlink to="/contact-us">Contact Us</StyledNavlink>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>
                <StyledNavlink to="/dashboard/tickets">My Tickets</StyledNavlink>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>
                {!isAuthenticated && (
                  <Button variant="contained" sx={{ bgcolor: '#CC5A27' }} component={RouterLink} to={PATH_AUTH.login}>
                    Sign In
                  </Button>
                )}
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
      <Stack direction="row" alignItems="center">
        {isAuthenticated && (
          <StyledNavlink to="/dashboard/profile">
            <Avatar src={user?.photoURL} alt={user?.firstName} sx={{ width: '2rem', height: '2rem' }} />
          </StyledNavlink>
        )}
        <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
          <MenuIcon sx={{ color: '#fff' }} />
        </IconButton>
      </Stack>
    </div>
  );
}
