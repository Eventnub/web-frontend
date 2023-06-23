import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Button, Box, Container } from '@mui/material';
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
    <Container maxWidth="3xl" sx={{ mt: '3%' }} id="ticketSection">
      <Typography
        sx={{
          fontSize: '1.5rem',
          color: '#000',
          fontWeight: '600',
          mb: '2rem',
        }}
      >
        Get Your Ticket
      </Typography>
      <TicketCarousel />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          my: '5rem',
        }}
      >
        <Button
          variant="contained"
          component={RouterLink}
          to={`/`}
          disableElevation
          sx={{
            px: '3rem',
            bgcolor: 'grey.600',
            border: '1px solid #fff',
            '&:hover': {
              color: 'grey.600',
              bgcolor: '#fff',
              border: '1px solid #637381',
            },
          }}
        >
          Back to events
        </Button>
      </Box>
    </Container>
  );
}
