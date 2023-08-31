import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Stack, Typography, styled, useTheme, Divider, TextField, IconButton, Grid } from '@mui/material';
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
        p: { xs: '2rem', md: '4rem' },
      }}
    >
      <Grid container>
        <Grid item xs={12} md={4}>
          <Stack direction="row" alignItems="center" component={StyledNavlink} to="/">
            <img src={logoImg} alt="logo" style={{ marginRight: '10px' }} />
            <Typography
              variant="h5"
              sx={{
                color: '#FFFFFF',
                fontWeight: '600',
                letterSpacing: 4,
                fontSize: 200,
                [theme.breakpoints.down('sm')]: { fontSize: 20 },
              }}
            >
              eventnub
            </Typography>
          </Stack>
          <Box sx={{ mt: '2rem' }}>
            <Paragraph>
              Made for Afrobeat artistes <br />
              and true fans
            </Paragraph>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: '2rem' }}>
              <a href="https://www.linkedin.com/company/glob-eventnub/" target="_blank" rel="noreferrer">
                <img src={linkedin} alt="linkedin" style={{ width: '25px', height: '25px' }} />
              </a>
              <a href="https://www.facebook.com/globeventnub" target="_blank" rel="noreferrer">
                <img src={facebook} alt="facebook" style={{ width: '25px', height: '25px' }} />
              </a>
              <a href="https://twitter.com/globeventnub?s=20" target="_blank" rel="noreferrer">
                <img src={twitter} alt="twitter" style={{ width: '25px', height: '25px' }} />
              </a>
              <a href="https://www.instagram.com/eventnub/" target="_blank" rel="noreferrer">
                <img src={instagram} alt="instagram" style={{ width: '25px', height: '25px' }} />
              </a>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{ my: { xs: '4rem', md: '0' } }}>
          <Typography component="h4" sx={{ color: '#fff', fontWeight: '700' }}>
            Quik Links
          </Typography>
          <Stack spacing={3} sx={{ marginTop: '15px' }}>
            <StyledNavlink to="/contact-us">
              <Paragraph>Contact us</Paragraph>
            </StyledNavlink>
            <StyledNavlink to="/about">
              <Paragraph>About</Paragraph>
            </StyledNavlink>
            <StyledNavlink to="/dashboard/tickets">
              <Paragraph>My Tickets</Paragraph>
            </StyledNavlink>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography component="h4" sx={{ color: '#fff', fontWeight: '700' }}>
            Newsletter
          </Typography>
          <Paragraph sx={{ my: '15px' }}>Don't miss any update of our moment.</Paragraph>
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
                <IconButton style={{ borderLeft: '1.5px solid #fff', borderRadius: 0 }} edge="end">
                  <img src={sendIcon} alt="send" style={{ width: '1rem' }} />
                </IconButton>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: '2rem' }} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="body2" sx={{ color: '#fff', fontWeight: '300' }}>
          Copyright {new Date().getFullYear()} Globeventnub.com
        </Typography>
      </Box>
    </Box>
  );
}
