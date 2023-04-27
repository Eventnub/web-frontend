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
import SelectPaymentOption from './SelectPaymentOptionDialog';
import useFirebase from '../../hooks/useFirebase';

export default function TicketCarousel() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogShown, setDialogShown] = useState(false);
  const [paymentDialogShown, setPaymentDialogShown] = useState(false);
  const [payStatus, setPayStatus] = useState(null);
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
      if (payStatus !== null) {
        if (payStatus.objective === 'quiz and music match') {
          navigate(`/quiz/${eventId}`);
        }
        if (payStatus.objective === 'raffle draw') {
          navigate(`/raffle/${eventId}`);
        }
        return null;
      }
      setExtraPaymentData({
        amount,
        index,
      });
      setDialogShown(true);
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

  const handleOpenPaymentDialog = (objective, amount, index) => {
    if (isAuthenticated) {
      if (payStatus !== null) {
        alert('You have already purchased this ticket');
        return null;
      }
      setExtraPaymentData({
        objective,
        amount,
        index,
      });
      setPaymentDialogShown(true);
    } else {
      let redirectUrl = encodeURIComponent(location.pathname);
      redirectUrl = `${redirectUrl}`;
      navigate(`/auth/login?redirectUrl=${redirectUrl}`);
    }
    return null;
  };

  const handleClosePaymentDialog = () => {
    setPaymentDialogShown(false);
  };

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
        setPayStatus(data);
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
        breakpoint: 600,
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
    <Container maxWidth="xl" sx={{ position: 'relative' }}>
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
                height: '330px',
                p: '5% 1% 1% 1%',
              }}
              id="tickets"
            >
              <Stack>
                <Typography sx={{ color: '#FFF', fontSize: '2rem', fontWeight: '600', mb: '1%' }}>
                  {`$${item.price}`}
                </Typography>
                <Typography sx={{ fontSize: '1.5rem', color: '#fff', fontWeight: '400' }}>{item.type}</Typography>
              </Stack>
              <Stack>
                <Button
                  variant="outlined"
                  sx={{ boxShadow: 'none', my: '7%', border: '1px solid #FF6C2C', color: '#fff', mt: '6rem' }}
                  onClick={() => handleOpenDialog(item.price * 0.1, item.index)}
                >
                  Play a game and win ticket
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => handleOpenPaymentDialog('purchase', item.price, item.index)}
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
              <SelectPaymentOption
                open={paymentDialogShown}
                handleClose={handleClosePaymentDialog}
                extraPaymentData={extraPaymentData}
              />
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
