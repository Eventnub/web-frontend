import React from 'react';
import { Box, styled, Typography, Button, useTheme } from '@mui/material';
import Navbar from './Navbar';
import bg from '../../assets/bg.jpg';

const StyledDiv = styled(Box)(({ theme }) => ({
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${bg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  height: 'fit-content',
  [theme.breakpoints.up('lg')]: { height: '100vh' },
  width: '100%',
}));

function Hero() {
  const theme = useTheme();
  const handleButtonClick = () => {
    const nextSection = document.getElementById('nextSection');
    nextSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box>
      <StyledDiv>
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            padding: '10% 0 30% 0',
            [theme.breakpoints.down('md')]: { padding: '5% 0 5% 0' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: '1',
              width: '100%',
              [theme.breakpoints.down('md')]: { px: '.8rem' },
              mt: { xs: 5, md: 0 },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: '#fff',
                fontWeight: '800',
                [theme.breakpoints.down('md')]: { textAlign: 'center' },
              }}
            >
              Made for Celebrities and Fans
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: '400',
                color: '#fff',
                textAlign: 'center',
                width: '600px',
                maxWidth: '100%',
                [theme.breakpoints.down('md')]: { fontSize: '1em', fontWeight: 'normal' },
              }}
            >
              Discover Your Next Favorite Event and stand a chance to win a Free or Sponsored Ticket Today!
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '40px',
              }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  width: '100%',
                  boxShadow: 'none',
                  backgroundColor: '#1358A5',
                  fontWeight: '700',
                  fontSize: '1rem',
                  padding: '1rem 5rem',
                }}
                onClick={handleButtonClick}
              >
                Find Your Next Event
              </Button>
            </Box>
          </Box>
        </Box>
      </StyledDiv>
    </Box>
  );
}

export default Hero;
