import React from 'react';
import { Box, Typography, styled } from '@mui/material';

function Mission() {
  const Title = styled(Typography)({
    fontSize: '38px',
    lineHeight: '38px',
    fontWeight: '200',
    color: '#000',
    textAlign: 'center',
  });
  const Text = styled(Typography)({
    fontSize: '1rem',
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
  });
  return (
    <Box
      sx={{
        my: '7rem',
        px: '3rem',
        display: 'flex',
        gap: '1rem',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box>
        <Title mb="2rem">Our Mission</Title>
        <Text>At Eventnub, we're on a mission to make live events more accessible and inclusive. Through</Text>
        <Text>our gamified activities, we offer event enthusiasts the chance to attend their favorite</Text>
        <Text>celebrities' events for free or at heavily discounted prices.</Text>
        <Text sx={{ mt: '1rem' }}>
          We're committed to building a community that supports both fans and celebrities, and we
        </Text>
        <Text>believe that events are a powerful way to bring people together and create unforgettable</Text>
        <Text>experiences. Our goal is to connect fans with the celebrities they love and help emerging</Text>
        <Text>celebrities grow their fanbase.</Text>
        <Text sx={{ mt: '1rem' }}>
          We're dedicated to providing our customers with high-quality service and the most engaging
        </Text>
        <Text>and entertaining events possible. Join us today and be a part of the event revolution!</Text>
      </Box>
      <Box mt="4rem" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Title mb="2rem">Our Vision</Title>
        <Text>At Eventnub, our vision is to revolutionize the event industry by connecting fans with their</Text>
        <Text>favorite celebrities and empowering emerging celebrities to grow their fanbase. We strive to</Text>
        <Text> make events accessible and inclusive to all through our gamified activities. Join us on our</Text>
        <Text>journey to create unforgettable experiences and a supportive community that celebrates </Text>
        <Text>diversity and creativity.</Text>
      </Box>
    </Box>
  );
}

export default Mission;
