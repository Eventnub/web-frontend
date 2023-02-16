import React from 'react';
import { Box, Typography, Button, styled } from '@mui/material';
import Navbar from './Navbar';
import concert from '../../assets/concerts.png';

function Hero() {
  const Num = styled(Typography)({
    fontWeight: '300',
    fontSize: '48px',
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
  return (
    <Box>
      <Box sx={{ height: '95vh', backgroundColor: '#fff' }}>
        <Navbar />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '7%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography
              sx={{
                fontWeight: '200',
                color: '#000',
                fontSize: { xs: '36px', sm: '36px', md: '48px' },
                lineHeight: { xs: '43.5px', sm: '43.5px', md: '58px' },
                mb: '1.5rem',
              }}
            >
              We are Eventnub
            </Typography>
            <Typography
              sx={{
                color: '#000',
                fontWeight: '400',
                fontsize: { xs: '16px', sm: '16px', md: '24px' },
              }}
            >
              An event platform that helps offer fans an opportunity to get free
            </Typography>
            <Typography sx={{ color: '#000', fontWeight: '400', fontsize: '24px', lineHeight: '146.52%' }}>
              and highly discounted passes/tickets to attend concerts, events, or shows of celebrities
            </Typography>
            <Typography sx={{ color: '#000', fontWeight: '400', fontsize: '24px', lineHeight: '146.52%' }}>
              through various gamified activities
            </Typography>
            <Button
              variant="contained"
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
            <Box display="flex" gap={25} mt={10}>
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
        <img src={concert} alt="trailer park concert" style={{ width: '100%', height: '450px' }} />
      </Box>
    </Box>
  );
}

export default Hero;
