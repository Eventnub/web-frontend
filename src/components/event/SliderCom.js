import React, { useRef } from 'react';
import { Box, Button, Stack, Typography, Container, IconButton } from '@mui/material';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

export default function SliderCom() {
  const slideRef = useRef(null);
  const data = [
    {
      id: 1,
      price: '$50.00',
      type: 'Couples Regular',
      description: 'First 20 lucky winners Get it FREE by taking a quiz game',
      action: 'Join quiz and win ticket with $5',
      buy: 'Buy with $50',
    },
    {
      id: 2,
      price: '$100.00',
      type: 'Couples VIP',
      description: 'First 10 lucky winners Get it FREE by taking a quiz game',
      action: 'Join quiz and win ticket with $5',
      buy: 'Buy with $100',
    },
    {
      id: 3,
      price: '$200.00',
      type: 'Couples VIP',
      description: 'First 5 lucky winners Get it FREE by taking a quiz game',
      action: 'Join quiz and win ticket with $5',
      buy: 'Buy with $200',
    },
    {
      id: 4,
      price: '$400.00',
      type: 'Couples Regular',
      description: 'First 20 lucky winners Get it FREE by taking a quiz game',
      action: 'Join quiz and win ticket with $5',
      buy: 'Buy with $50',
    },
  ];
  const settings = {
    dots: false,
    infinite: true,
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
          <Box key={item.id} sx={{ backgroundColor: '#595959', width: '250px', height: '330px', p: '5% 1% 1% 1%' }}>
            <Stack>
              <Typography sx={{ color: '#FF6C2C', fontSize: '2rem', fontWeight: '600', mb: '1%' }}>
                {item.price}
              </Typography>
              <Typography sx={{ fontSize: '1.5rem', color: '#fff', fontWeight: '400' }}>{item.type}</Typography>
              <Typography sx={{ fontSize: '1rem', color: '#fff', fontWeight: '400', mt: '6.5%', maxWidth: '276px' }}>
                {item.description}
              </Typography>
              <Button
                variant="outlined"
                sx={{ boxShadow: 'none', my: '7%', border: '1px solid #FF6C2C', color: '#fff' }}
              >
                {item.action}
              </Button>
              <Button variant="outlined" sx={{ boxShadow: 'none', border: '1px solid #FF6C2C', color: '#fff' }}>
                {item.buy}
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
