import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import SearchBar from './SearchBar';
import Events from './Events';

export default function Concerts() {
  const theme = useTheme();

  return (
    <Box>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            marginTop: '3em',
            justifyContent: 'space-between',
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
            Up Coming Concerts
          </Typography>
          <Box sx={{ flex: '0.6' }}>
            <SearchBar />
          </Box>
        </Box>
        <Events />
      </Container>
    </Box>
  );
}
