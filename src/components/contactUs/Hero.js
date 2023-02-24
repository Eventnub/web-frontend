import React from 'react';
import { Box, Typography } from '@mui/material';
import Navbar from '../about/Navbar';
import facebook from '../../assets/Facebook.png';
import linkedin from '../../assets/linkedin.png';
import instagram from '../../assets/Instagram.png';
import twitter from '../../assets/Twitter.png';

export default function Hero() {
  return (
    <Box>
      <Box
        sx={{
          height: { xs: 'fit-content', sm: 'fit-content', md: '65vh' },
          backgroundColor: '#fff',
          mb: { xs: '10%', sm: '10%', md: 0 },
        }}
      >
        <Navbar />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '7%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontSize: '2rem', color: '#000', fontWeight: '600', mb: '3%' }}>Get in Touch</Typography>
            {/* <Typography
              sx={{ color: '#6B6B6B', fontWeight: '400', fontSize: { xs: '1rem', sm: '1.2rem', md: '1.2rem' } }}
            >
              We are eager to discuss your concert needs, and answer
            </Typography>
            <Typography
              sx={{ color: '#6B6B6B', fontWeight: '400', fontSize: { xs: '1rem', sm: '1.2rem', md: '1.2rem' } }}
            >
              the pressing questions you may have.
            </Typography>
            <Typography
              sx={{
                color: '#6B6B6B',
                fontWeight: '400',
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.2rem' },
                mb: '8%',
              }}
            >
              Reach us on our social media pages below.
            </Typography> */}
            <Typography
              textAlign="center"
              sx={{
                color: '#6B6B6B',
                fontWeight: '400',
                fontSize: {
                  xs: '1rem',
                  sm: '1.2rem',
                  md: '1.2rem',
                  px: '50px',
                  maxWidth: '520px',
                  maxHeight: '96px',
                  mb: '28%',
                },
              }}
            >
              We are eager to discuss your concert needs, and answer the pressing questions you may have. Reach us on
              our social media pages below.
            </Typography>
            <Box sx={{ display: 'flex', gap: '30%', justifyContent: 'center', alignItems: 'center', mt: '8%' }}>
              <img src={linkedin} alt="Linkedin logo" style={{ height: '37px', width: '37px' }} />
              <img src={facebook} alt="facebook logo" />
              <img src={twitter} alt="twitter logo" />
              <img src={instagram} alt="instagram logo" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
