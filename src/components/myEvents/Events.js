import React, { useEffect, useState } from 'react';
import { Box, Typography, styled, useTheme, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { requests } from '../../api/requests';
import useFirebase from '../../hooks/useFirebase';

const StyledBox = styled(Box)({
  flex: 1,
  background: '#EDF5F6',
  borderRadius: '10px',
  padding: '.8rem 1rem',
  height: '100%',
});

const Number = styled(Typography)({
  color: '#000',
  fontWeight: '700',
  fontSize: '1.7rem',
});

const Text = styled(Typography)({
  color: '#878787',
  fontWeight: '400',
  fontSize: '.9rem',
});

export default function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const { user } = useFirebase();

  useEffect(() => {
    async function fetchEvents() {
      if (user.id) {
        try {
          setIsLoading(true);
          const { data } = await requests.getCreatorEvents(user.idToken, user.id);
          setEvents(data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetchEvents();
  }, [user.id, user.idToken]);
  console.log(events);

  return (
    <Box sx={{ height: 'auto', mb: '3rem' }}>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          [theme.breakpoints.down('sm')]: { flexWrap: 'wrap', mb: '4rem' },
        }}
      >
        <StyledBox>
          <Number>{events.length < 10 ? `0${events.length}` : events.length}</Number>
          <Text>Total events</Text>
        </StyledBox>
        <StyledBox>
          <Number>$8,000</Number>
          <Text>For 100 tickets sold</Text>
        </StyledBox>
        <StyledBox>
          <Number>10k</Number>
          <Text>Impressions</Text>
        </StyledBox>
        <StyledBox>
          <Number>1.5k</Number>
          <Text>Total fans</Text>
        </StyledBox>
      </Box>
      <Box sx={{ mt: '3rem' }}>
        <Typography sx={{ color: '#909090', fontWeight: '400', fontSize: '1.2rem' }}>
          Recently Created{' '}
          <span style={{ color: '#000', fontWeight: '700', fontSize: '.8rem' }}>
            {events.length < 10 ? `0${events.length}` : events.length}
          </span>
        </Typography>
        {isLoading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '3rem' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              mt: '2.5rem',
              gap: '5rem',
              height: 'auto',
            }}
          >
            {events.map((item) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '261px',
                  height: '218px',
                  [theme.breakpoints.down('sm')]: { width: '100%', height: '50%' },
                }}
                key={item.uid}
              >
                <Box sx={{ height: '70%' }} component={Link} to={`/my-event-details/${item.uid}`}>
                  <img
                    src={item.photoUrl}
                    alt={item.name}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: '10px',
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: '4%', height: 'auto', mt: '2%' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography sx={{ fontWeight: '600', fontSize: '1.2rem', color: '#000', textAlign: 'center' }}>
                      {item.day}
                    </Typography>
                    <Typography sx={{ fontWeight: '400', fontSize: '.8rem', color: '#000', textAlign: 'center' }}>
                      {item.month}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ color: '#000', fontWeight: '600', fontSize: '.9rem', textTransform: 'capitalize' }}
                    >
                      {item.name}
                    </Typography>
                    <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '.7rem' }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
