import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import Events from './Events';
import { requests } from '../../api/requests';

export default function Concerts() {
  const [events, setEvents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredEvent, setFilteredEvent] = useState([]);

  const handleSearchEvent = (name, country, state, artist) => {
    let fEventByName = [];
    let fEventByCountry = [];
    let fEventByState = [];
    let fEventByArtist = [];
    if (name) {
      fEventByName = events.filter((event) => event.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
    }
    if (country) {
      fEventByCountry = filteredEvent.filter(
        (event) => event.country.toLowerCase().indexOf(country.toLowerCase()) !== -1
      );
    }
    if (state) {
      fEventByState = filteredEvent.filter((event) => event.state.toLowerCase().indexOf(state.toLowerCase()) !== -1);
    }
    if (artist) {
      fEventByArtist = filteredEvent.filter((event) => event.artists.includes(artist));
    }

    const fEvent = [...new Set([...fEventByCountry, ...fEventByName, ...fEventByState, ...fEventByArtist])];
    setFilteredEvent(fEvent);
    console.log({ fEvent });
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

  useEffect(() => {
    let countries = [];
    let states = [];
    let artists = [];
    events.forEach((event) => {
      countries.push(event.country);
      states.push(event.state);
      artists.push(...event.artists);
    });
    countries = [...new Set(countries)];
    states = [...new Set(states)];
    artists = [...new Set(artists)];
    setCountries(countries);
    setStates(states);
    setArtists(artists);
  }, [events]);

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          marginTop: '3em',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2.5rem',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Typography
          sx={{
            color: '#000000',
            fontWeight: '600px',
            fontSize: { xs: '1.3rem', md: '1.5rem' },
            lineHeight: '38.7px',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Up Coming Events
        </Typography>
        <Box sx={{ flex: 1 }}>
          <SearchBar handleSearchEvent={handleSearchEvent} countries={countries} states={states} artists={artists} />
        </Box>
      </Box>
      <Events events={filteredEvent} isLoading={isLoading} />
    </Container>
  );
}
