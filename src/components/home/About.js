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
            Eventnub is your go-to platform for sponsoring your next event ticket. We provide a unique opportunity for
            you to showcase your love for your favorite celebrity by playing a fun and engaging fan game. Prove that you
            are a true fan and win free or partially sponsored tickets to their next live event!
          </Typography>
          <Typography paragraph align="center" sx={{ color: '#000', fontWeight: '200' }}>
            As a celebrity, you can also benefit from Eventnub's innovative approach. Join our community of talented
            celebrities and create events that allow your fans to enjoy your talent without worrying about the ticket
            costs. Simply contact us to get started and start making your fans' dreams come true!
          </Typography>
          <Typography paragraph align="center" sx={{ color: '#000', fontWeight: '200' }}>
            Don't miss out on this amazing opportunity to connect with your favorite artists and fellow music
            enthusiasts. Join Eventnub today and experience the thrill of the fan game!
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
