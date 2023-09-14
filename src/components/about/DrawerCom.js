import React, { useState } from 'react';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import { Drawer, Button, List, ListItemButton, ListItemText, ListItemIcon, styled, IconButton } from '@mui/material';
import { MenuIcon, EmojiEventsIcon } from '@mui/icons-material';
import { PATH_AUTH } from '../../routes/paths';
import useFirebase from '../../hooks/useFirebase';

const StyledNavlink = styled(NavLink)(() => ({
  textDecoration: 'none',
  activeStyle: '#FF6C2C',
  color: '#000',
  fontWeight: '400',
  cursor: 'pointer',
}));

const Circle = styled('span')(() => ({
  width: '16px',
  height: '16px',
  borderRadius: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  background: '#FF6C2C',
  textAlign: 'center',
  fontSize: '8px',
}));

export default function DrawerCom() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { isAuthenticated } = useFirebase();

  return (
    <div>
      <Drawer
        open={openDrawer}
        PaperProps={{ sx: { backgroundColor: '#fff' } }}
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
                <StyledNavlink to="/dashboard/tickets" sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  My Tickets <Circle> 0</Circle>
                </StyledNavlink>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>
                <StyledNavlink to="/leaderboard" sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  Leaderboard
                  <EmojiEventsIcon sx={{ color: '#FFD700', width: '1.2rem', height: '1.2rem' }} />
                </StyledNavlink>
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <ListItemText>
                {!isAuthenticated && (
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: '#CC5A27',
                      border: '1px solid #CC5A27',
                      '&:hover': {
                        color: '#CC5A27',
                        bgcolor: 'transparent',
                        border: '1px solid #CC5A27',
                      },
                    }}
                    component={RouterLink}
                    to={PATH_AUTH.login}
                  >
                    Sign In
                  </Button>
                )}
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon sx={{ color: '#000' }} />
      </IconButton>
    </div>
  );
}
