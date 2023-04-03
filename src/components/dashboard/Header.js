import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, InputBase, Typography, IconButton, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';

import Navbar from './Navbar';

function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={6}
      sx={{
        height: { xs: 'fit-content', sm: 'fit-content', md: '25vh' },
        backgroundColor: '#fff',
        boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.25)',
        width: { xs: '100%', sm: '100%', md: '100%' },
      }}
    >
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          alignItems: { xs: 'flex-start', sm: 'flex-start', md: 'center' },
          justifyContent: { xs: 'start', sm: 'start', md: 'space-between' },
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          gap: '1rem',
          marginBottom: '1rem',
          px: '1.5rem',
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={handleClick}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="body1" sx={{ color: '#000', fontWeight: '400' }}>
            My Tickets
          </Typography>
        </Box>
        <Paper
          sx={{
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: { xs: '100%', sm: '100%', md: 400 },
            backgroundColor: '#F8F8F8',
            borderRadius: '1rem',
            border: '1px solid #C5C5C5',
          }}
        >
          <InputBase
            placeholder="Search Tickets"
            inputProps={{ 'aria-label': 'search' }}
            sx={{ marginLeft: 1, flex: 1 }}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
}

export default Header;
