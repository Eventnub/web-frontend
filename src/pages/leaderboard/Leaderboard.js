import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Stack,
  Grid,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  InputAdornment,
  Link,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Page from '../../components/Page';
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import GamerStatistics from './components/GamerStatistics';
import GamerDetailsModal from './components/GamerDetailsModal';
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

const gamers = [
  { firstName: 'John', lastName: 'Doe', photoUrl: '', totalGames: 10, totalTickets: 250 },
  { firstName: 'John', lastName: 'Doe', photoUrl: '', totalGames: 10, totalTickets: 250 },
  { firstName: 'John', lastName: 'Doe', photoUrl: '', totalGames: 10, totalTickets: 250 },
  { firstName: 'John', lastName: 'Doe', photoUrl: '', totalGames: 10, totalTickets: 250 },
  { firstName: 'John', lastName: 'Doe', photoUrl: '', totalGames: 10, totalTickets: 250 },
  { firstName: 'John', lastName: 'Doe', photoUrl: '', totalGames: 10, totalTickets: 250 },
  { firstName: 'John', lastName: 'Doe', photoUrl: '', totalGames: 10, totalTickets: 250 },
  { firstName: 'John', lastName: 'Doe', photoUrl: '', totalGames: 10, totalTickets: 250 },
  { firstName: 'John', lastName: 'Doe', photoUrl: '', totalGames: 10, totalTickets: 250 },
  { firstName: 'John', lastName: 'Doe', photoUrl: '', totalGames: 10, totalTickets: 250 },
  { firstName: 'John', lastName: 'Doe', photoUrl: '', totalGames: 10, totalTickets: 250 },
  { firstName: 'John', lastName: 'Doe', photoUrl: '', totalGames: 10, totalTickets: 250 },
  { firstName: 'John', lastName: 'Doe', photoUrl: '', totalGames: 10, totalTickets: 250 },
  { firstName: 'John', lastName: 'Doe', photoUrl: '', totalGames: 10, totalTickets: 250 },
  { firstName: 'John', lastName: 'Doe', photoUrl: '', totalGames: 10, totalTickets: 250 },
];

export default function Leaderboard() {
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
    <Page title="Leaderboard">
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
            <Typography variant="h4">Leaderboard</Typography>
            <EmojiEventsIcon sx={{ color: '#FFD700', width: '1.2rem', height: '1.2rem' }} />
          </Stack>
        </Stack>
        <Grid container spacing={2} sx={{ mt: { xs: 2.5, md: 4 } }}>
          <Grid item xs={6} md={3}>
            <StyledBox sx={{ bgcolor: '#E2FCDE' }}>
              <Value>0</Value>
              <Key>Participants</Key>
            </StyledBox>
          </Grid>
          <Grid item xs={6} md={3}>
            <StyledBox sx={{ bgcolor: '#E9F4FB' }}>
              <Value>0</Value>
              <Key>Tickets Winners</Key>
            </StyledBox>
          </Grid>
          <Grid item xs={6} md={3}>
            <StyledBox sx={{ bgcolor: '#F5EBFE' }}>
              <Value>0</Value>
              <Key>Events</Key>
            </StyledBox>
          </Grid>
          <Grid item xs={6} md={3}>
            <StyledBox sx={{ bgcolor: '#FFEDD9' }}>
              <Value>0</Value>
              <Key>Losers</Key>
            </StyledBox>
          </Grid>
        </Grid>
        <Stack direction="row" spacing={1} sx={{ mt: '2rem' }}>
          {isMdUp && (
            <Box sx={{ flexGrow: 3, minHeight: '100vh' }}>
              <GamerStatistics gamer={gamers.at(0)} />
            </Box>
          )}
          <Box sx={{ flexGrow: 6 }}>
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
                {gamers.map((gamer, index) => (
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
                      <Typography variant="body2" sx={{ color: 'primary.main' }}>
                        {`${gamer.totalTickets} tickets`}
                      </Typography>
                    }
                    onClick={() => handleViewGamerDetails(index)}
                  >
                    <ListItemAvatar>
                      <Avatar alt={gamer?.firstName} src={gamer?.photoUrl} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${gamer.firstName} ${gamer.lastName}`}
                      secondary={`${gamer.totalGames} games`}
                    />
                  </ListItem>
                ))}
              </List>
            </Scrollbar>
          </Box>
        </Stack>
        <GamerDetailsModal open={gamerModalShown} handleClose={closeGamerModal} gamer={gamers.at(0)} />
      </Container>
    </Page>
  );
}
