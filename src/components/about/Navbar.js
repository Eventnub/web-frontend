import { AppBar, Toolbar, Typography, Box, useMediaQuery, useTheme, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/blueLogo.png';
import { PATH_AUTH } from '../../routes/paths';
import DrawerCom from './DrawerCom';
import useFirebase from '../../hooks/useFirebase';

const StyledNavlink = styled(NavLink)(() => ({
  textDecoration: 'none',
  color: '#000',
  fontWeight: '400',
  fontSize: '16px',
}));
const NavbarLinksBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(6),
}));
const Sircle = styled('span')(() => ({
  width: '20px',
  height: '20px',
  borderRadius: '50px',
  color: 'black',
  display: 'inline-block',
  background: '#FF6C2C',
  textAlign: 'center',
  fontSize: '10px',
}));

export default function Navbar() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('lg'));
  const { isAuthenticated } = useFirebase();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <StyledNavlink to={'/'} sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="logo" style={{ width: '70px', height: '70px' }} />
          <Typography
            sx={{
              fontWeight: '600',
              letterSpacing: { xs: '.1rem', md: '.2rem' },
              fontSize: { xs: '.8rem', md: '1.1rem' },
              color: '#1358A5',
            }}
          >
            eventnub
          </Typography>
        </StyledNavlink>
        {isMatch ? (
          <DrawerCom />
        ) : (
          <>
            <NavbarLinksBox>
              <StyledNavlink to="/">Home</StyledNavlink>
              <StyledNavlink to="/about">About</StyledNavlink>
              <StyledNavlink to="/contact-us">Contact Us</StyledNavlink>
              {/* {isAuthenticated && user.role === 'host' && <StyledNavlink to="/my-events">My Events</StyledNavlink>} */}
              <StyledNavlink to="/dashboard/tickets" sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                My Tickets<Sircle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>0</Sircle>
              </StyledNavlink>
              {!isAuthenticated && <StyledNavlink to={PATH_AUTH.login}>Sign In</StyledNavlink>}
            </NavbarLinksBox>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
