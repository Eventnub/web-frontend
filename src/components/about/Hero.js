import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, styled, Stack } from '@mui/material';
import Navbar from './Navbar';
import concert from '../../assets/concerts.png';

const Num = styled(Typography)({
  fontWeight: '300',
  fontSize: '2.5rem',
  lineHeight: '70.33px',
  color: '#000',
  textAlign: 'center',
});

const Title = styled(Typography)({
  fontsize: '20px',
  fontWeight: '500',
  lineHeight: '29.3px',
  color: '#000',
  textAlign: 'center',
});

const Text = styled(Typography)({
  color: '#000',
  fontWeight: '400',
  fontSize: '1rem',
  textAlign: 'center',
  marginTop: '1.2rem',
});

function Hero() {
  return (
    <Box>
      <Box sx={{ height: 'fit-content', backgroundColor: '#fff' }}>
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: '2%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              px: '2rem',
              width: '700px',
              maxWidth: '100%',
            }}
          >
            <Typography
              sx={{
                fontWeight: '500',
                color: '#000',
                fontSize: { xs: '1.5rem', md: '2.5rem' },
                lineHeight: { xs: '43.5px', sm: '43.5px', md: '58px' },
                mb: '1.5rem',
                textAlign: 'center',
              }}
            >
              We are Eventnub
            </Typography>
            <Text>
              Welcome to Eventnub, the ultimate Afrobeat event platform made for artists and true fans. Our mission is
              to make Afrobeat events accessible to genuine fans who have longed to see their favorite artists perform
              but can’t afford the high cost of tickets.
            </Text>
            <Text>
              We achieve this by offering a unique approach to ticketing through various gamified activities that are
              fun and engaging. By playing the ‘How well you know your artiste’ game, fans have the chance to win free
              or highly discounted passes to attend events of their favorite Afrobeat celebrities.
            </Text>
            <Text>
              As a platform, we strive to create a community that supports true fans and celebrities alike. We aim to
              connect fans with the celebrities they love and help emerging artists grow their fanbase.
            </Text>
            <Text>
              At Eventnub, we believe that events are a great way to bring people together. That's why we are dedicated
              to providing an innovative and accessible way for true fans to experience their favorite celebrities'
              events. Join our community today and discover a world of unforgettable events and experiences.
            </Text>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to={'/contact-us'}
              sx={{
                boxShadow: 'none',
                mt: '2.5rem',
                backgroundColor: '#1358A5',
                width: '60%',
                height: '100%',
                borderRadius: '5px',
              }}
            >
              Contact us
            </Button>
            <Stack direction="row" my={{ xs: 5, md: 10 }} spacing={{ xs: 5, md: 25 }}>
              <Box display="flex" flexDirection="column">
                <Num>3.5M</Num>
                <Title>HAPPY FANS</Title>
              </Box>
              <Box display="flex" flexDirection="column">
                <Num>100</Num>
                <Title>ARTISTS</Title>
              </Box>
              <Box display="flex" flexDirection="column">
                <Num>15</Num>
                <Title>STAFF</Title>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Box>
        <img src={concert} alt="trailer park concert" style={{ width: '100%' }} />
      </Box>
    </Box>
  );
}

export default Hero;
