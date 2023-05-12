import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, styled } from '@mui/material';
import Navbar from './Navbar';
import concert from '../../assets/concerts.png';

function Hero() {
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
    // textAlign: { xs: 'center', lg: 'left' },
  });

  return (
    <Box>
      <Box sx={{ height: { xs: 'fit-content', sm: 'fit-content', md: 'fit-content' }, backgroundColor: '#fff' }}>
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
            }}
          >
            <Typography
              sx={{
                fontWeight: '200',
                color: '#000',
                fontSize: { xs: '1.5rem', sm: '1.5rem', md: '2.5rem' },
                lineHeight: { xs: '43.5px', sm: '43.5px', md: '58px' },
                mb: '1.5rem',
                textAlign: 'center',
              }}
            >
              We are Eventnub
            </Typography>
            <Text>Welcome to Eventnub, the ultimate event platform that brings fans and celebrities</Text>
            <Text>together. Our mission is to provide event enthusiasts and fans of all kinds with the</Text>
            <Text>opportunity to experience their favorite celebrities' live events, without the burden of</Text>
            <Text>high ticket costs</Text>
            <Text sx={{ mt: '1rem' }}>
              We achieve this by offering a unique approach to ticketing through various gamified
            </Text>
            <Text>activities that are fun and engaging. By playing our "how well you know your fan" game,</Text>
            <Text>fans have the chance to win free or highly discounted passes to attend events of their</Text>
            <Text>favorite celebrities.</Text>
            <Text mt="1rem">
              As a platform, we strive to create a community that supports both fans and celebrities
            </Text>
            <Text>alike. Our goal is to connect fans with the celebrities they love and help emerging</Text>
            <Text>celebrities grow their fanbase.</Text>
            <Text sx={{ mt: '1rem' }}>
              At Eventnub, we believe that events are a great way to bring people together. That's{' '}
            </Text>
            <Text>why we are dedicated to providing an innovative and accessible way for fans to</Text>
            <Text>experience their favorite celebrities' events. Join our community today and discover a</Text>
            <Text>world of unforgettable events and experiences.</Text>

            <Button
              variant="contained"
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
            <Box display="flex" my={10} sx={{ gap: { xs: 5, sm: 5, md: 25 } }}>
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
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{}}>
        <img src={concert} alt="trailer park concert" style={{ width: '100%' }} />
      </Box>
    </Box>
  );
}

export default Hero;
