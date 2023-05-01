import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import SearchBar from './SearchBar';
import Events from './Events';
import { requests } from '../../api/requests';

export default function Concerts() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredEvent, setFilteredEvent] = useState([]);
  const theme = useTheme();

  const handleSearchEvent = (name, country, state) => {
    if (name) {
      const fEvent = events.filter((event) => event.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
      setFilteredEvent(fEvent);
    }
    if (country) {
      const fEvent = filteredEvent.filter((event) => event.country.toLowerCase().indexOf(country.toLowerCase()) !== -1);
      setFilteredEvent(fEvent);
    }
    if (state) {
      const fEvent = filteredEvent.filter((event) => event.state.toLowerCase().indexOf(state.toLowerCase()) !== -1);
      setFilteredEvent(fEvent);
    }
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        const { data } = await requests.getEvents();
        setEvents(data);
        setFilteredEvent(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <Box>
      <Container>
        <Box
          sx={{
            display: 'flex',
            marginTop: '3em',
            justifyContent: 'space-between',
            gap: '2.5rem',
            [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
          }}
        >
          <Typography
            sx={{
              color: '#000000',
              fontWeight: '600px',
              fontSize: '36px',
              lineHeight: '38.7px',
              [theme.breakpoints.down('sm')]: { fontSize: 16, width: '100', textAlign: 'center' },
            }}
          >
            Up Coming Events
          </Typography>
          <Box sx={{ flex: 1 }}>
            <SearchBar handleSearchEvent={handleSearchEvent} />
          </Box>
        </Box>
        <Events events={filteredEvent} isLoading={isLoading} />
      </Container>
    </Box>
  );
}
