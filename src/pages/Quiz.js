import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import Page from '../components/Page';
import logo from '../assets/blueLogo.png';
import { requests } from '../api/requests';
import CountdownTimer from '../components/CountdownTimer';

export default function Quiz() {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const [countdownDate, setCountdownDate] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data } = await requests.getEvent(eventId);
        setEvent(data);
        setCountdownDate(Date.now() + 10000);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEvents();
  }, [eventId]);

  return (
    <Page title="Quiz">
      <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
        <Box sx={{ mt: '8%', display: 'flex', flexDirection: 'column', p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '3%' }}>
            <img src={logo} alt="logo" />
            <Typography sx={{ fontWeight: '600', letterSpacing: '.3rem', fontSize: '1.3rem', color: '#1358A5' }}>
              eventnub
            </Typography>
          </Box>
          <Typography textAlign="center" sx={{ color: '#000', fontWeight: '600', fontSize: '1.5rem' }}>
            Congratulations! you have joined successfully
          </Typography>
          <Typography sx={{ color: '#6B6B6B', fontWeight: '400', fontSize: '1.25rem', textAlign: 'center', my: 1 }}>
            You are just a step away to get your FREE ticket to {event.name}.
          </Typography>
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', mt: '6%' }}
          >
            {countdownDate && <CountdownTimer countdownDate={countdownDate} eventId={event.uid} />}
            <Button
              variant="contained"
              sx={{
                width: '50%',
                height: '39px',
                boxShadow: 'none',
                mb: '2%',
                borderRadius: '5px',
                backgroundColor: '#1358A5',
              }}
              component={Link}
              to={'/'}
            >
              Return Home
            </Button>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
