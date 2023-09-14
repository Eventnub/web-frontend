import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Box, Stack, Typography, Avatar } from '@mui/material';

const GamerStatsValue = styled(Typography)({
  color: '#ffffff',
  fontWeight: '700',
  fontSize: '1.7rem',
  textAlign: 'center',
});

const GamerStatsKey = styled(Typography)({
  color: '#ffffff',
  fontWeight: '400',
  fontSize: '.9rem',
  textAlign: 'center',
});

export default function GamerStatistics({ gamer }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        p: '2rem',
        bgcolor: 'primary.main',
        borderRadius: { xs: '0', md: '1rem' },
      }}
    >
      <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Avatar
          alt={gamer?.firstName}
          src={gamer?.photoURL}
          sx={{
            height: '6rem',
            width: '6rem',
          }}
        />
      </Stack>
      <Stack direction="column" spacing={1} sx={{ mt: '2rem', mb: '4rem' }}>
        <Typography variant="subtitle1" sx={{ textAlign: 'center', color: '#ffffff' }}>
          {`${gamer.firstName} ${gamer.lastName}`}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#ffffff' }}>
          {gamer.totalTickets}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          px: { xs: '2rem', md: '3.5rem' },
        }}
      >
        <Box>
          <GamerStatsValue>0</GamerStatsValue>
          <GamerStatsKey>Events</GamerStatsKey>
        </Box>
        <Box>
          <GamerStatsValue>0</GamerStatsValue>
          <GamerStatsKey>Games</GamerStatsKey>
        </Box>
        <Box>
          <GamerStatsValue>0</GamerStatsValue>
          <GamerStatsKey>Tickets</GamerStatsKey>
        </Box>
      </Stack>
    </Box>
  );
}

GamerStatistics.propTypes = {
  gamer: PropTypes.object.isRequired,
};
