import React from 'react';
import { Box, Typography } from '@mui/material';
import bg from '../../assets/teamImg.png';

function TeamCard() {
  return (
    <Box
      sx={{
        height: '45%',
        width: '25%',
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        position: 'relative',
        borderRadius: '10px',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'rgba(255, 108, 44, 0.74)',
          width: '100%',
          height: '25%',
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          bottom: 0,
          right: 0,
          left: 0,
          padding: '.5rem',
          borderBottomRightRadius: '10px',
          borderBottomLeftRadius: '10px',
        }}
      >
        <Typography sx={{ color: '#fff', fontWeight: '600', fontSize: '1rem' }}>Peter Akwa</Typography>
        <Typography sx={{ color: '#fff', fontWeight: '400', fontSize: '.7rem' }}>UI/UX designer</Typography>
      </Box>
    </Box>
  );
}

export default TeamCard;
