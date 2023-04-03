import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import home from '../../assets/home-floor-0.png';
import archive from '../../assets/archive-eye.png';
import account from '../../assets/account-music.png';

export default function Sidebar() {
  return (
    <Box>
      <Typography sx={{ color: '#C6C6C6', fontSize: '.9rem', fontWeight: '500' }}>MENU</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <List>
          <ListItem disablePadding sx={{ mb: '1rem' }}>
            <ListItemButton component={Link} to="/my-events">
              <ListItemIcon>
                <img src={home} alt="home" />
              </ListItemIcon>
              <ListItemText
                sx={{
                  '& .MuiListItemText-primary': { color: '#515151', fontWeight: '400' },
                }}
                primary="Explore"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ mb: '1rem' }}>
            <ListItemButton>
              <ListItemIcon>
                <img src={account} alt="account" />
              </ListItemIcon>
              <ListItemText
                sx={{
                  '& .MuiListItemText-primary': { color: '#515151', fontWeight: '400' },
                }}
                primary="Fans"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <img src={archive} alt="archive" />
              </ListItemIcon>
              <ListItemText
                primary="Archived"
                sx={{
                  '& .MuiListItemText-primary': { color: '#515151', fontWeight: '400' },
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Button
          variant="contained"
          component={Link}
          to="/create-event"
          sx={{
            position: 'absolute',
            bottom: 35,
            background: '#1358A5',
            boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.25)',
            borderRadius: '30px',
          }}
          startIcon={<AddIcon />}
        >
          Create Event
        </Button>
      </Box>
    </Box>
  );
}
