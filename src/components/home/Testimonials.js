import React from 'react';
import { Container, Typography } from '@mui/material';
import SliderCom from './SliderCom';

export default function Testimonials() {
  return (
    <Container maxWidth="3xl" sx={{ height: 'auto', mb: '3rem' }}>
      <Typography variant="h5" sx={{ color: '#000', fontsize: '50px', textAlign: 'center' }}>
        What are our users saying
      </Typography>
      <SliderCom />
    </Container>
  );
}
