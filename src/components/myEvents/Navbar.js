import React, { useState } from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  styled,
  Link,
  Menu,
  MenuItem,
  Avatar,
  IconButton,
  useTheme,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ListItem,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import LogoutButton from '../../layouts/dashboard/navbar/LogoutButton';
import { PATH_AUTH } from '../../routes/paths';
import useFirebase from '../../hooks/useFirebase';
import logo from '../../assets/blueLogo.png';
import account from '../../assets/account-music.png';
import home from '../../assets/home-floor-0.png';
import archive from '../../assets/archive-eye.png';

const Circle = styled('span')(() => ({
  width: '20px',
  height: '20px',
  borderRadius: '50px',
  display: 'inline-block',
  background: '#FF6C2C',
  textAlign: 'center',
  fontSize: '10px',
}));

const StyledNavlink = styled(NavLink)(() => ({
  textDecoration: 'none',
  activeStyle: '#FF6C2C',
  color: '#000',
  fontWeight: '400',
  cursor: 'pointer',
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSecondDrawer, setOpenSecondDrawer] = useState(false);
  const theme = useTheme();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { user, isAuthenticated } = useFirebase();
  return (
    <AppBar position="static" sx={{ background: '#fff', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={() => setOpenSecondDrawer(!openDrawer)}
            sx={{ display: 'none', [theme.breakpoints.down('sm')]: { display: 'block' } }}
          >
            <PlayArrowIcon sx={{ color: '#000' }} />
          </IconButton>
          <Drawer
            open={openSecondDrawer}
            PaperProps={{ sx: { backgroundColor: '#EDF5F6', width: '50%', py: '4rem', px: '2rem' } }}
            onClose={() => setOpenSecondDrawer(false)}
            anchor="left"
          >
            <Typography>MENU</Typography>
            <List>
              <ListItem disablePadding sx={{ mb: '1rem' }}>
                <ListItemButton comoponent={RouterLink} to="/my-events">
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
              sx={{
                position: 'absolute',
                bottom: 130,
                background: '#1358A5',
                boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.25)',
                borderRadius: '30px',
              }}
              startIcon={<AddIcon />}
            >
              Create Event
            </Button>
          </Drawer>
          <Link to="/" component={RouterLink} underline="none">
            <img src={logo} alt="logo" style={{ width: '3rem', height: '3rem' }} />
          </Link>
          <Link
            to="/"
            component={RouterLink}
            underline="none"
            sx={{ [theme.breakpoints.down('sm')]: { display: 'none' } }}
          >
            <Typography variant="h5" sx={{ color: '#1358A5', letterSpacing: '0.2rem' }}>
              eventnub
            </Typography>
          </Link>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: '3rem', gap: '2rem' }}>
            <Link component={RouterLink} underline="none" to="/">
              <Typography sx={{ color: '#000', fontWeight: '200', fontSize: '.9rem' }}>Home</Typography>
            </Link>
            <Link component={RouterLink} underline="none" to="/about">
              <Typography sx={{ color: '#000', fontWeight: '200', fontSize: '.9rem' }}>About</Typography>
            </Link>
            <Link component={RouterLink} underline="none" to="/contact-us">
              <Typography sx={{ color: '#000', fontWeight: '200', fontSize: '.9rem' }}>Contact Us</Typography>
            </Link>
            <Link component={RouterLink} underline="none" to="/my-events">
              <Typography sx={{ color: '#000', fontWeight: '200', fontSize: '.9rem' }}>My Events</Typography>
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
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>
              <LogoutButton />
            </MenuItem>
          </Menu>
          <IconButton
            onClick={() => setOpenDrawer(!openDrawer)}
            sx={{ display: { md: 'none', lg: 'none', xl: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            open={openDrawer}
            PaperProps={{ sx: { backgroundColor: '#fff', width: '50%', pt: '2rem', pl: '1rem' } }}
            onClose={() => setOpenDrawer(false)}
            anchor="right"
          >
            <List style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
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
                    {isAuthenticated && <StyledNavlink to="/my-events">My Events</StyledNavlink>}
                  </ListItemText>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <ListItemText>
                    <StyledNavlink to="/dashboard/tickets">
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
                    </StyledNavlink>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}
