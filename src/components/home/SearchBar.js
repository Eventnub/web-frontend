import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Select, MenuItem, Button, Grid, styled } from '@mui/material';

const Cem = styled('em')(() => ({
  color: '#919EAB',
  fontStyle: 'normal',
  fontSize: '0.9rem',
}));

const SearchBar = ({ didReset, handleSearchEvent, countries, states, artists }) => {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState('');
  const [artist, setArtist] = useState('');

  const handleSearch = () => {
    handleSearchEvent(name, country, state, artist, date);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleArtistChange = (event) => {
    setArtist(event.target.value);
  };

  useEffect(() => {
    if (didReset) {
      setName('');
      setState('');
      setCountry('');
      setArtist('');
      setDate('');
    }
  }, [didReset]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          placeholder="Event Name"
          value={name}
          onChange={handleNameChange}
          InputProps={{
            disableUnderline: true,
          }}
        />
      </Grid>
      <Grid item xs={6} md={2}>
        <Select fullWidth value={country} onChange={handleCountryChange} displayEmpty>
          <MenuItem disabled value="">
            <Cem>Country</Cem>
          </MenuItem>
          {countries.map((c) => (
            <MenuItem value={c} key={Math.random()}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={6} md={2}>
        <Select fullWidth value={state} onChange={handleStateChange} displayEmpty>
          <MenuItem disabled value="">
            <Cem>State</Cem>
          </MenuItem>
          {states.map((s) => (
            <MenuItem value={s} key={Math.random()}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={6} md={2}>
        <Select fullWidth value={artist} onChange={handleArtistChange} displayEmpty>
          <MenuItem disabled value="">
            <Cem>Artist</Cem>
          </MenuItem>
          {artists.map((a) => (
            <MenuItem value={a} key={Math.random()}>
              {a}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={6} md={2}>
        <TextField
          fullWidth
          type="text"
          value={date}
          placeholder="Date"
          onChange={handleDateChange}
          onMouseOver={(e) => (e.target.type = 'date')}
          onMouseOut={(e) => (e.target.type = 'text')}
          onFocus={(e) => (e.target.type = 'date')}
          onBlur={(e) => (e.target.type = 'text')}
        />
      </Grid>
      <Grid item xs={12} md={1}>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          onClick={handleSearch}
          sx={{
            background: '#FF6C2C',
            boxShadow: 'none',
            borderRadius: '15px',
            height: { xs: '4rem', md: '100%' },
            '&:hover': {
              backgroundColor: '#CC5A27',
              boxShadow: 'none',
            },
          }}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

SearchBar.propTypes = {
  didReset: PropTypes.bool,
  handleSearchEvent: PropTypes.func,
  countries: PropTypes.array,
  states: PropTypes.array,
  artists: PropTypes.array,
};
export default SearchBar;
