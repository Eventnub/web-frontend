import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Select, MenuItem, Button, useTheme, Stack } from '@mui/material';

const SearchBar = ({ handleSearchEvent, countries, states, artists }) => {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState('');
  const [artist, setArtist] = useState('');
  const theme = useTheme();

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
    <Stack
      sx={{
        // display: 'flex',
        // alignItems: 'center',
        border: '2px solid #F4F4F4',
        height: '100%',
        width: '100%',
        borderRadius: '5px',
        flexWrap: 'wrap',
        gap: '.8rem',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'row',
          width: '100%',
        },
      }}
      spacing={1}
      direction="row"
    >
      <TextField
        placeholder="Event Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        variant="standard"
        InputProps={{ disableUnderline: true }}
        sx={{
          outline: 'none',
          background: '#F4F4F4',
          width: '200px',
          maxWidth: '100%',
          padding: '10px',
          margin: '10px',
          [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '100%',
          },
        }}
      />

      <Select value={country} onChange={handleCountryChange} displayEmpty sx={{ margin: '10px' }}>
        <MenuItem value="">Country</MenuItem>
        {countries.map((c) => (
          <MenuItem value={c} key={Math.random()}>
            {c}
          </MenuItem>
        ))}
      </Select>
      <Select value={state} onChange={handleStateChange} displayEmpty sx={{ margin: '10px' }}>
        <MenuItem value="">State</MenuItem>
        {states.map((s) => (
          <MenuItem value={s} key={Math.random()}>
            {s}
          </MenuItem>
        ))}
      </Select>
      <Select value={artist} onChange={handleArtistChange} displayEmpty sx={{ margin: '10px' }}>
        <MenuItem value="">Artist</MenuItem>
        {artists.map((a) => (
          <MenuItem value={a} key={Math.random()}>
            {a}
          </MenuItem>
        ))}
      </Select>
      <TextField type="date" onChange={handleDateChange} sx={{ margin: '10px' }} />

      <Button
        variant="contained"
        disableElevation
        onClick={handleSearch}
        sx={{
          background: '#FF6C2C',
          boxShadow: 'none',
          borderRadius: '20px',
          m: '10px',
          '&:hover': {
            backgroundColor: '#CC5A27',
            boxShadow: 'none',
          },
        }}
      >
        Search
      </Button>
    </Stack>
  );
};

SearchBar.propTypes = {
  handleSearchEvent: PropTypes.func,
  countries: PropTypes.array,
  states: PropTypes.array,
  artists: PropTypes.array,
};
export default SearchBar;
