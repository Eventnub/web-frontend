import React from 'react';
import { Typography, Container } from '@mui/material';
import Events from '../home/Events';

export default function EventSection() {
  return (
    <Container maxWidth="3xl" sx={{ mb: '3rem', mt: '3rem' }}>
      <Typography sx={{ color: '#000', fontWeight: '600', fontSize: '1.8rem' }}>Other Events You May Like</Typography>
      <Events />
    </Container>
  );
}
