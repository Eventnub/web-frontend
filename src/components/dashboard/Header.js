import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, InputBase, Typography, Link, Avatar, IconButton, Paper, Menu, MenuItem, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LogoutButton from '../../layouts/dashboard/navbar/LogoutButton';
import logoImg from '../../assets/blueLogo.png';
import avatarImg from '../../assets/avatar.png';
import useFirebase from '../../hooks/useFirebase';

const Circle = styled('span')(() => ({
  width: '20px',
  height: '20px',
  borderRadius: '50px',
  display: 'inline-block',
  background: '#FF6C2C',
  textAlign: 'center',
  fontSize: '10px',
}));

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { user } = useFirebase();
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={6}
      sx={{
        height: { xs: 'fit-content', sm: 'fit-content', md: '25vh' },
        backgroundColor: '#fff',
        px: '1.5rem',
        pt: '0.5rem',
        boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.25)',
        width: { xs: '100%', sm: '100%', md: '100%' },
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Link to="/" component={RouterLink} underline="none">
            <img src={logoImg} alt="logo" style={{ width: '3rem', height: '3rem' }} />
          </Link>
          <Link to="/" component={RouterLink} underline="none">
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
            <Link component={RouterLink} underline="none" to="#">
              <Typography sx={{ color: '#000', fontWeight: '200', fontSize: '.9rem' }}>My Concerts</Typography>
            </Link>
            <Link component={RouterLink} underline="none" to="/dashboard/tickets">
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#FF6C2C',
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
          <Avatar src={avatarImg} alt="avatar" sx={{ width: '2rem', height: '2rem' }} />
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
          <IconButton>
            <MenuIcon sx={{ display: { md: 'none', lg: 'none', xl: 'none' } }} />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: { xs: 'flex-start', sm: 'flex-start', md: 'center' },
          justifyContent: { xs: 'start', sm: 'start', md: 'space-between' },
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <ArrowBackIcon />
          <Typography variant="body1" sx={{ color: '#000', fontWeight: '400' }}>
            My Tickets
          </Typography>
        </Box>
        <Paper
          sx={{
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: { xs: '100%', sm: '100%', md: 400 },
            backgroundColor: '#F8F8F8',
            borderRadius: '1rem',
            border: '1px solid #C5C5C5',
          }}
        >
          <InputBase
            placeholder="Search Tickets"
            inputProps={{ 'aria-label': 'search' }}
            sx={{ marginLeft: 1, flex: 1 }}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
}

export default Header;
