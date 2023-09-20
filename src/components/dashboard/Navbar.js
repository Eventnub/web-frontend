import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  styled,
  Link,
  Popover,
  Avatar,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LogoutButton from '../../layouts/dashboard/navbar/LogoutButton';
import useFirebase from '../../hooks/useFirebase';
import logo from '../../assets/blueLogo.png';
import DrawerCom from './DrawerCom';

const Circle = styled('span')(() => ({
  width: '20px',
  height: '20px',
  borderRadius: '50px',
  display: 'inline-block',
  background: '#FF6C2C',
  textAlign: 'center',
  fontSize: '10px',
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const { user } = useFirebase();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerClose = () => {
    setShowDrawer(!showDrawer);
  };
  const handleDrawerOpen = () => {
    setShowDrawer(true);
  };

  return (
    <AppBar position="static" sx={{ background: '#fff', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <Link to="/" component={RouterLink} underline="none">
            <img src={logo} alt="logo" style={{ width: '3rem', height: '3rem' }} />
          </Link>
          <Link to="/" component={RouterLink} underline="none">
            <Typography variant="h5" sx={{ color: '#1358A5', letterSpacing: '0.2rem' }}>
              eventnub
            </Typography>
          </Link>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, mr: '3rem', gap: '2rem' }}>
            <Link component={RouterLink} underline="none" to="/">
              <Typography sx={{ color: '#000', fontWeight: '200', fontSize: '.9rem' }}>Home</Typography>
            </Link>
            <Link component={RouterLink} underline="none" to="/about">
              <Typography sx={{ color: '#000', fontWeight: '200', fontSize: '.9rem' }}>About</Typography>
            </Link>
            <Link component={RouterLink} underline="none" to="/contact-us">
              <Typography sx={{ color: '#000', fontWeight: '200', fontSize: '.9rem' }}>Contact Us</Typography>
            </Link>
            <Link component={RouterLink} underline="none" to="/dashboard/tickets">
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#000',
                  fontWeight: '200',
                  fontSize: '.9rem',
                }}
              >
                My Tickets
                <Circle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  0
                </Circle>
              </Typography>
            </Link>
          </Box>
          <Link component={RouterLink} to="/dashboard/profile">
            <Avatar src={user?.photoURL} alt={user?.firstName} sx={{ width: '2rem', height: '2rem' }} />
          </Link>
          <Typography
            variant="body2"
            sx={{
              color: '#000',
              fontWeight: '100',
              fontSize: '0.9rem',
              display: { xs: 'none', sm: 'none', md: 'block' },
            }}
          >
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <IconButton onClick={handleMenuClick}>
            <ExpandMoreIcon />
          </IconButton>
          <Popover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <List sx={{ width: '100%', bgcolor: 'common.white' }}>
              <ListItemButton component={RouterLink} to="/">
                <ListItemIcon>
                  <AirplaneTicketIcon />
                </ListItemIcon>
                <ListItemText primary="My Tickets" />
              </ListItemButton>
              <ListItemButton component={RouterLink} to="/">
                <ListItemIcon>
                  <EmojiEventsIcon />
                </ListItemIcon>
                <ListItemText primary="Game Results" />
              </ListItemButton>
              <Divider />
              <ListItemButton component={RouterLink} to="/">
                <ListItemIcon>
                  <LogoutButton />
                </ListItemIcon>
              </ListItemButton>
            </List>
          </Popover>
          <IconButton onClick={handleDrawerOpen} sx={{ display: { lg: 'none', xl: 'none' } }}>
            <MenuIcon sx={{ display: { lg: 'none', xl: 'none' } }} />
          </IconButton>
          <DrawerCom open={showDrawer} handleClose={handleDrawerClose} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
