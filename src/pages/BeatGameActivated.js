import React from 'react';
import { Box, Typography, styled, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Page from '../components/Page';
import logo from '../assets/blueLogo.png';
import microphone from '../assets/microphone.png';

const Container = styled(Box)({
  width: '100%',
  height: '100vh',
  background: '#F4F4F4',
  display: 'flex',
  justifyContent: 'center',
});

const Title = styled(Typography)({
  color: '#000',
  textAlign: 'center',
  fontWeight: '100',
  fontSize: '1.7rem',
});
export default function PlayTheBeat() {
  const { eventId } = useParams();
  return (
    <Page title="Beat Game Activated">
      <Container>
        <Box sx={{ mt: '4%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '1%' }}>
            <img src={logo} alt="logo" />
            <Typography sx={{ fontWeight: '600', letterSpacing: '.3rem', fontSize: '1.3rem', color: '#1358A5' }}>
              eventnub
            </Typography>
          </Box>
          <Title>You have activated the</Title>
          <Title>Name the best game successfully</Title>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box>
              <img
                src={microphone}
                alt="old microphone"
                style={{ width: '70px', height: '125px', textAlign: 'center' }}
              />
              <Typography sx={{ color: '#000', fontSize: '1.2rem', fontWeight: '500' }}>How it works</Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              textAlign: 'center',
              maxWidth: '428px',
              color: '#6B6B6B',
              fontWeight: '400',
              fontSize: '1rem',
            }}
          >
            You will be given a song beat by an unknown artist, and you are to guess the song title and the artist
            correctly within <span style={{ fontWeight: '800' }}>30 seconds</span> to win a free ticket to attend the
            night of thousands laugh event.
          </Typography>
          <Box textAlign="center" mt="4%">
            <Button
              variant="contained"
              sx={{ boxShadow: 'none', background: '#1358A5', borderRadius: '5px', width: '70%' }}
              component={Link}
              to={`/name-the-beat/${eventId}`}
            >
              Alright let’s play the game
            </Button>
          </Box>
        </Box>
      </Container>
    </Page>
  );
}
