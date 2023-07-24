import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Select, MenuItem, Button, Grid } from '@mui/material';

const SearchBar = ({ handleSearchEvent, countries, states, artists }) => {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState('');
  const [artist, setArtist] = useState('');

  const handleSearch = () => {
    handleSearchEvent(name, country, state, artist, date);
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

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          variant="standard"
          placeholder="Event name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          InputProps={{ disableUnderline: true }}
          sx={{ background: '#F4F4F4', height: { xs: '3.5rem', md: '100%' }, p: 1 }}
        />
      </Grid>
      <Grid item xs={6} md={2}>
        <Select fullWidth value={country} onChange={handleCountryChange} displayEmpty>
          <MenuItem disabled value="">
            <em>Country</em>
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
            <em>State</em>
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
            <em>Artist</em>
          </MenuItem>
          {artists.map((a) => (
            <MenuItem value={a} key={Math.random()}>
              {a}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={6} md={2}>
        <TextField fullWidth type="date" value={date} onChange={handleDateChange} />
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
  handleSearchEvent: PropTypes.func,
  countries: PropTypes.array,
  states: PropTypes.array,
  artists: PropTypes.array,
};
export default SearchBar;
