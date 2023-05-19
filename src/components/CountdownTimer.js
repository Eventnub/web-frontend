import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, Typography, styled, Button } from '@mui/material';
import { isFutureDate } from '../utils/compareTime';
import useCountdown from '../hooks/useCountdown';

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

CountdownTimer.propTypes = {
  countdownDate: PropTypes.number,
  eventId: PropTypes.string,
};

export default function CountdownTimer({ countdownDate, eventId }) {
  const dateThen = new Date(countdownDate);
  const { days, hours, minutes, seconds } = useCountdown(dateThen);

  if (!isFutureDate(dateThen)) {
    return (
      <Button
        variant="contained"
        sx={{
          width: '50%',
          height: '39px',
          boxShadow: 'none',
          mb: '2%',
          borderRadius: '5px',
        }}
        component={Link}
        to={`/question/${eventId}`}
      >
        Start Quiz
      </Button>
    );
  }

  return (
    <>
      <Typography textAlign="center" sx={{ color: '#6B6B6B', fontWeight: '400', fontSize: '1.25rem' }}>
        The quiz will start in
      </Typography>
      <Box
        sx={{
          width: '50%',
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
          <Num>{days}</Num>
          <Title>DAYS</Title>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Num>{hours}</Num>
          <Title>HOUR</Title>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Num>{minutes}</Num>
          <Title>MINS</Title>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Num>{seconds}</Num>
          <Title>SECS</Title>
        </Box>
      </Box>
    </>
  );
}
