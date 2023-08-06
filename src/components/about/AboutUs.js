import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, styled, Stack } from '@mui/material';
import Navbar from './Navbar';
import { requests } from '../../api/requests';
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

function AboutUs() {
  const [statistics, setStatistics] = useState(null);

  const fetchStatistics = async () => {
    try {
      const { data } = await requests.getBasicStatistics();
      setStatistics(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

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
            <Text>Globe Eventnub, is the ultimate Afrobeat event platform made for passionate fans and artists.</Text>
            <Text>
              We help create better connections between passionate Afrobeat fans and artists. We achieve this by
              offering a unique approach to ticketing through various gamified activities that are fun and engaging.
            </Text>
            <Text>
              By playing the ‘How well you know your artiste’ game, passionate fans have the chance to win free or
              highly discounted passes to attend events of their favorite Afrobeat celebrities.
            </Text>
            <Text>
              As an Organisation, we strive to create a community that supports true fans and celebrities alike. We aim
              to better connect passionate fans with the celebrities and help emerging artists grow their fanbase.
            </Text>
            <Text>
              At Eventnub, we believe that events are a great way to bring people together. That's why we chose to
              provide an innovative and accessible way for true fans to experience their favourite celebrities' events.
            </Text>
            <Text>Join our community today and discover a world of unforgettable events and experiences!</Text>
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
                <Num>{statistics?.usersCount || 0}</Num>
                <Title>HAPPY FANS</Title>
              </Box>
              <Box display="flex" flexDirection="column">
                <Num>{statistics?.eventsCount || 0}</Num>
                <Title>EVENTS</Title>
              </Box>
              <Box display="flex" flexDirection="column">
                <Num>{statistics?.artistsCount || 0}</Num>
                <Title>ARTISTS</Title>
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

export default AboutUs;
