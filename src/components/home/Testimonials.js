import React from 'react';
import { Container, Typography } from '@mui/material';
import TestimonialsSlider from './TestimonialsSlider';

export default function Testimonials() {
  return (
    <Container maxWidth="3xl" sx={{ height: 'auto', mb: '3rem' }}>
      <Typography variant="h4" sx={{ color: '#000', textAlign: 'center', mb: '2rem' }}>
        What are our users saying
      </Typography>
      <TestimonialsSlider />
    </Container>
  );
}
