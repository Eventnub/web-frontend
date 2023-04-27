import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Select, MenuItem, Button, useTheme, Box } from '@mui/material';

const SearchBar = ({ handleSearchEvent }) => {
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
    <Box
      sx={{
        display: 'flex',
        // justifyContents: 'space-between',
        alignItems: 'center',
        border: '2px solid #F4F4F4',
        height: '100%',
        width: '100%',
        borderRadius: '5px',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          width: '100%',
        },
      }}
    >
      <Box
        sx={{
          width: '40%',
          border: '1px solid #F4F4F4',
          height: '100%',
          background: '#F4F4F4',
          paddingLeft: '10px',
          marginRight: '10px',
          display: 'flex',
          alignItems: 'center',
          [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '100%',
            marginRight: 0,
          },
        }}
      >
        <TextField
          placeholder="Event Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          variant="standard"
          InputProps={{ disableUnderline: true }}
          sx={{
            marginRight: '16px',
            outline: 'none',
            background: '#F4F4F4',
            height: '100%',
            width: '100%',
            padding: '10px',
            [theme.breakpoints.down('sm')]: {
              width: '100%',
              height: '100%',
            },
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          gap: '.5rem',
          py: '.5rem',
          [theme.breakpoints.down('sm')]: {
            marginTop: '10px',
            flexWrap: 'wrap',
            gap: '1rem',
          },
        }}
      >
        <Select value={country} onChange={handleCountryChange} displayEmpty style={{ height: '100%' }}>
          <MenuItem value="">Country</MenuItem>
          <MenuItem value={10}>Option 1</MenuItem>
          <MenuItem value={20}>Option 2</MenuItem>
        </Select>
        <Select value={state} onChange={handleStateChange} displayEmpty style={{ height: '100%' }}>
          <MenuItem value="">State</MenuItem>
          <MenuItem value={10}>Option 1</MenuItem>
          <MenuItem value={20}>Option 2</MenuItem>
        </Select>
        <Select value={artist} onChange={handleArtistChange} displayEmpty style={{ height: '100%' }}>
          <MenuItem value="">Artist</MenuItem>
          <MenuItem value={10}>Option 1</MenuItem>
          <MenuItem value={20}>Option 2</MenuItem>
        </Select>
        {/* <Select value={date} onChange={handleDateChange} displayEmpty style={{ marginRight: '10px', height: '40px' }}>
          <MenuItem value="">Date</MenuItem>
          <MenuItem value={10}>Option 1</MenuItem>
          <MenuItem value={20}>Option 2</MenuItem>
        </Select> */}
        <TextField type="date" value={date} onChange={handleDateChange} style={{ height: '100%' }} />
        <Button
          variant="contained"
          disableElevation
          onClick={handleSearch}
          sx={{
            width: '30%',
            height: '100%',
            background: '#FF6C2C',
            boxShadow: 'none',
            borderRadius: '20px',
            marginRight: '5px',
            '&:hover': {
              backgroundColor: '#CC5A27',
              boxShadow: 'none',
            },
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

SearchBar.propTypes = {
  handleSearchEvent: PropTypes.func,
};
export default SearchBar;
