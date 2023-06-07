import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  Box,
  Button,
  Container,
  Stack,
  styled,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share'; 
import moment from 'moment';
import Navbar from '../home/Navbar';
import DrawerCom from './DrawerCom';
import { requests } from '../../api/requests';
import bg from '../../assets/bg.jpg';

const StyledBox = styled(Box)({
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) ,url(${bg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  height: '100vh',
  width: '100%',
});
export default function Hero() {
  const [event, setEvent] = useState({});
  const { date, time } = event;
  const [isLoading, setIsLoading] = useState(false);
  const { eventId } = useParams();
  const theme = useTheme();
  const formattedDate = moment(date).format('Do MMM, YYYY').toUpperCase();
  const formattedTime = moment(time, 'HH:mm').format('h:mm A');
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));
  const currentPageUrl = window.location.href;

  const handleButtonClick = () => {
    const nextSection = document.getElementById('tickets');
    nextSection.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        const { data } = await requests.getEvent(eventId);
        setEvent(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEvents();
  }, [eventId]);

  return (
    <>
      {isMatch ? (
        <>
          <Box
            sx={{
              width: '100%',
              height: '50vh',
              backgroundImage: `url(${event.photoUrl})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              postion: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '25%',
                top: '24%',
                background: 'rgba(0, 0, 0, 0.57)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: '.5rem',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Typography
                    sx={{
                      color: '#fff',
                      textTransform: 'capitalize',
                      fontSize: '1.25rem',
                      fontWeight: '800',
                      maxWidth: '159px',
                    }}
                  >
                    {event.name}
                  </Typography>
                )}

                <DrawerCom />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10%' }}>
                <Button
                  variant="contained"
                  sx={{ boxShadow: 'none', backgroundColor: '#1358A5' }}
                  onClick={handleButtonClick}
                >
                  Find Available Tickets
                </Button>
                <Stack direction="row" spacing={1}>
                  <FacebookShareButton url={currentPageUrl} hashtag="#eventNub">
                    <FacebookIcon round size={37} />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={currentPageUrl}
                    title={event?.name}
                    hashtags={['#EventNub', '#GlobeEventNub']}
                  >
                    <TwitterIcon round size={37} />
                  </TwitterShareButton>
                  {/* <img src={instagram} alt="instagram logo" style={{ width: '37px', height: '37px' }} /> */}
                </Stack>
              </Box>
            </Box>
          </Box>
          <Container sx={{ mt: '3%' }}>
            <Box
              sx={{
                height: '163px',
                width: '100%',
                boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                p: '2% 4%',
              }}
            >
              <Box sx={{ flex: 1, display: 'flex' }}>
                <Box sx={{ flex: 1 }}>
                  <Stack sx={{ pt: '3%' }}>
                    <Typography sx={{ fontsize: '0.75rem', fontWeight: '600', color: '#808080' }}>Date</Typography>
                    {isLoading ? (
                      <CircularProgress />
                    ) : (
                      <Typography sx={{ fontsize: '.8rem', color: '#000', fontWeight: '600' }}>
                        {formattedDate}
                      </Typography>
                    )}
                  </Stack>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ height: '70%', alignSelf: 'center', mx: 2 }} />
                <Box sx={{ flex: 1 }}>
                  <Stack sx={{ pt: '3%' }}>
                    <Typography sx={{ fontsize: '0.75rem', fontWeight: '600', color: '#808080' }}>Time</Typography>
                    {isLoading ? (
                      <CircularProgress />
                    ) : (
                      <Typography sx={{ fontsize: '.8rem', color: '#000', fontWeight: '600' }}>
                        {formattedTime}
                      </Typography>
                    )}
                  </Stack>
                </Box>
              </Box>
              <Divider orientation="horizontal" flexItem />
              <Box sx={{ flex: 1 }}>
                <Stack>
                  <Typography sx={{ fontsize: '0.75rem', fontWeight: '600', color: '#808080' }}>Location</Typography>
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <Typography
                      sx={{ fontsize: '.8rem', color: '#000', fontWeight: '600' }}
                    >{`${event.venue}, ${event.state}, ${event.country}`}</Typography>
                  )}
                </Stack>
              </Box>
            </Box>
          </Container>
          <Box sx={{ mt: '7%', mb: '7%', height: 'auto', px: '4%' }}>
            <Typography
              sx={{
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '1.3rem',
                color: '#000',
                lineHeight: '1.23rem',
                mb: '2%',
              }}
            >
              Description
            </Typography>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Typography sx={{ textAlign: 'center', fontWeight: '400', color: '#000', fontSize: '0.75rem' }}>
                {event.description}
              </Typography>
            )}
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ position: 'relative' }}>
            <StyledBox>
              <Navbar />
              <Box
                sx={{ display: 'flex', height: '55%', px: '2%', mt: '5%', gap: '5%', justifyContent: 'space-between' }}
              >
                <Box sx={{ width: '35%', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <Typography
                      sx={{
                        textTransform: 'capitalize',
                        fontSize: '2.5rem',
                        color: '#fff',
                        fontWeight: '600',
                        lineHeight: '2.5rem',
                      }}
                    >
                      {event.name}
                    </Typography>
                  )}

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
                    <Typography
                      sx={{ color: '#fff', fontSize: '1rem', fontWeight: '200', textAlign: 'center' }}
                      onClick={handleButtonClick}
                    >
                      Find Available Tickets
                    </Typography>
                  </Button>
                </Box>
                <Box sx={{ width: '45%' }}>
                  {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <img
                      src={event.photoUrl}
                      alt={event.name}
                      style={{ height: '100%', maxWidth: '100%', display: 'block', objectFit: 'fill' }}
                    />
                  )}
                </Box>
              </Box>
              <Typography sx={{ pl: '2%', color: '#fff', fontSize: '1.25rem', fontWeight: '200', mt: '1%' }}>
                Share with friends
              </Typography>
              <Stack direction="row" spacing="2%" sx={{ px: '2%', mt: '1%' }}>
                <FacebookShareButton url={currentPageUrl} hashtag="#eventNub">
                  <FacebookIcon round size={45} />
                </FacebookShareButton>
                <TwitterShareButton url={currentPageUrl}>
                  <TwitterIcon round size={45} />
                </TwitterShareButton>
                {/* <img src={instagram} alt="instagram logo" style={{ width: '45px', height: '45px' }} /> */}
              </Stack>
            </StyledBox>
            <Container maxWidth="3xl" sx={{ position: 'absolute', bottom: '-78px' }}>
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
                <Box sx={{ flex: 1, display: 'flex' }}>
                  <Box sx={{ flex: 1, p: '2%' }}>
                    <Stack>
                      <Typography sx={{ fontSize: '1rem', color: '#808080', fontWeight: '200' }}>Date</Typography>
                      {isLoading ? (
                        <CircularProgress />
                      ) : (
                        <Typography sx={{ color: '#000', fontSize: '1.5rem', fontWeight: '400' }}>
                          {formattedDate}
                        </Typography>
                      )}
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
                      {isLoading ? (
                        <CircularProgress />
                      ) : (
                        <Typography sx={{ color: '#000', fontSize: '1.5rem', fontWeight: '400' }}>
                          {formattedTime}
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ height: '70%', alignSelf: 'center', mx: 2, backgroundColor: '#000' }}
                />
                <Box sx={{ p: '2%' }}>
                  <Stack>
                    <Typography sx={{ fontSize: '1rem', color: '#808080', fontWeight: '200' }}>Location</Typography>
                    {isLoading ? (
                      <CircularProgress />
                    ) : (
                      <Typography
                        sx={{ fontSize: '.8rem', color: '#000', fontWeight: '200' }}
                      >{`${event.venue}, ${event.state}, ${event.country}`}</Typography>
                    )}
                  </Stack>
                </Box>
              </Box>
            </Container>
          </Box>
          <Box sx={{ height: 'auto', backgroundColor: '#fff', mt: '9%', px: '2%' }}>
            <Typography sx={{ color: '#000', fontSize: '1.3rem', fontWeight: '400', mb: '1%' }}>Description</Typography>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Typography sx={{ color: '#000', fontsize: '.8rem' }}>{event.description}</Typography>
            )}
          </Box>
        </>
      )}
    </>
  );
}
