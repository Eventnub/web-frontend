import React, { useState, useRef } from 'react';
import { Box, Rating, useTheme, Typography, Avatar, Container, IconButton } from '@mui/material';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import avatarImg from '../../assets/avatar.png';

const data = [
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

function SliderCom() {
  const [value] = useState(5);
  const theme = useTheme();

  const slideRef = useRef(null);
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
    <Container maxWidth="3xl" sx={{ mt: 8, position: 'relative' }}>
      <Slider {...settings} ref={slideRef}>
        {data.map((item) => (
          <Box
            sx={{ border: '1px solid #838383', borderRadius: '10px', height: '320px', py: '1.2rem', px: '.5rem' }}
            key={Math.random()}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '.8rem',
              }}
              component="span"
            >
              <Box component="span" sx={{}}>
                <Rating name="read-only" value={value} readOnly size="small" />
              </Box>
              <Box
                component="span"
                sx={{
                  marginTop: '.9rem',
                }}
              >
                <Typography variant="body1" paragraph sx={{ fontSize: '.8rem', color: '#838383', fontWeight: '400' }}>
                  "{item.testimony}"
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  marginLeft: 0,
                  marginRight: 0,
                  justifyContent: 'start',
                  alignItems: 'center',
                  padding: 0,
                  gap: '1rem',
                }}
                component="span"
              >
                <Avatar
                  src={avatarImg}
                  alt="avatar"
                  sx={{
                    marginTop: '10px',
                    width: 70,
                    height: 70,
                    padding: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    [theme.breakpoints.down('sm')]: { width: 40, height: 40 },
                  }}
                  component="span"
                />

                <Typography sx={{ fontSize: '1rem', marginTop: '10px', fontWeight: '600', color: '#838383' }}>
                  {item.name}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
      <IconButton
        sx={{
          borderRadius: '50%',
          background: 'transparent',
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
          background: 'transparent',
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

export default SliderCom;
