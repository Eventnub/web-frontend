import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Button, Stack, Typography, Container, IconButton } from '@mui/material';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { requests } from '../../api/requests';

export default function SliderCom() {
  const [data, setData] = useState([]);
  const slideRef = useRef(null);
  const { eventId } = useParams();
  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data } = await requests.getEvent(eventId);
        setData(data.tickets);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEvents();
  }, [eventId]);

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
      <Slider {...settings} ref={slideRef}>
        {data.map((item) => (
          <Box
            key={item.price}
            sx={{ backgroundColor: '#595959', width: '250px', height: '330px', p: '5% 1% 1% 1%' }}
            id="tickets"
          >
            <Stack>
              <Typography sx={{ color: '#FFF', fontSize: '2rem', fontWeight: '600', mb: '1%' }}>
                {`$${item.price}`}
              </Typography>
              <Typography sx={{ fontSize: '1.5rem', color: '#fff', fontWeight: '400' }}>{item.type}</Typography>
              <Typography sx={{ fontSize: '1rem', color: '#fff', fontWeight: '400', mt: '6.5%', maxWidth: '276px' }}>
                First 20 lucky winners Get it FREE by taking a quiz game
              </Typography>

              <Button
                variant="outlined"
                sx={{ boxShadow: 'none', my: '7%', border: '1px solid #FF6C2C', color: '#fff' }}
                component={Link}
                to={`/payment/${eventId}`}
                state={{ amount: 500, index: item.index, objective: 'to play game' }}
                // onClick={() => {
                //   localStorage.setItem('ticketPrice', 100);
                //   window.location.href = `/payment/${eventId}`;
                // }}
              >
                Play a game and win ticket with $5
              </Button>

              <Button variant="outlined" sx={{ boxShadow: 'none', border: '1px solid #FF6C2C', color: '#fff' }}>
                {`Buy with $${item.price}`}
              </Button>
            </Stack>
          </Box>
        ))}
      </Slider>
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
