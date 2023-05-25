import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Stack, Typography, Container, IconButton, CircularProgress } from '@mui/material';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { requests } from '../../api/requests';
import SelectGameDialog from './SelectGameDialog';
// import SelectPaymentOption from './SelectPaymentOptionDialog';
import useFirebase from '../../hooks/useFirebase';
import ComingSoonDialog from './ComingSoonDialog';

export default function TicketCarousel() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogShown, setDialogShown] = useState(false);
  const [comingSoonDialogShown, setComingSoonDialogShown] = useState(false);
  // const [paymentDialogShown, setPaymentDialogShown] = useState(false);
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
    if (isAuthenticated) {
      const payments = userPayments.filter((payment) => payment.ticketIndex === index);
      console.log(payments);
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
          const response = window.confirm('You have participated in the game, are you sure you want to play again');
          if (response) {
            setDialogShown(true);
          }
        }
        console.log(unplayedPayment);
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

  const handleCloseComingSoonDialog = () => {
    setComingSoonDialogShown(false);
  };
  const handleOpenComingSoonDialog = () => {
    setComingSoonDialogShown(true);
  };
  // const handleOpenPaymentDialog = (objective, amount, index) => {
  //   if (isAuthenticated) {
  //     if (payStatus !== null) {
  //       alert('You have already purchased this ticket');
  //       return null;
  //     }
  //     setExtraPaymentData({
  //       objective,
  //       amount,
  //       index,
  //     });
  //     setPaymentDialogShown(true);
  //   } else {
  //     let redirectUrl = encodeURIComponent(location.pathname);
  //     redirectUrl = `${redirectUrl}`;
  //     navigate(`/auth/login?redirectUrl=${redirectUrl}`);
  //   }
  //   return null;
  // };

  // const handleClosePaymentDialog = () => {
  //   setPaymentDialogShown(false);
  // };

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   const objectiveParam = searchParams.get('objective');
  //   // const amountParam = searchParams.get('amount');
  //   if (objectiveParam === 'to play game') {
  //     setDialogShown(true);
  //   } else if (objectiveParam === 'to buy') {
  //     setPaymentDialogShown(true);
  //   }
  // }, []);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        const { data } = await requests.getEvent(eventId);
        setData(data.tickets);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEvents();
  }, [eventId]);

  useEffect(() => {
    async function fetchPaymentStatusForEvent() {
      try {
        const { data } = await requests.getUserPaymentForEvent(eventId, user.idToken);
        setUserPayments(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPaymentStatusForEvent();
  }, [user.idToken, eventId]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    arrows: false,
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
  return (
    <Container maxWidth="3xl" sx={{ position: 'relative' }}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Slider {...settings} ref={slideRef}>
          {data.map((item) => (
            <Box
              key={item.index}
              sx={{
                backgroundColor: '#595959',
                width: '250px',
                height: '380px',
                p: '5% 1% 1% 1%',
              }}
              id="tickets"
            >
              <Stack>
                <Typography sx={{ color: '#FFF', fontSize: '2rem', fontWeight: '600', mb: '1%' }}>
                  {`$${item.price}`}
                </Typography>
                <Typography sx={{ fontSize: '1.5rem', color: '#fff', fontWeight: '400' }}>{item.type}</Typography>
                <Typography sx={{ color: '#fff', fontWeight: '600', fontSize: '1rem' }}>
                  Pay ${item.price * 0.15} of the ticket price and get it for free by playing a game.
                </Typography>
              </Stack>

              <Stack>
                <Button
                  variant="outlined"
                  sx={{ boxShadow: 'none', my: '7%', border: '1px solid #FF6C2C', color: '#fff', mt: '6rem' }}
                  onClick={() => handleOpenDialog(item.price * 0.15, item.index)}
                >
                  Play a game and win ticket
                </Button>

                <Button
                  variant="outlined"
                  // onClick={() => handleOpenPaymentDialog('purchase', item.price, item.index)}
                  onClick={handleOpenComingSoonDialog}
                  sx={{ boxShadow: 'none', border: '1px solid #FF6C2C', color: '#fff' }}
                >
                  {`Buy with $${item.price}`}
                </Button>
              </Stack>
              <SelectGameDialog
                open={dialogShown}
                handleClose={handleCloseDialog}
                extraPaymentData={extraPaymentData}
              />
              <ComingSoonDialog open={comingSoonDialogShown} handleClose={handleCloseComingSoonDialog} />
              {/* <SelectPaymentOption
                open={paymentDialogShown}
                // handleClose={handleClosePaymentDialog}
                extraPaymentData={extraPaymentData}
              /> */}
            </Box>
          ))}
        </Slider>
      )}

      <IconButton
        sx={{
          borderRadius: '50%',
          background: '#C3C3C3',
          height: '2rem',
          width: '2rem',
          border: '1px solid #838383',
          position: 'absolute',
          top: '50%',
          left: '3%',
        }}
        onClick={() => slideRef?.current.slickPrev()}
      >
        <KeyboardArrowLeftSharpIcon />
      </IconButton>
      <IconButton
        sx={{
          borderRadius: '50%',
          background: '#C3C3C3',
          height: '2rem',
          width: '2rem',
          border: '1px solid #838383',
          position: 'absolute',
          top: '50%',
          right: '0.5%',
        }}
        onClick={() => slideRef?.current.slickNext()}
      >
        <KeyboardArrowRightSharpIcon />
      </IconButton>
    </Container>
  );
}
