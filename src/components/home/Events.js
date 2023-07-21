import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, Button, styled, Paper, CircularProgress } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  padding: '20px',
}));

const month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

export default function Events({ events, isLoading }) {
  const [shownEvents, setShownEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState(null);
  const ref = useRef(null);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = (uid) => {
    setItemId(uid);
    setOpen((prev) => !prev);
  };

  const handleLoadMoreEvents = () => {
    setShownEvents(events);
  };

  useEffect(() => {
    setShownEvents(events?.slice(0, 3));
  }, [events]);

  useEffect(() => {
    const checkClickedOutSide = (e) => {
      if (itemId != null && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', checkClickedOutSide);
    return () => {
      document.removeEventListener('click', checkClickedOutSide);
    };
  }, [itemId]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '3rem' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={5} sx={{ marginTop: '15px' }} id="nextSection">
        {shownEvents?.map((item) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={item.uid}>
            <Paper
              elevation={10}
              sx={{
                height: '410px',
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
                      objectFit: 'cover',
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
              <Box sx={{ display: 'flex', marginTop: '15px', padding: '1rem' }}>
                <Box sx={{ marginRight: '10px' }}>
                  <Typography variant="h6" sx={{ color: '#000', fontWeight: '600' }}>
                    {item.date.substring(8)}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#000', fontWeight: '600' }}>
                    {month[Number(item.date.substring(5, 7)) - 1]}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: '#000', fontWeight: '600' }}>
                    {item.name}
                  </Typography>
                  <Tooltip
                    title={item.description}
                    arrow
                    onClose={handleTooltipClose}
                    open={item.uid === itemId && open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    PopperProps={{
                      disablePortal: true,
                    }}
                  >
                    <Typography
                      paragraph
                      sx={{
                        color: '#000',
                      }}
                    >
                      {item.description.length >= 40 ? (
                        <Box>
                          {item.description.substring(0, 20)}
                          <span
                            ref={ref}
                            role="button"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleTooltipOpen(item.uid);
                            }}
                            style={{ cursor: 'pointer' }}
                            tabIndex="0"
                            onClick={() => handleTooltipOpen(item.uid)}
                          >
                            ...
                          </span>
                        </Box>
                      ) : (
                        item.description
                      )}
                    </Typography>
                  </Tooltip>
                </Box>
              </Box>
              <Box
                sx={{
                  p: '1rem',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  mt: '.8rem',
                }}
              >
                <Button
                  fullWidth
                  size="large"
                  variant="outlined"
                  component={StyledLink}
                  to={`/event-details/${item.uid}#ticketSection`}
                  sx={{ mb: '0.8em', alignItems: 'center' }}
                >
                  Explore Available Tickets
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {events?.length > shownEvents?.length && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50px',
          }}
        >
          <Button
            variant="contained"
            disableElevation
            onClick={handleLoadMoreEvents}
            sx={{
              px: '3rem',
              bgcolor: 'grey.600',
              border: '1px solid #fff',
              '&:hover': {
                color: 'grey.600',
                bgcolor: '#fff',
                border: '1px solid #637381',
              },
            }}
          >
            Load More Events
          </Button>
        </Box>
      )}
    </>
  );
}

Events.propTypes = {
  events: PropTypes.array,
  isLoading: PropTypes.bool,
};
