import { AppBar, Toolbar, Typography, Box, Button, useMediaQuery, useTheme, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/blueLogo.png';
import { PATH_AUTH } from '../../routes/paths';
import DrawerCom from './DrawerCom';

export default function Navbar() {
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

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="logo" style={{ width: '37px', height: '37px' }} />
          <Typography sx={{ fontWeight: '600', letterSpacing: '.3rem', fontSize: '1.5rem', color: '#1358A5' }}>
            eventnub
          </Typography>
        </Box>
        {isMatch ? (
          <DrawerCom />
        ) : (
          <>
            <NavbarLinksBox>
              <StyledNavlink to="/">Home</StyledNavlink>
              <StyledNavlink to="/about">About</StyledNavlink>
              <StyledNavlink to="#">Contact Us</StyledNavlink>
              <StyledNavlink to="#">My Concerts</StyledNavlink>
              <StyledNavlink to="/tickets" sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                My Tickets<Sircle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>0</Sircle>
              </StyledNavlink>
              <StyledNavlink to={PATH_AUTH.register}>Sign Up</StyledNavlink>
            </NavbarLinksBox>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
