import React from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemText, ListItemIcon, styled } from '@mui/material';
import PropTypes from 'prop-types';
import { PATH_AUTH } from '../../routes/paths';
import useFirebase from '../../hooks/useFirebase';

export default function DrawerCom({ open, handleClose }) {
  const { isAuthenticated } = useFirebase();

  const StyledNavlink = styled(NavLink)(() => ({
    textDecoration: 'none',
    activeStyle: '#FF6C2C',
    color: '#000',
    fontWeight: '400',
    cursor: 'pointer',
  }));

  return (
    <div>
      <Drawer open={open} PaperProps={{ sx: { backgroundColor: '#fff' } }} onClose={handleClose} anchor="right">
        <List>
          <ListItemButton open={open} onClose={handleClose}>
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
          {/* <ListItemButton>
            <ListItemIcon>
              <ListItemText>
                {isAuthenticated && user.role === 'host' && <StyledNavlink to="/my-events">My Events</StyledNavlink>}
              </ListItemText>
            </ListItemIcon>
          </ListItemButton> */}
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
                {!isAuthenticated && <StyledNavlink to={PATH_AUTH.register}>Sign Up</StyledNavlink>}
              </ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
    </div>
  );
}

DrawerCom.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
