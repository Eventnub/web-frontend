import React, { useState } from 'react';
import { Box, Rating, Typography, Container } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const testimonials = [
  {
    name: 'Sarah J.',
    testimony:
      "Eventnub has revolutionized the way I attend concerts. The 'how well you know your fan' game is not only fun but also a great way to win sponsored tickets to see my favorite artists. I would definitely recommend this platform to any music lover out there!",
  },
  {
    name: 'John D.',
    testimony:
      "As an up-and-coming artist, Eventnub has been a game-changer for me. Their platform has allowed me to reach a wider audience and provide my fans with a unique opportunity to attend my events for free. I'm grateful for the support and would highly recommend Eventnub to any artist looking to grow their fanbase.",
  },
  {
    name: 'Michael S.',
    testimony:
      "Eventnub's platform is a game-changer for music fans and artists alike. I appreciate the unique approach they take in allowing fans to win sponsored tickets and engage with their favorite artists on a more personal level. Highly recommend!",
  },
  {
    name: 'Mark T.',
    testimony:
      "I never thought I would have the opportunity to attend a concert of my favorite celebrity, but Eventnub made it possible. Their platform is easy to use, and the 'how well you know your fan' game is a lot of fun. Thank you, Eventnub, for bringing me closer to my idol!",
  },
  {
    name: 'Rachel L.',
    testimony:
      "Eventnub is more than just a ticketing platform, it's a community that brings artists and fans together. I've had the pleasure of attending multiple events through Eventnub, and each one has been a unique and unforgettable experience. Thank you, Eventnub, for creating such an amazing platform!",
  },
];

function TestimonialsSlider() {
  const [value] = useState(5);

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
          dots: true,
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
    <Container maxWidth="xl" sx={{ position: 'relative' }}>
      <Slider {...settings}>
        {testimonials.map((item, index) => (
          <Box key={index} sx={{ px: '1rem', height: { xs: '350px', md: '300px' } }}>
            <Box
              sx={{
                border: '1px solid #838383',
                borderRadius: '10px',
                height: '100%',
                py: '2rem',
                px: '1rem',
              }}
            >
              <Rating name="read-only" value={value} readOnly size="small" />
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: '.8rem', color: '#838383', fontWeight: '400', my: '1rem' }}
              >
                "{item.testimony}"
              </Typography>
              <Typography sx={{ fontSize: '1rem', mt: '10px', fontWeight: '600', color: '#838383' }}>
                {item.name}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>
    </Container>
  );
}

export default TestimonialsSlider;
