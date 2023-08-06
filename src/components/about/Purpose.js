import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const Title = styled(Typography)({
  fontSize: '38px',
  lineHeight: '38px',
  fontWeight: '200',
  color: '#000',
  textAlign: 'center',
});

const Text = styled(Typography)({
  fontSize: '1rem',
  fontWeight: '400',
  color: '#000',
  textAlign: 'center',
});

function Purpose() {
  return (
    <Box
      sx={{
        my: '5rem',
        px: '3rem',
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '600px', maxWidth: '100%' }}
      >
        <Title sx={{ mb: '2rem' }}>Vision</Title>
        <Text>
          To create an inclusive and accessible platform that empowers genuine connections between passionate Afrobeat
          fans and celebs,
        </Text>
        <Title sx={{ mt: '5rem', mb: '2rem' }}>Mission</Title>
        <Text>Eventnub: Empowering Afrobeat fans with equitable access to their favorite artists' performances.</Text>
      </Box>
    </Box>
  );
}

export default Purpose;
