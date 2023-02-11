import React, { useState, useRef } from 'react';
import { Paper, Box, Rating, useTheme, Typography, Avatar, Stack, Container, IconButton, styled } from '@mui/material';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import avatarImg from '../../assets/avatar.png';

const Testimonial = ({ value, text, profession, name }) => {
  const theme = useTheme();
  return (
    <Paper
      variant="outlined"
      component="span"
      sx={{
        height: '250px',
        width: '170px',
        background: '#FBFBFB',
        padding: '10px',
        [theme.breakpoints.down('sm')]: { flexDirection: 'column', width: '100%' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '10px',
        }}
        component="span"
      >
        <Box component="span" sx={{ marginTop: '10px' }}>
          <Rating name="read-only" value={value} readOnly size="small" />
        </Box>
        <Box component="span" sx={{ height: '5Opx', marginTop: '15px' }}>
          <Typography variant="body1" paragraph sx={{ fontSize: '13px', color: '#838383', fontWeight: '400' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi
            consequuntur voluptatum.
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
          <Stack component="span" sx={{ marginTop: 1, marginLeft: '10px', marginRight: 0 }}>
            <Typography sx={{ fontsize: '5px', marginTop: '10px', fontWeight: '600' }}>Peter Akwa</Typography>
            <Typography variant="subtitle2" sx={{ color: '#079EB2', fontWeight: '400' }}>
              Doctor
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
};

function SliderCom() {
  const [value, setValue] = useState(5);
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
          dots: true,
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

  const testimonials = [
    {
      name: 'Peter Akwa',
      value,
      profession: 'Doctor',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sintcommodi consequuntur voluptatum.',
    },
    {
      name: 'Peter Akwa',
      value,
      profession: 'Doctor',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sintcommodi consequuntur voluptatum.',
    },
    {
      name: 'Peter Akwa',
      value,
      profession: 'Doctor',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sintcommodi consequuntur voluptatum.',
    },
    {
      name: 'Peter Akwa',
      value,
      profession: 'Doctor',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sintcommodi consequuntur voluptatum.',
    },
    {
      name: 'Peter Akwa',
      value,
      profession: 'Doctor',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sintcommodi consequuntur voluptatum.',
    },
    {
      name: 'Peter Akwa',
      value,
      profession: 'Doctor',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sintcommodi consequuntur voluptatum.',
    },
  ];
  return (
    <Container maxWidth="xl" sx={{ height: '100%', mt: 8, position: 'absolute', marginTop: 20 }}>
      <Slider {...settings} ref={slideRef}>
        {/* {testimonials.map((testimonial, index) => (
          <Testimonial key={index} {...testimonial} />
        ))} */}
        <Paper
          variant="outlined"
          component="span"
          sx={{
            height: '250px',
            width: '170px',
            background: '#FBFBFB',
            padding: '10px',
            [theme.breakpoints.down('sm')]: { flexDirection: 'column', width: '100%', marginLeft: '0px' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px',
            }}
            component="span"
          >
            <Box component="span" sx={{ marginTop: '10px' }}>
              <Rating name="read-only" value={value} readOnly size="small" />
            </Box>
            <Box component="span" sx={{ height: '5Opx', marginTop: '15px' }}>
              <Typography variant="body1" paragraph sx={{ fontSize: '13px', color: '#838383', fontWeight: '400' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint
                commodi consequuntur voluptatum.
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
              <Stack component="span" sx={{ marginTop: 1, marginLeft: '10px', marginRight: 0 }}>
                <Typography sx={{ fontsize: '5px', marginTop: '10px', fontWeight: '600' }}>Peter Akwa</Typography>
                <Typography variant="subtitle2" sx={{ color: '#079EB2', fontWeight: '400' }}>
                  Doctor
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Paper>

        <Paper
          variant="outlined"
          component="span"
          sx={{
            height: '250px',
            width: '170px',
            background: '#FBFBFB',
            padding: '10px',
            [theme.breakpoints.down('sm')]: { flexDirection: 'column', width: '100%' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px',
            }}
            component="span"
          >
            <Box component="span" sx={{ marginTop: '10px' }}>
              <Rating name="read-only" value={value} readOnly size="small" />
            </Box>
            <Box component="span" sx={{ height: '5Opx', marginTop: '15px' }}>
              <Typography variant="body1" paragraph sx={{ fontSize: '13px', color: '#838383', fontWeight: '400' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint
                commodi consequuntur voluptatum.
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
              <Stack component="span" sx={{ marginTop: 1, marginLeft: '10px', marginRight: 0 }}>
                <Typography sx={{ fontsize: '5px', marginTop: '10px', fontWeight: '600' }}>Peter Akwa</Typography>
                <Typography variant="subtitle2" sx={{ color: '#079EB2', fontWeight: '400' }}>
                  Doctor
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Paper>
        <Paper
          variant="outlined"
          component="span"
          sx={{
            height: '250px',
            width: '170px',
            background: '#FBFBFB',
            padding: '10px',
            [theme.breakpoints.down('sm')]: { flexDirection: 'column', width: '100%' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px',
            }}
            component="span"
          >
            <Box component="span" sx={{ marginTop: '10px' }}>
              <Rating name="read-only" value={value} readOnly size="small" />
            </Box>
            <Box component="span" sx={{ height: '5Opx', marginTop: '15px' }}>
              <Typography variant="body1" paragraph sx={{ fontSize: '13px', color: '#838383', fontWeight: '400' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint
                commodi consequuntur voluptatum.
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
              <Stack component="span" sx={{ marginTop: 1, marginLeft: '10px', marginRight: 0 }}>
                <Typography sx={{ fontsize: '5px', marginTop: '10px', fontWeight: '600' }}>Peter Akwa</Typography>
                <Typography variant="subtitle2" sx={{ color: '#079EB2', fontWeight: '400' }}>
                  Doctor
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Paper>
        <Paper
          variant="outlined"
          component="span"
          sx={{
            height: '250px',
            width: '170px',
            background: '#FBFBFB',
            padding: '10px',
            [theme.breakpoints.down('sm')]: { flexDirection: 'column', width: '100%' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px',
            }}
            component="span"
          >
            <Box component="span" sx={{ marginTop: '10px' }}>
              <Rating name="read-only" value={value} readOnly size="small" />
            </Box>
            <Box component="span" sx={{ height: '5Opx', marginTop: '15px' }}>
              <Typography variant="body1" paragraph sx={{ fontSize: '13px', color: '#838383', fontWeight: '400' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint
                commodi consequuntur voluptatum.
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
              <Stack component="span" sx={{ marginTop: 1, marginLeft: '10px', marginRight: 0 }}>
                <Typography sx={{ fontsize: '5px', marginTop: '10px', fontWeight: '600' }}>Peter Akwa</Typography>
                <Typography variant="subtitle2" sx={{ color: '#079EB2', fontWeight: '400' }}>
                  Doctor
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Paper>
        <Paper
          variant="outlined"
          component="span"
          sx={{
            height: '250px',
            width: '170px',
            background: '#FBFBFB',
            padding: '10px',
            [theme.breakpoints.down('sm')]: { flexDirection: 'column', width: '100%' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px',
            }}
            component="span"
          >
            <Box component="span" sx={{ marginTop: '10px' }}>
              <Rating name="read-only" value={value} readOnly size="small" />
            </Box>
            <Box component="span" sx={{ height: '5Opx', marginTop: '15px' }}>
              <Typography variant="body1" paragraph sx={{ fontSize: '13px', color: '#838383', fontWeight: '400' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint
                commodi consequuntur voluptatum.
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
              <Stack component="span" sx={{ marginTop: 1, marginLeft: '10px', marginRight: 0 }}>
                <Typography sx={{ fontsize: '5px', marginTop: '10px', fontWeight: '600' }}>Peter Akwa</Typography>
                <Typography variant="subtitle2" sx={{ color: '#079EB2', fontWeight: '400' }}>
                  Doctor
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Paper>
        <Paper
          variant="outlined"
          component="span"
          sx={{
            height: '250px',
            width: '170px',
            background: '#FBFBFB',
            padding: '10px',
            [theme.breakpoints.down('sm')]: { flexDirection: 'column', width: '100%' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px',
            }}
            component="span"
          >
            <Box component="span" sx={{ marginTop: '10px' }}>
              <Rating name="read-only" value={value} readOnly size="small" />
            </Box>
            <Box component="span" sx={{ height: '5Opx', marginTop: '15px' }}>
              <Typography variant="body1" paragraph sx={{ fontSize: '13px', color: '#838383', fontWeight: '400' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint
                commodi consequuntur voluptatum.
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
              <Stack component="span" sx={{ marginTop: 1, marginLeft: '10px', marginRight: 0 }}>
                <Typography sx={{ fontsize: '5px', marginTop: '10px', fontWeight: '600' }}>Peter Akwa</Typography>
                <Typography variant="subtitle2" sx={{ color: '#079EB2', fontWeight: '400' }}>
                  Doctor
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Paper>
      </Slider>

      <IconButton
        sx={{
          position: 'relative',
          // right: '-1rem',
          // top: '-10rem',
          right: '0.3%',
          bottom: '10rem',
          borderRadius: '50%',
          background: 'transparent',
          height: '2rem',
          width: '2rem',
          border: '1px solid #838383',
          zIndex: '1',
        }}
        onClick={() => slideRef?.current.slickPrev()}
      >
        <KeyboardArrowLeftSharpIcon />
      </IconButton>
      <IconButton
        sx={{
          position: 'relative',
          right: '-1rem',
          top: '-10rem',
          left: '74.5rem',
          borderRadius: '50%',
          background: 'transparent',
          height: '2rem',
          width: '2rem',
          border: '1px solid #838383',
          zIndex: '1',
          [theme.breakpoints.down('sm')]: { left: '78%' },
        }}
        onClick={() => slideRef?.current.slickNext()}
      >
        <KeyboardArrowRightSharpIcon />
      </IconButton>
    </Container>
  );
}

export default SliderCom;
