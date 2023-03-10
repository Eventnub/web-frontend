import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemText, ListItemIcon, styled, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { PATH_AUTH } from '../../routes/paths';

export default function DrawerCom() {
  const [openDrawer, setOpenDrawer] = useState(false);

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
                <StyledNavlink to="#">My Concerts</StyledNavlink>
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
                <StyledNavlink to={PATH_AUTH.register}>Sign Up</StyledNavlink>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon sx={{ color: '#fff' }} />
      </IconButton>
    </div>
  );
}
