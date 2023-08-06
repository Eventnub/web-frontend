import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import logo from '../assets/blueLogo.png';

export default function QuizCompleted() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ mt: '10%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '3%' }}>
          <img src={logo} alt="logo" />
          <Typography sx={{ fontWeight: '600', letterSpacing: '.3rem', fontSize: '1.3rem', color: '#1358A5' }}>
            eventnub
          </Typography>
        </Box>
        <Typography textAlign="center" sx={{ color: '#000', fontWeight: '600', fontSize: '2rem' }}>
          Completed successfully
        </Typography>
        <Typography sx={{ textAlign: 'center', color: '#6B6B6B', fontWeight: '400', fontSize: '1.4rem' }}>
          Your result will be sent to your mail within 48 hours
        </Typography>
        <Box sx={{ textAlign: 'center', mt: '7%' }}>
          <Button
            variant="contained"
            sx={{
              boxShadow: 'none',
              background: '#1358A5',
              borderRadius: '5px',
              width: '50%',
              textAlign: 'center',
            }}
            component={Link}
            to={'/'}
          >
            Return To Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
