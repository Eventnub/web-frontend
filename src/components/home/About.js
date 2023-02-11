import React from 'react';
import { Container, Box, Typography, useTheme } from '@mui/material';

export default function About() {
  const theme = useTheme();

  return (
    <Container maxWidth="sm" sx={{ marginTop: '90px', marginBottom: '90px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography sx={{ marginBottom: '40px', color: '#000', fontSize: '25px', fontWeight: 'bold' }}>
          How it Works
        </Typography>
        <Box sx={{ width: '100%', padding: '0 5%' }}>
          <Typography paragraph align="center" sx={{ color: '#000', fontWeight: '200' }}>
            Eventnub helps her users sponsor a part or full ticket fee by letting you play a how well you know your fan
            game to proof you are a real fan of the artist. If you win the game we will sponsor your ticket to join in
            the next live concert of the artist.
          </Typography>
          <Typography paragraph align="center" sx={{ color: '#000', fontWeight: '200' }}>
            As an artist you can join our existing artists and create events to enable your fans get free tickets to
            your events, you can {''}
            <span style={{ color: 'blue' }}>contact us</span> to get started as an artist.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
