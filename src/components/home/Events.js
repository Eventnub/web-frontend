import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Button, styled, Paper, IconButton, CircularProgress } from '@mui/material';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import { requests } from '../../api/requests';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        const { data } = await requests.getEvents();
        setEvents(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEvents();
  }, []);
  const displayData = events?.slice(0, 5);

  const StyledLink = styled(Link)(() => ({
    textDecoration: 'none',
    padding: '20px',
  }));
  const month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  return (
    <>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={5} sx={{ marginTop: '15px' }} id="nextSection">
            {displayData.map((item) => (
              <Grid item sm={12} md={4} lg={4} key={item.uid}>
                <Paper
                  elevation={10}
                  sx={{
                    height: '392px',
                    width: '366px',
                    background: '#fff',
                    borderRadius: '8px',
                    position: 'relative',
                  }}
                >
                  <Box sx={{ width: '100%', height: '213px' }}>
                    <Link to={`/event-details/${item.uid}`}>
                      <img
                        style={{
                          borderTopLeftRadius: '8px',
                          width: '100%',
                          borderTopRightRadius: '8px',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                        src={item.photoUrl}
                        alt={item.name}
                      />
                    </Link>
                  </Box>

                  <Box
                    sx={{
                      background: '#fff',
                      width: '16%',
                      height: '7%',
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      borderRadius: '5px',
                      padding: '0.3em',
                      textAlign: 'center',
                      fontSize: '.75rem',
                      color: '#000000',
                      fontWeight: '600',
                    }}
                  >
                    {item.type}
                  </Box>
                  <Box
                    sx={{
                      background: 'rgba(255, 255, 255, 0.72)',
                      width: '16%',
                      height: '7%',
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      borderRadius: '5px',
                      padding: '0.3em',
                      fontSize: '10px',
                      color: '#000000',
                      fontWeight: '400',
                      border: '1px solid #FF6C2C',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '.3rem',
                    }}
                  >
                    <IconButton sx={{ width: '22px', height: '20px' }}>
                      <ThumbUpOffAltOutlinedIcon sx={{ color: '#FF6C2C', width: '22px', height: '20px' }} />
                    </IconButton>
                    <Typography sx={{ color: '#FF6C2C', fontsize: '1rem', fontWeight: '600' }}>3k</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', marginTop: '15px', padding: '10px' }}>
                    <Box sx={{ marginRight: '10px' }}>
                      <Typography variant="h6" sx={{ color: '#000' }}>
                        {item.date.substring(0, 2)}
                      </Typography>
                      <Typography variant="h6" sx={{ color: '#000' }}>
                        {month[Number(item.date.substring(3, 5)) - 1]}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ color: '#000' }}>
                        {item.name}
                      </Typography>
                      <Typography paragraph sx={{ color: '#000' }}>
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                  <StyledLink to={`/event-details/${item.uid}#tickets`}>
                    <Button variant="outlined" sx={{ width: '80%', mb: '0.8em', alignItems: 'center' }}>
                      Explore Available Tickets
                    </Button>
                  </StyledLink>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
        <Button
          variant="contained"
          disableElevation
          sx={{ background: 'rgba(19, 88, 165, 0.06)', color: 'black', borderRadius: '10px', boxShadow: 'none' }}
          // onClick={handleLoadMore}
        >
          Load More Events
        </Button>
      </Box>
    </>
  );
}
