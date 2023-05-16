import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Typography, styled, Button } from '@mui/material';
import Page from '../components/Page';
import logo from '../assets/blueLogo.png';
import { requests } from '../api/requests';

const Num = styled(Typography)({
  fontSize: '2rem',
  color: '#6B6B6B',
  fontWeight: '600',
});
const Title = styled(Typography)({
  fontSize: '.8rem',
  color: '#6B6B6B',
  fontWeight: '400',
  textAlign: 'center',
});
export default function Quiz() {
  const [event, setEvent] = useState({});
  const { eventId } = useParams();
  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data } = await requests.getEvent(eventId);
        setEvent(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEvents();
  }, [eventId]);

  return (
    <Page title="Quiz">
      <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
        <Box sx={{ mt: '8%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '3%' }}>
            <img src={logo} alt="logo" />
            <Typography sx={{ fontWeight: '600', letterSpacing: '.3rem', fontSize: '1.3rem', color: '#1358A5' }}>
              eventnub
            </Typography>
          </Box>
          <Typography textAlign="center" sx={{ color: '#000', fontWeight: '600', fontSize: '1.5rem' }}>
            Congratulations! you have joined successfully
          </Typography>
          <Typography textAlign="center" sx={{ color: '#6B6B6B', fontWeight: '400', fontSize: '1.25rem' }}>
            You are just a step away to get your FREE ticket to {event.name}.
          </Typography>
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', mt: '6%' }}
          >
            <Typography
              textAlign="center"
              sx={{ color: '#6B6B6B', fontWeight: '400', fontSize: { xs: '1rem', md: '1.25rem' } }}
            >
              The quiz will start in
            </Typography>
            <Box
              sx={{
                width: '70%',
                height: '80px',
                backgroundColor: '#F7F7F7',
                mt: '1%',
                justifyContent: 'space-around',
                alignItems: 'center',
                display: 'flex',
                mb: '5%',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Num>05</Num>
                <Title>DAYS</Title>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Num>15</Num>
                <Title>HOUR</Title>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Num>35</Num>
                <Title>MINS</Title>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Num>20</Num>
                <Title>SECS</Title>
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{
                width: '70%',
                height: '39px',
                boxShadow: 'none',
                mb: '2%',
                borderRadius: '5px',
                backgroundColor: '#CECECE',
              }}
              component={Link}
              to={`/question/${eventId}`}
            >
              Start Quiz
            </Button>
            <Button
              variant="contained"
              sx={{
                width: '70%',
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
