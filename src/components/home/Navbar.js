import { AppBar, Toolbar, Typography, Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import logoImg from '../../assets/logoImg.png';
import DrawerCom from './DrawerCom';

export default function Navbar() {
  const activeStyle = { color: '#FF6C2C' };
  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(3),
  }));

  const StyledNavlink = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',
    color: '#FFFFFF',
    fontWeight: '400',
  }));

  const Sircle = styled('div')(({ theme }) => ({
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
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none', position: 'absolute', zIndex: '1' }}>
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
              <StyledNavlink to="/" exact activeStyle={activeStyle}>
                Home
              </StyledNavlink>
              <StyledNavlink to="#" exact activeStyle={activeStyle}>
                About
              </StyledNavlink>
              <StyledNavlink to="#" exact activeStyle={activeStyle}>
                Contact Us
              </StyledNavlink>
              <StyledNavlink
                to="/tickets"
                exact
                activeStyle={activeStyle}
                sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                My Tickets <Sircle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>0</Sircle>
              </StyledNavlink>
              <StyledNavlink to="/register" exact activeStyle={activeStyle}>
                Sign Up
              </StyledNavlink>
            </NavbarLinksBox>
            <NavbarLinksBox style={{ display: 'flex', justifyContent: 'end' }}>
              <StyledNavlink to="#" exact activeStyle={activeStyle}>
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
