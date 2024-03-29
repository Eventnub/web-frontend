import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography, Container, IconButton, CircularProgress, Tooltip } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Swal from 'sweetalert2';
import { requests } from '../../api/requests';
import { toFixedFloat } from '../../utils/formatNumber';
import SelectGameDialog from './SelectGameDialog';
import useFirebase from '../../hooks/useFirebase';
import ComingSoonDialog from './ComingSoonDialog';
import PlayGameAgainNotificationDialog from './PlayGameAgainNotificationDialog';
import Iconify from '../Iconify';

export default function TicketCarousel({ onTicketsLoaded }) {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogShown, setDialogShown] = useState(false);
  const [playGameAgainDialogShown, setPlayGameAgainDialogShown] = useState(false);
  const [comingSoonDialogShown, setComingSoonDialogShown] = useState(false);
  const [userPayments, setUserPayments] = useState([]);
  const [extraPaymentData, setExtraPaymentData] = useState({
    objective: '',
    amount: 0,
    index: -1,
  });
  const slideRef = useRef(null);
  const { eventId } = useParams();
  const { isAuthenticated, user } = useFirebase();
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenDialog = (amount, index) => {
    if (event.gameEndTimestamp === 0) {
      Swal.fire({
        title: 'Oops!',
        text: 'The event games are yet to be set by the admin',
        icon: 'warning',
        confirmButtonText: 'Okay',
        confirmButtonAttributes: {
          href: '/',
          target: '_self',
        },
      });
      return null;
    }

    if (event.gameEndTimestamp < Date.now()) {
      Swal.fire({
        title: 'Oops!',
        text: 'The event game duration has ended.',
        icon: 'warning',
        confirmButtonText: 'Okay',
        confirmButtonAttributes: {
          href: '/',
          target: '_self',
        },
      });
      return null;
    }

    if (isAuthenticated) {
      const payments = userPayments.filter((payment) => payment.ticketIndex === index);
      // When user has no payment record
      if (payments.length === 0) {
        setDialogShown(true);
      }
      if (payments.length >= 1) {
        const [unplayedPayment] = payments.filter((payment) => {
          const { objective, extraData } = payment;
          return (
            (objective === 'quiz and music match' && !extraData.hasPlayedQuiz && !extraData.hasPlayedMusicUnison) ||
            (objective === 'raffle draw' && !extraData.hasPlayedRaffleDraw)
          );
        });
        if (unplayedPayment && unplayedPayment.objective === 'quiz and music match') {
          const paymentId = unplayedPayment.uid;
          localStorage.setItem('paymentId', paymentId);
          navigate(`/quiz/${eventId}`);
        }
        if (unplayedPayment && unplayedPayment.objective === 'raffle draw') {
          const paymentId = unplayedPayment.uid;
          localStorage.setItem('paymentId', paymentId);
          navigate(`/raffle/${eventId}`);
        }
        if (!unplayedPayment) {
          handleOpenPlayGameAgainDialog();
        }
      }
      setExtraPaymentData({
        amount,
        index,
      });
    } else {
      let redirectUrl = encodeURIComponent(location.pathname);
      redirectUrl = `${redirectUrl}`;
      navigate(`/auth/login?redirectUrl=${redirectUrl}`);
    }
    return null;
  };

  const handleCloseDialog = () => {
    setDialogShown(false);
  };

  const handleOpenPlayGameAgainDialog = () => {
    setPlayGameAgainDialogShown(true);
  };

  const handleClosePlayGameAgainDialog = () => {
    setPlayGameAgainDialogShown(false);
  };

  const handleCancel = () => {
    setPlayGameAgainDialogShown(false);
  };

  const handleContinue = () => {
    setDialogShown(true);
  };

  const handleCloseComingSoonDialog = () => {
    setComingSoonDialogShown(false);
  };

  const handleOpenComingSoonDialog = () => {
    setComingSoonDialogShown(true);
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        const { data } = await requests.getEvent(eventId);
        setEvent(data);
        setIsLoading(false);
        onTicketsLoaded();
      } catch (error) {
        console.log(error);
      }
    }

    fetchEvents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  useEffect(() => {
    async function fetchPaymentStatusForEvent() {
      try {
        const { data } = await requests.getUserPaymentForEvent(eventId, user.idToken);
        setUserPayments(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPaymentStatusForEvent();
  }, [user.idToken, eventId]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ position: 'relative' }}>
      <Slider {...settings} ref={slideRef}>
        {event?.tickets?.map((item) => (
          <Box key={item.index} sx={{ px: '0.8rem', width: '250px' }}>
            <Box
              sx={{
                position: 'relative',
                backgroundColor: '#595959',
                width: '100%',
                borderRadius: '1rem',
                p: '1rem',
              }}
              id="tickets"
            >
              <Tooltip
                leaveDelay={1000}
                title={
                  <Typography variant="body2">
                    Click{' '}
                    <a
                      href={item.description}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontWeight: '500',
                      }}
                    >
                      here
                    </a>{' '}
                    to view this ticket's seat map
                  </Typography>
                }
                sx={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                }}
              >
                <IconButton>
                  <Iconify
                    icon={'bi:info-circle'}
                    width={16}
                    height={16}
                    sx={{
                      color: 'common.white',
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Typography
                sx={{
                  color: '#FFF',
                  fontSize: '1.6rem',
                  fontWeight: '600',
                  mb: '0.8rem',
                }}
              >
                {`$${item.price}`}
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.1rem',
                  color: '#fff',
                  fontWeight: '400',
                  mb: '0.3rem',
                }}
              >
                {item.type}
              </Typography>
              <Typography
                sx={{
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                }}
              >
                {`Pay $${toFixedFloat(item.price * 0.15)} of the ticket price and 
              get it for free by playing a game.`}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleOpenDialog(toFixedFloat(item.price * 0.15), item.index)}
                sx={{
                  boxShadow: 'none',
                  backgroundColor: '#FF6C2C',
                  border: '1px solid #FF6C2C',
                  color: '#fff',
                  mt: { xs: '6rem', md: '8rem' },
                  p: '0.5rem',
                  mb: '1rem',
                  '&:hover': {
                    color: '#FF6C2C',
                    backgroundColor: 'transparent',
                    border: '1px solid #FF6C2C',
                  },
                }}
              >
                Play a game and win ticket
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={handleOpenComingSoonDialog}
                sx={{
                  boxShadow: 'none',
                  color: '#FF6C2C',
                  border: '1px solid #FF6C2C',
                  mb: '1rem',
                  p: '0.5rem',
                  '&:hover': {
                    color: '#fff',
                    bgcolor: '#FF6C2C',
                    border: '1px solid #FF6C2C',
                  },
                }}
              >
                {`Buy with $${item.price}`}
              </Button>
            </Box>
          </Box>
        ))}
      </Slider>

      <SelectGameDialog open={dialogShown} handleClose={handleCloseDialog} extraPaymentData={extraPaymentData} />
      <ComingSoonDialog open={comingSoonDialogShown} handleClose={handleCloseComingSoonDialog} />
      <PlayGameAgainNotificationDialog
        open={playGameAgainDialogShown}
        handleClose={handleClosePlayGameAgainDialog}
        handleCancel={handleCancel}
        handleContinue={handleContinue}
      />
    </Container>
  );
}

TicketCarousel.propTypes = {
  onTicketsLoaded: PropTypes.func,
};
