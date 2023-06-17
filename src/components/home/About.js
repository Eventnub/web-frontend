import React from 'react';
import { Container, Box, Typography } from '@mui/material';

export default function About() {
  return (
    <Container sx={{ marginTop: '4rem', marginBottom: '4rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography sx={{ marginBottom: '40px', color: '#000', fontSize: '25px', fontWeight: 'bold' }}>
          How it Works
        </Typography>
        <Box sx={{ width: '100%', padding: '0 5%' }}>
          <Typography paragraph align="center" sx={{ color: '#000', fontWeight: '200' }}>
            Find any afrobeat event in your area with your favourite performing artiste
          </Typography>
          <Typography paragraph align="center" sx={{ color: '#000', fontWeight: '200' }}>
            Prove how much you know your favourite artiste by playing a game
          </Typography>
          <Typography paragraph align="center" sx={{ color: '#000', fontWeight: '200' }}>
            Win the game and get free or discounted ticket to the event.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
