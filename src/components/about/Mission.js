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
    fontSize: '14px',
    fontWeight: '400',
    color: '#000',
  });
  return (
    <Box
      sx={{
        my: '7rem',
        px: '3rem',
        display: 'flex',
        gap: '1rem',
        flexDirection: { xs: 'column', sm: 'column', md: 'row' },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ width: { xs: '100%', sm: '100%', md: '50%' } }}
      >
        <Title mb="2rem">Our Mission</Title>
        <Text>An event platform that helps offer fans an</Text>
        <Text>opportunity to get free</Text>
        <Text>and highly discounted passes/tickets to attend</Text>
        <Text>concerts, events, or shows of celebrities</Text>
        <Text>through various gamified activities</Text>
      </Box>
      <Box
        sx={{ width: { xs: '100%', sm: '100%', md: '50%' } }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Title mb="2rem">Our Vision</Title>
        <Text>An event platform that helps offer fans an</Text>
        <Text>opportunity to get free</Text>
        <Text>and highly discounted passes/tickets to attend</Text>
        <Text>concerts, events, or shows of celebrities</Text>
        <Text>through various gamified activities</Text>
      </Box>
    </Box>
  );
}

export default Mission;
