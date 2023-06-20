import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery, useTheme, Avatar } from '@mui/material';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import logoImg from '../../assets/logoImg.png';
import DrawerCom from './DrawerCom';
import { PATH_AUTH } from '../../routes/paths';
import useFirebase from '../../hooks/useFirebase';

const NavbarLinksBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5rem',
}));

const StyledNavlink = styled(NavLink)(() => ({
  textDecoration: 'none',
  color: '#FFFFFF',
  fontWeight: '400',
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
  const { isAuthenticated, user } = useFirebase();

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* {isMatch && <Box />} */}
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <StyledNavlink to={'/'}>
            <img src={logoImg} alt="logo" style={{ marginRight: '10px' }} />
          </StyledNavlink>
          <Typography
            sx={{
              color: '#FFFFFF',
              fontWeight: '600',
              letterSpacing: 5,
              fontSize: 200,
              [theme.breakpoints.down('sm')]: { fontSize: '20px' },
            }}
            variant="h5"
          >
            eventnub
          </Typography>
        </Box>
        {isMatch ? (
          <>
            <DrawerCom />
          </>
        ) : (
          <>
            <NavbarLinksBox style={{ display: 'flex', flex: '1' }}>
              <StyledNavlink to="/">Home</StyledNavlink>
              <StyledNavlink to="/about">About</StyledNavlink>
              <StyledNavlink to="/contact-us">Contact Us</StyledNavlink>
              <StyledNavlink to="/dashboard/tickets" sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                My Tickets{' '}
                <Sircle
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  0
                </Sircle>
              </StyledNavlink>
            </NavbarLinksBox>
            {isAuthenticated ? (
              <StyledNavlink to="/dashboard/profile">
                <Avatar src={user?.photoURL} alt={user?.firstName} sx={{ width: '2rem', height: '2rem' }} />
              </StyledNavlink>
            ) : (
              <Button variant="contained" sx={{ bgcolor: '#CC5A27' }} component={RouterLink} to={PATH_AUTH.login}>
                Sign In
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
