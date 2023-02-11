import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemText, ListItemIcon, styled, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function DrawerCom() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const StyledNavlink = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',
    activeStyle: '#FF6C2C',
    color: '#FFFFFF',
    fontWeight: '400',
    cursor: 'pointer',
  }));

  return (
    <div>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <ListItemButton open={openDrawer} onClose={() => setOpenDrawer(false)}>
            <ListItemIcon>
              <ListItemText>
                <StyledNavlink to="#">Home</StyledNavlink>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>
                <StyledNavlink to="#">About</StyledNavlink>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>
                <StyledNavlink to="#">Contact Us</StyledNavlink>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>
                <StyledNavlink to="#">My Tickets</StyledNavlink>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>
                <StyledNavlink to="#">Sign Up</StyledNavlink>
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
