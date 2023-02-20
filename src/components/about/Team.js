import React from 'react';
import { Box, Typography } from '@mui/material';
import TeamCard from './TeamCard';

function Team() {
  return (
    <Box mb={'4rem'}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: { xs: '85%', sm: '85%' } }}
        >
          <Typography
            sx={{
              color: '#000',
              fontWeight: '400',
              fontSize: '2.5rem',
              lineHeight: '2.5rem',
              mb: '1rem',
              textAlign: 'center',
            }}
          >
            Our Creative Team
          </Typography>
          <Typography sx={{ color: '#000', fontSize: '1rem', fontWeight: '400', textAlign: 'center' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna.
          </Typography>
          <Typography sx={{ color: '#000', fontSize: '1rem', fontWeight: '400', textAlign: 'center' }}>
            eiusmod tempor incididunt ut labore et dolore magna.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column' },
          width: '100%',
          flexWrap: { xs: 'nowrap', sm: 'wrap', md: 'wrap' },
          height: { xs: 'fit-content', sm: '100vh', md: '100vh' },
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'center',
          mt: '2rem',
        }}
      >
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
      </Box>
    </Box>
  );
}

export default Team;
