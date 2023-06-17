import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Stack, Typography, styled, useTheme, Divider, TextField, IconButton } from '@mui/material';
import logoImg from '../../assets/logoImg.png';
import facebook from '../../assets/Facebook.png';
import linkedin from '../../assets/linkedin.png';
import twitter from '../../assets/Twitter.png';
import instagram from '../../assets/Instagram.png';
import sendIcon from '../../assets/sendIcon.png';

export default function Footer() {
  const theme = useTheme();
  const StyledNavlink = styled(Link)(() => ({
    textDecoration: 'none',
    color: '#FFFFFF',
    fontWeight: '400',
  }));

  const StyledTypograph = styled(Typography)({
    fontSize: '10px',
    color: '#fff',
  });

  const Paragraph = styled(Typography)({
    fontSize: '.8rem',
    color: '#fff',
    fontWeight: '400',
  });

  return (
    <Box
      sx={{
        backgroundColor: '#1358A5',
        color: '#fff',
        width: '100%',
        px: { xs: '2rem', md: '5rem' },
        [theme.breakpoints.down('sm')]: { padding: '30px' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '80%',
          width: '100%',
          justifyContent: 'space-between',
          [theme.breakpoints.down('md')]: { flexDirection: 'column', height: 'fit-content' },
        }}
      >
        <Box sx={{ width: '350px' }}>
          <Stack>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
              <StyledNavlink to="/">
                <img src={logoImg} alt="logo" style={{ marginRight: '10px' }} />
              </StyledNavlink>

              <Typography
                sx={{
                  color: '#FFFFFF',
                  fontWeight: '600',
                  letterSpacing: 5,
                  fontSize: 200,
                  [theme.breakpoints.down('sm')]: { fontSize: 20 },
                }}
                variant="h5"
              >
                eventnub
              </Typography>
            </Box>
            <Box sx={{ marginTop: '15px' }}>
              <Paragraph>Made for Afrobeat artistes</Paragraph>
              <Paragraph>and true fans</Paragraph>
              <Stack direction="row" alignItems="center" mt="1rem" spacing={2}>
                <a href="https://www.linkedin.com/company/glob-eventnub/" target="_blank" rel="noreferrer">
                  <img src={linkedin} alt="linkedin" style={{ width: '25px', height: '25px' }} />
                </a>
                <a href="https://www.facebook.com/globeventnub" target="_blank" rel="noreferrer">
                  <img src={facebook} alt="facebook" style={{ width: '25px', height: '25px' }} />
                </a>
                <a href="https://twitter.com/globeventnub?s=20" target="_blank" rel="noreferrer">
                  <img src={twitter} alt="twitter" style={{ width: '25px', height: '25px' }} />
                </a>
                <a href="https://instagram.com/globeventnub?igshid=YmMyMTA2M2Y=" target="_blank" rel="noreferrer">
                  <img src={instagram} alt="instagram" style={{ width: '25px', height: '25px' }} />
                </a>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box sx={{ width: '250px', flexDirection: 'column', marginTop: '30px' }}>
          <Typography component="h6" sx={{ color: '#fff' }}>
            Quik Links
          </Typography>
          <Stack spacing={3} sx={{ marginTop: '15px' }}>
            <StyledNavlink to="/contact-us">
              <Paragraph>Contact us</Paragraph>
            </StyledNavlink>
            <StyledNavlink to="/about">
              <Paragraph>About</Paragraph>
            </StyledNavlink>
            {/* {isAuthenticated && (
                <StyledNavlink to="/my-events">
                  <Paragraph>My Events</Paragraph>
                </StyledNavlink>
              )} */}
            <StyledNavlink to="/dashboard/tickets">
              <Paragraph>My Tickets</Paragraph>
            </StyledNavlink>
            {/* <StyledNavlink to="/#">
                <Paragraph>Create Concerts</Paragraph>
              </StyledNavlink> */}
          </Stack>
        </Box>
        <Box sx={{ width: '300px', display: 'flex', flexDirection: 'column', marginTop: '30px' }}>
          <Typography component="h6" sx={{ color: '#fff' }}>
            Newsletter
          </Typography>
          <Paragraph sx={{ my: '15px' }}>Don't miss any update of our moment.</Paragraph>
          {/* <InputStyle size="medium" placeholder="Email" /> */}
          <TextField
            placeholder="Email"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: '1.5px solid #fff',
                  borderRadius: '30px',
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <>
                  <IconButton style={{ borderLeft: '1.5px solid #fff', borderRadius: 0 }} edge="end">
                    <img src={sendIcon} alt="send" />
                  </IconButton>
                </>
              ),
            }}
          />
        </Box>
      </Box>
      <Divider sx={{ paddingBottom: '20px', paddingTop: '20px' }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: '20px',
          paddingTop: '20px',
        }}
      >
        <StyledTypograph>Copyright 2023 Eventnub.com</StyledTypograph>
      </Box>
    </Box>
  );
}
