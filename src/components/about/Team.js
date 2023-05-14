import React from 'react';
import { Box, Typography, Avatar, Stack } from '@mui/material';
import facebookLogo from '../../assets/Facebook.png';
import twitterLogo from '../../assets/Twitter.png';
import linkedinLogo from '../../assets/linkedin.png';
import instagramLogo from '../../assets/Instagram.png';
import peter from '../../assets/teamImg.png';

function Team() {
  const data = [
    {
      index: 1,
      name: 'EMMANUEL CHILAKA',
      role: 'CEO/CO-FOUNDER',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    },
    {
      index: 4,
      name: 'PETER AKWA',
      role: 'UI/UX DESIGNER',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      pohoUrl: peter,
    },

    {
      index: 2,
      name: 'MARCELLUS NWANKWO',
      role: 'CHIEF OPERATIONS OFFICER (COO)',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    },

    {
      index: 5,
      name: 'CHIGOZIE OFOJI',
      role: 'BACKEND ENGINEER',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    },
    {
      index: 3,
      name: 'FRANCISCA AMUZIE',
      role: 'PRODUCT MANAGER',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    },
    {
      index: 6,
      name: 'BENJAMIN DAVID',
      role: 'FRONTEND ENGINEER',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    },
  ];
  return (
    <Box mb={'4rem'}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: { xs: '85%', sm: '85%' } }}
        >
          <Typography
            sx={{
              color: '#000',
              fontWeight: '400',
              fontSize: '2.5rem',
              lineHeight: '2.5rem',
              mb: '1rem',
              textAlign: 'center',
            }}
          >
            Our Creative Team
          </Typography>
          <Typography sx={{ color: '#000', fontSize: '1rem', fontWeight: '400', textAlign: 'center' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna.
          </Typography>
          <Typography sx={{ color: '#000', fontSize: '1rem', fontWeight: '400', textAlign: 'center' }}>
            eiusmod tempor incididunt ut labore et dolore magna.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column' },
          width: '100%',
          flexWrap: { xs: 'nowrap', sm: 'wrap', md: 'wrap' },
          height: { xs: 'fit-content', sm: '100vh', md: '100vh' },
          gap: '1.5rem',
          alignItems: 'center',
          justifyContent: 'center',
          mt: '2rem',
        }}
      >
        {data.map((item) => (
          <Box
            sx={{
              height: { xs: '337px', sm: '45%', md: '48%' },
              width: { xs: '80%', sm: '25%', md: '25%' },
              p: '1.5rem',
              boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
            }}
            key={item.index}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Avatar sx={{ height: '100px', width: '100px', border: '1px solid #000' }} src={item.pohoUrl} />
            </Box>
            <Stack sx={{ mt: '1rem' }}>
              <Typography sx={{ textAlign: 'center', color: '#000', fontSize: '1.2rem', fontWeight: '600' }}>
                {item.name}
              </Typography>
              <Typography sx={{ textAlign: 'center', fontSize: '.7rem', color: '#7E7E7E', fontWeight: '700' }}>
                {item.role}
              </Typography>
            </Stack>
            <Typography
              sx={{ mt: '.5rem', textAlign: 'center', fontSize: '.7rem', color: '#8F8F8F', fontWeight: '400' }}
            >
              {item.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '1rem', gap: '1rem' }}>
              <img src={linkedinLogo} alt="linkedin" style={{ width: '27px', height: '27px' }} />
              <img src={facebookLogo} alt="facebook" style={{ width: '27px', height: '27px' }} />
              <img src={twitterLogo} alt="twitter" style={{ width: '27px', height: '27px' }} />
              <img src={instagramLogo} alt="instagram" style={{ width: '27px', height: '27px' }} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Team;
