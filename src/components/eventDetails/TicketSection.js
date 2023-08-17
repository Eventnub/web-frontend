import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Button, Box, Container } from '@mui/material';
import TicketCarousel from './TicketCarousel';
import ConditionalPopup from '../home/ConditionalPopup';

export default function TicketSection() {
  const [isFromAdvert, setIsfromAdvert] = useState(false);

  const handleRedirectFromAdvert = () => {
    let isRedirectFromAdvert;
    const queryString = window.location.search;

    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      isRedirectFromAdvert = urlParams.get('redirect_from_advert');
    }

    if (isRedirectFromAdvert === 'true') {
      setIsfromAdvert(true);
    }
  };

  const handleScrollToSection = () => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    handleRedirectFromAdvert();
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
      <TicketCarousel onTicketsLoaded={handleScrollToSection} />
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

      <ConditionalPopup open={isFromAdvert} handleClose={() => setIsfromAdvert(false)} />
    </Container>
  );
}
