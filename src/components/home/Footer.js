import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Stack, Typography, styled, useTheme, Divider } from '@mui/material';
import logoImg from '../../assets/logoImg.png';
import InputStyle from '../InputStyle';

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
    fontSize: '13px',
    color: '#fff',
    fontWeight: '100',
  });

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: '#1358A5',
        color: '#fff',
        [theme.breakpoints.down('sm')]: { padding: '30px' },
      }}
    >
      <Box sx={{}}>
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
                <Paragraph>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint
                  commodi consequuntur voluptatum.
                </Paragraph>
              </Box>
            </Stack>
          </Box>
          <Box sx={{ width: '250px', flexDirection: 'column', marginTop: '30px' }}>
            <Typography component="h6" sx={{ color: '#fff' }}>
              Quik Links
            </Typography>
            <Stack spacing={1} sx={{ marginTop: '15px' }}>
              <StyledNavlink to="/contact-us">
                <Paragraph>Contact us</Paragraph>
              </StyledNavlink>
              <StyledNavlink to="/about">
                <Paragraph>About</Paragraph>
              </StyledNavlink>
              <StyledNavlink to="/#">
                <Paragraph>My Concerts</Paragraph>
              </StyledNavlink>
              <StyledNavlink to="/dashboard/tickets">
                <Paragraph>My Tickets</Paragraph>
              </StyledNavlink>
              <StyledNavlink to="/#">
                <Paragraph>Create Concerts</Paragraph>
              </StyledNavlink>
            </Stack>
          </Box>
          <Box sx={{ width: '300px', display: 'flex', flexDirection: 'column', marginTop: '30px' }}>
            <Typography component="h6" sx={{ color: '#fff' }}>
              Newsletter
            </Typography>
            <Paragraph sx={{ my: '15px' }}>Don't miss any update of our moment.</Paragraph>
            <InputStyle size="medium" placeholder="Email" />
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
    </Container>
  );
}
