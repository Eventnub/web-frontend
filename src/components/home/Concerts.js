import React, { useState, useEffect } from 'react';
import { Box, Stack, Container, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Refresh';
import SearchBar from './SearchBar';
import ConditionalPopup from './ConditionalPopup';
import Events from './Events';
import { requests } from '../../api/requests';

export default function Concerts() {
  const [events, setEvents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredEvent, setFilteredEvent] = useState([]);
  const [isFromAdvert, setIsfromAdvert] = useState(false);
  const [didReset, setDidReset] = useState(false);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const { data } = await requests.getEvents();
      setEvents(data);
      setFilteredEvent(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchEvent = (name, country, state, artist) => {
    let fEventByName = [];
    let fEventByCountry = [];
    let fEventByState = [];
    let fEventByArtist = [];

    if (!name && !country && !state && !artist) {
      return;
    }

    if (name) {
      fEventByName = events.filter((event) => event.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
    }
    if (country) {
      fEventByCountry = events.filter((event) => event.country.toLowerCase().indexOf(country.toLowerCase()) !== -1);
    }
    if (state) {
      fEventByState = events.filter((event) => event.state.toLowerCase().indexOf(state.toLowerCase()) !== -1);
    }
    if (artist) {
      fEventByArtist = events.filter((event) => event.artists.includes(artist));
    }

    const fEvent = [...new Set([...fEventByCountry, ...fEventByName, ...fEventByState, ...fEventByArtist])];
    setFilteredEvent(fEvent);
    setDidReset(false);
  };

  const handleRedirectFromAdvert = () => {
    let isRedirectFromAdvert;
    const queryString = window.location.search;

    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      isRedirectFromAdvert = urlParams.get('redirect_from_advert');
    }

    if (isRedirectFromAdvert === 'true') {
      setIsfromAdvert(true);
    }
  };

  const handleReset = () => {
    setFilteredEvent(events);
    setDidReset(true);
  };

  useEffect(() => {
    handleRedirectFromAdvert();
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
        <Stack direction="row" spacing={1} alignItems={'center'}>
          <Typography
            sx={{
              color: '#000000',
              fontWeight: '600px',
              fontSize: { xs: '1.3rem', md: '1.5rem' },
              lineHeight: '38.7px',
            }}
          >
            Up Coming Events
          </Typography>
          <IconButton onClick={handleReset} sx={{ bgcolor: 'grey.300', width: '1.7rem', height: '1.7rem' }}>
            <MenuIcon sx={{ color: 'grey.700', width: '1.1rem', height: '1.1rem' }} />
          </IconButton>
        </Stack>
        <Box sx={{ flex: 1 }}>
          <SearchBar
            didReset={didReset}
            handleSearchEvent={handleSearchEvent}
            countries={countries}
            states={states}
            artists={artists}
          />
        </Box>
      </Box>
      <Events events={filteredEvent} isLoading={isLoading} />

      <ConditionalPopup open={isFromAdvert} handleClose={() => setIsfromAdvert(false)} />
    </Container>
  );
}
