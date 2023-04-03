import React from 'react';
import { Typography, Box } from '@mui/material';
import CreateEventForm from '../../sections/event/CreateEventForm';
import logo from '../../assets/blueLogo.png';
import Footer from '../../components/home/Footer';

export default function CreateEvent() {
  return (
    <Box>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '2rem', flexDirection: 'column' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={logo} alt="logo" style={{ width: '4rem', height: '4rem' }} />
          <Typography sx={{ color: '#1358A5', letterSpacing: '0.2rem', fontWeight: '800' }}>eventnub</Typography>
        </Box>
        <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '1.8rem' }}>Create a New Event</Typography>
        <Typography sx={{ color: '#6B6B6B', fontWeight: '400' }}>
          Clearly fill in the details about the event below
        </Typography>
      </Box>
      <Box sx={{ mx: '20%', mt: '2%', mb: '2rem' }}>
        <CreateEventForm />
      </Box>
      <Footer />
    </Box>
  );
}
