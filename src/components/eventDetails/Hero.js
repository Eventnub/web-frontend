import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Button, Stack, styled, Typography, useTheme, useMediaQuery, CircularProgress, Grid } from '@mui/material';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';
import moment from 'moment';
import Navbar from '../home/Navbar';
import DrawerCom from './DrawerCom';
import { requests } from '../../api/requests';
import bg from '../../assets/bgImg-lhd.png';
import mixpanel from '../../utils/mixpanel';

const StyledBox = styled(Box)({
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) ,url(${bg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  minHeight: '100vh',
  width: '100%',
  paddingBottom: '2rem',
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

        mixpanel.track('Event details viewed', {
          eventName: data.name,
          eventUid: data.uid,
          eventCountry: data.country,
          eventState: data.state,
          eventVenue: data.venue,
        });
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
              position: 'relative',
              width: '100%',
              height: '50vh',
              backgroundImage: `url(${event.photoUrl})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                bottom: '0',
                width: '100%',
                minHeight: '50%',
                background: 'rgba(0, 0, 0, 0.57)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                p: '.5rem',
              }}
            >
              <Stack direction="row" justifyContent="space-between" alignItems="center">
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
                <DrawerCom />
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: '1.5rem' }}>
                <Button
                  size="large"
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
                </Stack>
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              mt: '2rem',
              px: '1rem',
              pl: '2rem',
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                backgroundColor: '#fff',
                p: '1rem',
                boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
                borderRadius: '5px',
              }}
            >
              <Grid item xs={6} sx={{ p: '1rem' }}>
                <Typography sx={{ fontSize: '0.9rem', color: '#808080', fontWeight: '200' }}>Date</Typography>
                <Typography sx={{ color: '#000', fontSize: '1rem', fontWeight: '600' }}>{formattedDate}</Typography>
              </Grid>
              <Grid item md={6} sx={{ borderLeft: '1px solid rgba(0, 0, 0, 0.25)', p: '1rem' }}>
                <Typography sx={{ fontSize: '0.9rem', color: '#808080', fontWeight: '200' }}>Time</Typography>
                <Typography sx={{ color: '#000', fontSize: '1rem', fontWeight: '600' }}>{formattedTime}</Typography>
              </Grid>
              <Grid item md={12} sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.25)' }}>
                <Typography sx={{ fontSize: '1rem', color: '#808080', fontWeight: '200' }}>Location</Typography>
                <Typography sx={{ fontSize: '0.9rem', color: '#000', fontWeight: '600' }}>
                  {`${event.venue}, ${event.state}, ${event.country}`}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ my: '3rem', height: 'auto', px: '4%' }}>
            <Typography
              sx={{
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '1.3rem',
                color: '#000',
                lineHeight: '1rem',
                mb: '0.8rem',
              }}
            >
              Description
            </Typography>
            <Typography sx={{ textAlign: 'center', fontWeight: '400', color: '#000', fontSize: '0.9rem' }}>
              {event.description}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ position: 'relative' }}>
            <StyledBox>
              <Navbar />
              <Grid container sx={{ p: '4rem' }}>
                <Grid item md={6}>
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <Typography
                      sx={{
                        textTransform: 'capitalize',
                        fontSize: '2.5rem',
                        color: '#fff',
                        fontWeight: '600',
                        width: '70%',
                        lineHeight: '2.5rem',
                      }}
                    >
                      {event.name}
                    </Typography>
                  )}

                  <Typography
                    sx={{
                      color: '#fff',
                      fontSize: '1.75rem',
                      fontWeight: '200',
                      width: '70%',
                      my: '2rem',
                    }}
                  >
                    Don’t Miss Out on Your Next Favorite Concert. Win a Free or Sponsored Ticket Now!
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#1358A5',
                      width: '40%',
                      p: 1,
                      border: '1px solid #fff',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontWeight: '200',
                    }}
                    onClick={handleButtonClick}
                  >
                    Find Available Tickets
                  </Button>
                  <Typography
                    sx={{
                      color: '#fff',
                      fontSize: '1.25rem',
                      fontWeight: '200',
                      mt: '3rem',
                    }}
                  >
                    Share with friends
                  </Typography>
                  <Stack direction="row" spacing="10px" sx={{ mt: '0.2rem' }}>
                    <FacebookShareButton url={currentPageUrl} hashtag="#eventNub">
                      <FacebookIcon round size={45} />
                    </FacebookShareButton>
                    <TwitterShareButton url={currentPageUrl}>
                      <TwitterIcon round size={45} />
                    </TwitterShareButton>
                  </Stack>
                </Grid>
                <Grid item md={6}>
                  {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <img
                      src={event.photoUrl}
                      alt={event.name}
                      style={{
                        width: '100%',
                        display: 'block',
                        objectFit: 'fill',
                        borderRadius: '1rem',
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </StyledBox>
            <Box
              sx={{
                position: 'relative',
                top: '-2rem',
                width: '100%',
                px: '3rem',
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{
                  backgroundColor: '#fff',
                  p: '1rem',
                  boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
                  borderRadius: '5px',
                }}
              >
                <Grid item md={4}>
                  <Typography sx={{ fontSize: '1rem', color: '#808080', fontWeight: '200' }}>Date</Typography>
                  <Typography sx={{ color: '#000', fontSize: '1.2rem', fontWeight: '400' }}>{formattedDate}</Typography>
                </Grid>
                <Grid item md={4} sx={{ borderRight: '1px solid #000', borderLeft: '1px solid #000' }}>
                  <Typography sx={{ fontSize: '1rem', color: '#808080', fontWeight: '200' }}>Time</Typography>
                  <Typography sx={{ color: '#000', fontSize: '1.2rem', fontWeight: '400' }}>{formattedTime}</Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography sx={{ fontSize: '1rem', color: '#808080', fontWeight: '200' }}>Location</Typography>
                  <Typography
                    sx={{ fontSize: '1.2rem', color: '#000', fontWeight: '200' }}
                  >{`${event.venue}, ${event.state}, ${event.country}`}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ height: 'auto', backgroundColor: '#fff', my: '2rem', px: '2rem' }}>
            <Typography
              sx={{
                color: '#000',
                fontSize: '1.3rem',
                fontWeight: '400',
                mb: '1rem',
              }}
            >
              Description
            </Typography>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Typography
                sx={{
                  color: '#000',
                  fontsize: '.8rem',
                }}
              >
                {event.description}
              </Typography>
            )}
          </Box>
        </>
      )}
    </>
  );
}
