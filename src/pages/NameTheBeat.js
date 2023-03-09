import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import Page from '../components/Page';
import logo from '../assets/blueLogo.png';
import microphone from '../assets/microphone.png';

const Container = styled(Box)({
  width: '100%',
  height: '100vh',
  background: '#F4F4F4',
  display: 'flex',
  justifyContent: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${microphone})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '392px 622px',
    backgroundPosition: '80% center',
    opacity: 0.5,
  },
});
export default function NameTheBeat() {
  return (
    <Page title="Name The Beat">
      <Container>
        <Box sx={{ mt: '2%', display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: '2.5%',
            }}
          >
            <img src={logo} alt="logo" />
            <Typography sx={{ fontWeight: '600', letterSpacing: '.3rem', fontSize: '1.3rem', color: '#1358A5' }}>
              eventnub
            </Typography>
          </Box>
          <Typography sx={{ color: '#000', textAlign: 'center', fontSize: '2.5rem' }}>Name the Beat</Typography>

          <Box sx={{ height: '10%', width: '80%', background: '#fff', borderRadius: '30px' }}>hi</Box>
        </Box>
      </Container>
    </Page>
  );
}
