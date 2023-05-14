import React, { useEffect } from 'react';
import { Typography, Container } from '@mui/material';
import TicketCarousel from './TicketCarousel';

export default function TicketSection() {
  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <Container maxWidth="3xl" sx={{ mt: '3%', height: '65vh' }} id="ticketSection">
      <Typography sx={{ fontSize: '2rem', color: '#000', fontWeight: '600', mb: '2rem' }}>Get Your Ticket</Typography>
      <TicketCarousel />
    </Container>
  );
}
