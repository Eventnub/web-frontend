import React from 'react';
import { Box, Typography, styled } from '@mui/material';

function Mission() {
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
  return (
    <Box
      sx={{
        my: '7rem',
        px: '3rem',
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        // mt="4rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: '600px', maxWidth: '100%' }}
      >
        <Title mb="2rem">Our Vision</Title>
        <Text>
          At Eventnub, our vision is to revolutionize the event industry by connecting fans with their favorite
          celebrities and empowering emerging celebrities to grow their fanbase. We strive to make events accessible and
          inclusive to all through our gamified activities. Join us on our journey to create unforgettable experiences
          and a supportive community that celebrates diversity and creativity.
        </Text>
      </Box>
    </Box>
  );
}

export default Mission;
