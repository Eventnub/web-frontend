import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery, useTheme, styled, Avatar } from '@mui/material';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
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
  const { isAuthenticated, user } = useFirebase();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none', p: '1.2rem' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <StyledNavlink to={'/'} sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="logo" style={{ width: '70px', height: '70px' }} />
          <Typography
            sx={{
              color: '#1358A5',
              fontWeight: '600',
              letterSpacing: 3,
              fontSize: { xs: '.8rem', md: '1.2rem' },
            }}
          >
            eventnub
          </Typography>
        </StyledNavlink>
        {isMatch ? (
          <DrawerCom />
        ) : (
          <>
            <NavbarLinksBox style={{ display: 'flex', flex: '1' }}>
              <StyledNavlink to="/">Home</StyledNavlink>
              <StyledNavlink to="/about">About</StyledNavlink>
              <StyledNavlink to="/contact-us">Contact Us</StyledNavlink>
              <StyledNavlink to="/dashboard/tickets" sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                My Tickets<Sircle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>0</Sircle>
              </StyledNavlink>
              <StyledNavlink to="/leaderboard" sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                Leaderboard
                <EmojiEventsIcon sx={{ color: '#FFD700' }} />
              </StyledNavlink>
            </NavbarLinksBox>
            {isAuthenticated ? (
              <StyledNavlink to="/dashboard/profile">
                <Avatar src={user?.photoURL} alt={user?.firstName} sx={{ width: '2rem', height: '2rem' }} />
              </StyledNavlink>
            ) : (
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#CC5A27',
                  border: '1px solid #CC5A27',
                  '&:hover': {
                    color: '#CC5A27',
                    bgcolor: 'transparent',
                    border: '1px solid #CC5A27',
                  },
                }}
                component={RouterLink}
                to={PATH_AUTH.login}
              >
                Sign In
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
