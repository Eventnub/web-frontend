import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Page from '../components/Page';
import RaffleSuccessDialog from '../components/raffle/RaffleSuccessDialog';
import logo from '../assets/blueLogo.png';

export default function Raffle() {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [dialogShown, setDialogShown] = useState(false);
  const num = Array.from({ length: 50 }, (_, index) => index + 1);
  const handleButtonClick = (value) => {
    if (selectedButtons.includes(value)) {
      setSelectedButtons(selectedButtons.filter((v) => v !== value));
    } else if (selectedButtons.length < 5) {
      setSelectedButtons([...selectedButtons, value]);
    }
  };

  const handleOpenDialog = () => {
    setDialogShown(true);
  };

  const handleCloseDialog = () => {
    setDialogShown(false);
  };

  const handleSubmit = () => {
    console.log(selectedButtons);
    handleOpenDialog();

    // Here you can submit the values to the server or perform any other actions
  };
  return (
    <Page title="Raffle">
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
        <Box sx={{ mt: '3%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={logo} alt="logo" style={{ width: '44px', height: '44px' }} />
          <Typography sx={{ fontWeight: '600', letterSpacing: '.3rem', fontSize: '1.3rem', color: '#1358A5' }}>
            eventnub
          </Typography>
        </Box>
        <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '1.2rem', textAlign: 'center', mt: '1%' }}>
          Pick 5 random numbers and stand a chance to win your free ticket
        </Typography>
        <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '1.2rem', textAlign: 'center' }}>
          when two out of the 5 numbers matches with a random selection
        </Typography>
        <Box sx={{ height: '75%', width: '100%', px: { xs: '5%', sm: '10%', md: '18%' } }}>
          <Box sx={{ height: '100%', width: '100%', display: 'flex', flexWrap: 'wrap', gap: '1rem', mt: '2%' }}>
            {num.map((value) => (
              <Button
                key={value}
                variant="outlined"
                disabled={selectedButtons.length === 5 && !selectedButtons.includes(value)}
                onClick={() => handleButtonClick(value)}
                sx={{
                  borderRadius: '50%',
                  width: '64px',
                  height: '64px',
                  boxShadow: 'none',
                  color: '#000',
                  background: selectedButtons.includes(value) ? 'grey' : '#fff',
                  border: '1px solid #8F8F8F',
                }}
              >
                {value}
              </Button>
            ))}
          </Box>
          <Box sx={{ textAlign: 'center', mt: '4%' }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={selectedButtons.length !== 5}
              sx={{ background: '#1358A5', boxShadow: 'none', borderRadius: '5px', width: '20%' }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <RaffleSuccessDialog open={dialogShown} handleClose={handleCloseDialog} />
      </Box>
    </Page>
  );
}
