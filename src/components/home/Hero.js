import React from 'react';
import { Box, styled, Typography, Button, useTheme } from '@mui/material';
import Navbar from './Navbar';
import bg from '../../assets/bg.jpg';

const StyledDiv = styled(Box)(({ theme }) => ({
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) ,url(${bg})`,
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
            // alignItems: { xl: 'center' },
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
                // fontSize: '40px',
                color: '#fff',
                fontWeight: '800',
                // [theme.breakpoints.down('sm')]: { fontSize: '1.5em', fontWeight: 'normal' },
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
                [theme.breakpoints.down('md')]: { fontSize: '1em', fontWeight: 'normal' },
              }}
            >
              Discover Your Next Favorite Event and stand a chance
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: '400',
                color: '#fff',
                textAlign: 'center',
                [theme.breakpoints.down('sm')]: { fontSize: '1em', fontWeight: 200 },
              }}
            >
              to win a Free or Sponsored Ticket Today!
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '40px',
                // [theme.breakpoints.down('sm')]: { marginTop: '40px' },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  height: { xs: '5vh', lg: '10vh' },
                  boxShadow: 'none',
                  backgroundColor: '#1358A5',
                  padding: '0 20px',
                  // [theme.breakpoints.down('sm')]: { width: '50vw', height: '50px' },
                }}
              >
                <Typography
                  component="h5"
                  sx={{ color: '#fff', fontWeight: '700', px: 4, [theme.breakpoints.down('sm')]: { fontSize: '12px' } }}
                  onClick={handleButtonClick}
                >
                  Find Your Next Event
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </StyledDiv>
    </Box>
  );
}

export default Hero;
