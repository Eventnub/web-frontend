import React from 'react';
import { Box, useTheme } from '@mui/material';
import Navbar from '../../components/myEvents/Navbar';
import Page from '../../components/Page';
import Footer from '../../components/home/Footer';
import Sidebar from '../../components/myEvents/Sidebar';
import Events from '../../components/myEvents/Events';

export default function MyEventsPage() {
  const theme = useTheme();
  return (
    <Page title="My Events">
      <Box>
        <Navbar />
        <Box sx={{ px: '2.2rem', mb: '2rem' }}>
          <Box sx={{ mt: '1.7rem', display: 'flex', gap: '2rem' }}>
            <Box
              sx={{
                borderRadius: '10px',
                flex: 0.8,
                height: '86vh',
                background: '#EDF5F6',
                px: '1.5rem',
                py: '1.5rem',
                [theme.breakpoints.down('sm')]: { display: 'none' },
              }}
            >
              <Sidebar />
            </Box>
            <Box sx={{ flex: '4', display: 'flex', flexDirection: 'column', height: 'auto' }}>
              <Events />
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Page>
  );
}
