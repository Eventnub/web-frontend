import React from 'react';
import { Typography, Container } from '@mui/material';
import TicketCarousel from './TicketCarousel';

export default function TicketSection() {
  return (
    <Container maxWidth="xl" sx={{ mt: '3%', height: '65vh' }}>
      <Typography sx={{ fontSize: '2rem', color: '#000', fontWeight: '600', mb: '2rem' }}>Get Your Ticket</Typography>
      <TicketCarousel />
    </Container>
  );
}
