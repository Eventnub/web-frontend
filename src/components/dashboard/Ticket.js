import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import moment from 'moment';
import PropTypes from 'prop-types';
import bg from '../../assets/bg.jpg';

function Tickets({ tickets, isLoading }) {
  return (
    <>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '3rem' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {tickets.map((ticket) => (
            <Box sx={{ height: '282px', width: '571px', display: 'flex', flexDirection: 'column' }} key={Math.random()}>
              <Box sx={{ height: '90%' }}>
                <Box
                  sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    borderRadius: '20px',
                  }}
                >
                  <Box
                    sx={{
                      width: '30%',
                      backgroundColor: '#000',
                      display: { xs: 'none', sm: 'flex', md: 'flex' },
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      color: '#fff',
                      padding: '0.8rem',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '.3rem' }}>
                      <Typography sx={{ color: '#fff', fontWeight: '400', fontSize: '0.9rem', lineHeight: '1.2rem' }}>
                        {ticket.event.name}
                      </Typography>
                      <Typography sx={{ color: '#FF6C2C', fontWeight: '400', fontSize: '.8rem', lineHeight: '.9rem' }}>
                        By {ticket.event.host}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ color: '#fff', fontSize: '.8rem', fontWeight: '400' }}>
                        $<span style={{ fontSize: '1.5rem', fontWeight: '600' }}>{ticket.ticket.price}</span>
                      </Typography>
                      <Typography sx={{ color: '#fff', fontSize: '.7rem', fontWeight: '400', maxWidth: '68px' }}>
                        {ticket.ticket.type}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: { xs: '100%', sm: '', md: '70%' },
                      borderLeft: '3px dotted white',
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) ,url(${bg})`,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.69)',
                      display: 'flex',
                      flexDirection: 'column',
                      py: '0.8rem',
                      pl: '1.2rem',
                      pr: '2rem',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography
                          sx={{
                            maxWidth: '155px',
                            color: '#fff',
                            fontSize: '1rem',
                            fontWeight: '600',
                            lineHeight: '1.5rem',
                          }}
                        >
                          {ticket.event.name}
                        </Typography>
                        <Typography
                          sx={{ color: '#FF6C2C', fontWeight: '600', fontSize: '.8rem', lineHeight: '.9rem' }}
                        >
                          By {ticket.event.host}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ color: '#fff', fontSize: '.8rem', fontWeight: '400' }}>
                          $<span style={{ fontSize: '1.5rem', fontWeight: '600' }}>{ticket.ticket.price}</span>
                        </Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ color: '#fff', fontSize: '1rem', fontWeight: '600', lineHeight: '1.5rem' }}>
                      {ticket.ticket.type}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: '.75rem', color: '#FF6C2C' }}>Date</Typography>
                        <Typography sx={{ color: '#fff', fontSize: '.82rem', fontWeight: '600' }}>
                          {moment(ticket.event.date).format('Do MMM YYYY').toUpperCase()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: '.75rem', color: '#FF6C2C' }}>Time</Typography>
                        <Typography sx={{ color: '#fff', fontSize: '.82rem', fontWeight: '600' }}>
                          {moment(ticket.event.time, 'HH:mm').format('h:mm A')}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <LocationOnOutlinedIcon sx={{ color: '#ff6c2c' }} />
                      <Typography sx={{ color: '#fff', fontSize: '0.82rem', fontWeight: '200' }}>
                        {`${ticket.event.venue}, ${ticket.event.state}, ${ticket.event.country}`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  height: '10%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mt: '.5rem',
                  gap: '.7rem',
                }}
              >
                <Box
                  sx={{
                    width: { xs: '38%', sm: '', md: '24%' },
                    height: '100%',
                    backgroundColor: '#FF6C2C',
                    borderRadius: '5px',
                    p: '.4% 1%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '.3rem',
                  }}
                >
                  <CardGiftcardOutlinedIcon sx={{ color: '#fff' }} />
                  <Typography sx={{ color: '#fff', fontSize: '.7rem' }}>Gift to a friend</Typography>
                </Box>
                <Box
                  sx={{
                    width: { xs: '20%', md: '12%' },
                    height: '100%',
                    backgroundColor: '#FF6C2C',
                    borderRadius: '5px',
                    p: '.4% 1%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '.3rem',
                  }}
                >
                  <LocalPrintshopOutlinedIcon sx={{ color: '#fff' }} />
                  <Typography sx={{ color: '#fff', fontSize: '.7rem' }}>Print</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </>
      )}
    </>
  );
}

export default Tickets;

Tickets.propTypes = {
  tickets: PropTypes.array,
  isLoading: PropTypes.bool,
};
