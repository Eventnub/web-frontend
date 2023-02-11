import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import SliderCom from './SliderCom';

export default function Testimonials() {
  return (
    <Container maxWidth="xl" sx={{ height: '60vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Typography variant="h5" sx={{ color: '#000', fontsize: '50px' }}>
          What are our customers are saying
        </Typography>
        <SliderCom />
      </Box>
    </Container>
  );
}
