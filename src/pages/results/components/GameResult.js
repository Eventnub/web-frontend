import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
import Image from '../../../components/Image';

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

export default function GameResult({ result }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: 'common.white',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        borderRadius: { xs: '0', md: '1rem' },
      }}
    >
      <Box sx={{ height: '30%', bgcolor: 'white' }}>
        <Image
          sx={{
            borderTopLeftRadius: { xs: '0', md: '1rem' },
            borderTopRightRadius: { xs: '0', md: '1rem' },
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          src={
            'https://firebasestorage.googleapis.com/v0/b/eventnub-d1319.appspot.com/o/eventsPhotos%2FCfr0YeuU5euSlkWD8P25.jpg?alt=media&token=07178d9e-74d9-4d33-b386-02d2726bd19a'
          }
          alt={'Event name'}
        />
      </Box>
      <Box sx={{ p: '2rem' }}>
        <Stack direction="column" spacing={1} sx={{ mt: '2rem', mb: '4rem' }}>
          <Typography variant="subtitle1" sx={{ textAlign: 'center', color: '#ffffff' }}>
            {`${result?.firstName} ${result?.lastName}`}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center', color: '#ffffff' }}>
            {result?.totalTickets}
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
    </Box>
  );
}

GameResult.propTypes = {
  result: PropTypes.object.isRequired,
};
