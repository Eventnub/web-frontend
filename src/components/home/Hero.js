import React from 'react';
import { Box, styled, Typography, Button, useTheme } from '@mui/material';
import Navbar from './Navbar';
import bg from '../../assets/bg.jpg';

function Hero() {
  const theme = useTheme();
  const StyledDiv = styled('div')(({ bg }) => ({
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: 'fit-content',
    position: 'relative',
    '&::after': {
      content: '" "',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
  }));
  return (
    <Box>
      <StyledDiv bg={bg}>
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '10% 0 30% 0',
            [theme.breakpoints.down('sm')]: { padding: '5% 0 5% 0', height: '40vh' },
          }}
          lg={{
            height: 'fit-content',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: '1',
              width: '100%',
              [theme.breakpoints.down('sm')]: { marginTop: '100px' },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: '40px',
                color: '#fff',
                fontWeight: '800',
                [theme.breakpoints.down('sm')]: { fontSize: '1.5em', fontWeight: 'normal' },
              }}
            >
              Made For Artist & Fans
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: '400',
                color: '#fff',
                align: 'center',
                [theme.breakpoints.down('sm')]: { fontSize: '1em', fontWeight: 'normal' },
              }}
            >
              Don’t Miss Out on Your Next Favorite Concert
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: '400',
                color: '#fff',
                align: 'center',
                [theme.breakpoints.down('sm')]: { fontSize: '1em', fontWeight: 200 },
              }}
            >
              Win A Free or Sponsored Ticket Now!
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '40px',
                [theme.breakpoints.down('sm')]: { marginTop: '40px' },
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  height: '10vh',
                  boxShadow: 'none',
                  backgroundColor: '#1358A5',
                  padding: '0 20px',
                  [theme.breakpoints.down('sm')]: { width: '50vw', height: '50px' },
                }}
              >
                <Typography
                  component="h5"
                  sx={{ color: '#fff', fontWeight: '700', [theme.breakpoints.down('sm')]: { fontSize: '12px' } }}
                >
                  Find Your Next Concert
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
