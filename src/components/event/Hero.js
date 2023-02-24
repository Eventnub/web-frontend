import React from 'react';
import { useParams } from 'react-router';
import { Box, Button, Container, Stack, styled, Typography, Divider } from '@mui/material';
import Navbar from '../home/Navbar';
import bg from '../../assets/bg.jpg';
import banner from '../../assets/music-banner.png';
import instagram from '../../assets/Instagram.png';
import facebook from '../../assets/Facebook.png';
import twitter from '../../assets/Twitter.png';

export default function Hero() {
  const StyledBox = styled(Box)({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) ,url(${bg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
  });
  const { eventId } = useParams();
  console.log(eventId);

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <StyledBox>
          <Navbar />
          <Box sx={{ display: 'flex', height: '55%', px: '2%', mt: '5%', gap: '5%', justifyContent: 'space-between' }}>
            <Box sx={{ width: '35%', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <Typography
                sx={{
                  textTransform: 'capitalize',
                  fontSize: '2.5rem',
                  color: '#fff',
                  fontWeight: '600',
                  lineHeight: '2.5rem',
                }}
              >
                Canadian music concert
              </Typography>
              <Typography sx={{ color: '#fff', fontSize: '1.75rem', fontWeight: '200' }}>
                Don’t Miss Out on Your Next Favorite Concert. Win a Free or Sponsored Ticket Now!
              </Typography>
              <Button
                variant="contained"
                sx={{
                  boxShadow: 'none',
                  backgroundColor: '#1358A5',
                  width: '90%',
                  height: '15%',
                  borderRadius: '10px',
                }}
              >
                <Typography sx={{ color: '#fff', fontSize: '1rem', fontWeight: '200', textAlign: 'center' }}>
                  Find Available Tickets
                </Typography>
              </Button>
            </Box>
            <Box sx={{ backgroundColor: 'green', width: '45%' }}>
              <img src={banner} alt="Music Banner" style={{ height: '100%', width: '100%' }} />
            </Box>
          </Box>
          <Typography sx={{ pl: '2%', color: '#fff', fontSize: '1.25rem', fontWeight: '200', mt: '1%' }}>
            Share with friends
          </Typography>
          <Stack direction="row" spacing="2%" sx={{ px: '2%', mt: '1%' }}>
            <img src={facebook} alt="facebook logo" />
            <img src={twitter} alt="twitter logo" />
            <img src={instagram} alt="instagram logo" />
          </Stack>
        </StyledBox>
        <Container maxWidth="xl" sx={{ position: 'absolute', bottom: '-78px' }}>
          <Box
            sx={{
              width: '100%',
              backgroundColor: '#fff',
              height: '15vh',
              display: 'flex',
              boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '5px',
            }}
          >
            <Box sx={{ flex: 1, p: '2%' }}>
              <Stack>
                <Typography sx={{ fontSize: '1rem', color: '#808080', fontWeight: '200' }}>Date</Typography>
                <Typography sx={{ color: '#000', fontSize: '1.5rem', fontWeight: '400' }}>22ND JAN 2023</Typography>
              </Stack>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: '70%', alignSelf: 'center', mx: 2, backgroundColor: '#000' }}
            />
            <Box sx={{ flex: 1, p: '2%' }}>
              <Stack>
                <Typography sx={{ fontSize: '1rem', color: '#808080', fontWeight: '200' }}>Time</Typography>
                <Typography sx={{ color: '#000', fontSize: '1.5rem', fontWeight: '400' }}>06:00PM - 10:00PM</Typography>
              </Stack>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: '70%', alignSelf: 'center', mx: 2, backgroundColor: '#000' }}
            />
            <Box sx={{ flex: 1, p: '2%' }}>
              <Stack>
                <Typography sx={{ fontSize: '1rem', color: '#808080', fontWeight: '200' }}>Location</Typography>
                <Typography sx={{ fontSize: '.8rem', color: '#000', fontWeight: '200' }}>
                  Miami Hotel by obudu junction, idoma road, Calabar state, Nigeria
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box sx={{ height: 'auto', backgroundColor: '#fff', mt: '9%', px: '2%' }}>
        <Typography sx={{ color: '#000', fontSize: '1.3rem', fontWeight: '400', mb: '1%' }}>Description</Typography>
        <Typography sx={{ color: '#000', fontsize: '.8rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Typography>
      </Box>
    </>
  );
}
