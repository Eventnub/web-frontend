import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { isFutureDate } from '../utils/compareTime';
import useCountdown from '../hooks/useCountdown';

CountdownTimerGame.propTypes = {
  countdownDate: PropTypes.number,
  isTimeElapsed: PropTypes.bool,
  onTimeElapsed: PropTypes.func,
};

export default function CountdownTimerGame({ countdownDate, isTimeElapsed, onTimeElapsed }) {
  const dateThen = new Date(countdownDate);
  const { days, hours, minutes, seconds } = useCountdown(dateThen);

  useEffect(() => {
    if (!isFutureDate(dateThen)) {
      onTimeElapsed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, hours, minutes, seconds]);

  if (isTimeElapsed) {
    return (
      <Typography
        sx={{
          color: '#000',
          fontWeight: '600',
          fontSize: '1.3rem',
          textAlign: 'center',
        }}
      >
        Time up
      </Typography>
    );
  }

  return (
    <Typography
      sx={{
        color: '#000',
        fontWeight: '600',
        fontSize: '1.3rem',
        textAlign: 'center',
        px: "0.8rem"
      }}
    >
      {`${hours} : ${minutes} : ${seconds}`}
    </Typography>
  );
}
