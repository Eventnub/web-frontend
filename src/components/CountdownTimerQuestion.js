import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { isFutureDate } from '../utils/compareTime';
import useCountdown from '../hooks/useCountdown';

CountdownTimerQuestion.propTypes = {
  countdownDate: PropTypes.number,
  isTimeElapsed: PropTypes.bool,
  onTimeElapsed: PropTypes.func,
};

export default function CountdownTimerQuestion({ countdownDate, isTimeElapsed, onTimeElapsed }) {
  const dateThen = new Date(countdownDate);
  const { days, hours, minutes, seconds } = useCountdown(dateThen);

  useEffect(() => {
    if (!isFutureDate(dateThen)) {
      onTimeElapsed();
    }
  }, [days, hours, minutes, seconds]);

  if (isTimeElapsed) {
    return <Typography sx={{ color: '#000', fontWeight: '600', fontSize: '1.3rem' }}>Time up</Typography>;
  }

  return (
    <Typography
      sx={{ color: '#000', fontWeight: '600', fontSize: '1.3rem' }}
    >{`${hours} : ${minutes} : ${seconds}`}</Typography>
  );
}
