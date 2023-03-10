import { AppBar, Toolbar, Typography, Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import logoImg from '../../assets/logoImg.png';
import DrawerCom from './DrawerCom';
import { PATH_AUTH } from '../../routes/paths';

export default function Navbar() {
  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(3),
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

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Toolbar style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        {isMatch && <Box />}

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
          <DrawerCom />
        ) : (
          <>
            <NavbarLinksBox style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
              <StyledNavlink to="/">Home</StyledNavlink>
              <StyledNavlink to="/about">About</StyledNavlink>
              <StyledNavlink to="/contact-us">Contact Us</StyledNavlink>
              <StyledNavlink to="#">My Concerts</StyledNavlink>
              <StyledNavlink to="/dashboard/tickets" sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                My Tickets{' '}
                <Sircle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  0
                </Sircle>
              </StyledNavlink>
              <StyledNavlink to={PATH_AUTH.register}>Sign Up</StyledNavlink>
            </NavbarLinksBox>
            <NavbarLinksBox style={{ display: 'flex', justifyContent: 'end' }}>
              <StyledNavlink to="#">
                <Button variant="outlined" sx={{ border: '1px solid #FF6C2C', color: '#fff' }}>
                  + Create a Concert
                </Button>
              </StyledNavlink>
            </NavbarLinksBox>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
