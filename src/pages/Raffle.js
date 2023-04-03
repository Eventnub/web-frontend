import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography, Alert, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useFirebase from '../hooks/useFirebase';
import { requests } from '../api/requests';
import Page from '../components/Page';
import RaffleSuccessDialog from '../components/raffle/RaffleSuccessDialog';
import AlreadySubmittedDialog from '../components/raffle/AlreadySubmitDialog';
import logo from '../assets/blueLogo.png';

export default function Raffle() {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [dialogShown, setDialogShown] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [raffle, setRaffle] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { eventId } = useParams();
  const { user } = useFirebase();

  const handleButtonClick = (value) => {
    if (selectedButtons.includes(value)) {
      setSelectedButtons(selectedButtons.filter((v) => v !== value));
    } else if (selectedButtons.length < 5) {
      setSelectedButtons([...selectedButtons, value]);
    }
  };

  useEffect(() => {
    async function fetchRaffle() {
      try {
        setIsLoading(true);
        if (user.idToken) {
          const { data } = await requests.getEventRaffleDraw(eventId, user.idToken);
          setRaffle(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchRaffle();
  }, [user.idToken, eventId]);

  const nums = [];
  for (let i = raffle.firstNumber; i <= raffle.lastNumber; i += 1) {
    nums.push(i);
  }

  const handleOpenDialog = () => {
    setDialogShown(true);
  };

  const handleCloseDialog = () => {
    setDialogShown(false);
  };
  const handleOpenSubmittedDialog = () => {
    setShowDialog(true);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await requests.submitEventRaffleDrawChoice(eventId, user.idToken, {
        chosenNumbers: selectedButtons,
      });
      setIsSubmitting(false);
      handleOpenDialog();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setIsSubmitting(false);
        handleOpenSubmittedDialog();
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
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
            {isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                {nums.map((value) => (
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
              </>
            )}
          </Box>
          <Box sx={{ textAlign: 'center', mt: '4%' }}>
            <LoadingButton
              variant="contained"
              onClick={handleSubmit}
              loading={isSubmitting}
              disabled={selectedButtons.length !== 5}
              sx={{ background: '#1358A5', boxShadow: 'none', borderRadius: '5px', width: '20%' }}
            >
              Submit
            </LoadingButton>
          </Box>
        </Box>
        <RaffleSuccessDialog open={dialogShown} handleClose={handleCloseDialog} />
        <AlreadySubmittedDialog open={showDialog} />
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 4 }}>
            {errorMessage}
          </Alert>
        )}
      </Box>
    </Page>
  );
}
