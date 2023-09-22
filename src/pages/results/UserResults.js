import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Stack,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  InputAdornment,
  Link,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Page from '../../components/Page';
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import GameResult from './components/GameResult';
import GameResultModal from './components/GameResultModal';
import Scrollbar from '../../components/Scrollbar';
import BlueLogo from '../../assets/blueLogo.png';

const StyledBox = styled(Box)({
  flex: 1,
  background: '#EDF5F6',
  borderRadius: '10px',
  padding: '.8rem 1rem',
  height: '100%',
});

const Value = styled(Typography)({
  color: '#000',
  fontWeight: '700',
  fontSize: '1.7rem',
});

const Key = styled(Typography)({
  color: '#878787',
  fontWeight: '400',
  fontSize: '.9rem',
});

const results = [
  { eventName: 'Rhema Live Canada', photoUrl: '', eventDate: '05-08-2023', score: '5/5' },
  { eventName: 'Rhema Live Canada', photoUrl: '', eventDate: '05-08-2023', score: '5/5' },
  { eventName: 'Rhema Live Canada', photoUrl: '', eventDate: '05-08-2023', score: '5/5' },
  { eventName: 'Rhema Live Canada', photoUrl: '', eventDate: '05-08-2023', score: '5/5' },
  { eventName: 'Rhema Live Canada', photoUrl: '', eventDate: '05-08-2023', score: '5/5' },
  { eventName: 'Rhema Live Canada', photoUrl: '', eventDate: '05-08-2023', score: '5/5' },
  { eventName: 'Rhema Live Canada', photoUrl: '', eventDate: '05-08-2023', score: '5/5' },
  { eventName: 'Rhema Live Canada', photoUrl: '', eventDate: '05-08-2023', score: '5/5' },
  { eventName: 'Rhema Live Canada', photoUrl: '', eventDate: '05-08-2023', score: '5/5' },
  { eventName: 'Rhema Live Canada', photoUrl: '', eventDate: '05-08-2023', score: '5/5' },
  { eventName: 'Rhema Live Canada', photoUrl: '', eventDate: '05-08-2023', score: '5/5' },
  { eventName: 'Rhema Live Canada', photoUrl: '', eventDate: '05-08-2023', score: '5/5' },
  { eventName: 'Rhema Live Canada', photoUrl: '', eventDate: '05-08-2023', score: '5/5' },
  { eventName: 'Rhema Live Canada', photoUrl: '', eventDate: '05-08-2023', score: '5/5' },
  { eventName: 'Rhema Live Canada', photoUrl: '', eventDate: '05-08-2023', score: '5/5' },
];

export default function UserResults() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [gamerModalShown, setGamerModalShown] = useState(false);

  const openGamerModal = () => {
    setGamerModalShown(true);
  };

  const closeGamerModal = () => {
    setGamerModalShown(false);
  };

  const handleViewGamerDetails = (gamerId) => {
    if (!isMdUp) {
      console.log(gamerId);
      openGamerModal();
    }
  };

  return (
    <Page title="My Results">
      <Container sx={{ pb: '2rem' }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', mt: '2rem' }}>
          <Link
            to="/"
            component={RouterLink}
            underline="none"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Image src={BlueLogo} alt="logo" style={{ width: '5rem', height: '5rem' }} />
            {isMdUp && (
              <Typography variant="h5" sx={{ color: '#1358A5', fontWeight: '700', letterSpacing: '0.1rem' }}>
                eventnub
              </Typography>
            )}
          </Link>
          <Stack direction="row" sx={{ alignItems: 'center', gap: '5px' }}>
            <Typography variant="h5">My Results</Typography>
          </Stack>
        </Stack>
        <Grid container spacing={2} sx={{ mt: { xs: 2.5, md: 4 } }}>
          <Grid item xs={6} md={3}>
            <StyledBox>
              <Value>0</Value>
              <Key>Quiz and Music Match</Key>
            </StyledBox>
          </Grid>
          <Grid item xs={6} md={3}>
            <StyledBox>
              <Value>0</Value>
              <Key>Raffle Draw</Key>
            </StyledBox>
          </Grid>
          <Grid item xs={6} md={3}>
            <StyledBox>
              <Value>0</Value>
              <Key>Tickets Won</Key>
            </StyledBox>
          </Grid>
          <Grid item xs={6} md={3}>
            <StyledBox>
              <Value>0</Value>
              <Key>Events Attended</Key>
            </StyledBox>
          </Grid>
        </Grid>
        <Stack direction="row" spacing={1} sx={{ mt: '2rem' }}>
          <Box sx={{ width: { xs: '100%', md: '55%' } }}>
            <Box sx={{ px: { xs: 1.5, md: 3 }, mb: '0.8rem' }}>
              <TextField
                fullWidth
                size="small"
                value={''}
                onFocus={() => {}}
                onChange={() => {}}
                placeholder="Search by event name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Scrollbar sx={{ flexGrow: 1, height: '100vh', maxHeight: '100vh', px: { xs: 1.5, md: 3 } }}>
              <List sx={{ width: '100%', bgcolor: 'common.white' }}>
                {results.map((gamer, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      border: '1px solid #ebeae8',
                      bgcolor: 'background.paper',
                      borderRadius: '0.5rem',
                      mb: '0.6rem',
                      cursor: 'pointer',
                    }}
                    secondaryAction={
                      <Typography variant="body2" sx={{ fontWeight: '300', color: 'error.light' }}>
                        {`Score: ${gamer.score}`}
                      </Typography>
                    }
                    onClick={() => handleViewGamerDetails(index)}
                  >
                    <ListItemText
                      primary={`${gamer.eventName}`}
                      secondary={
                        <Typography
                          variant="body2"
                          sx={{ fontSize: '0.8rem', fontWeight: '300', color: 'primary.main' }}
                        >
                          {`${gamer.eventDate}`}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Scrollbar>
          </Box>
          {isMdUp && (
            <Box sx={{ width: { xs: '100%', md: '45%' }, minHeight: '100vh' }}>
              <GameResult gamer={results.at(0)} />
            </Box>
          )}
        </Stack>
        <GameResultModal open={gamerModalShown} handleClose={closeGamerModal} result={results.at(0)} />
      </Container>
    </Page>
  );
}
