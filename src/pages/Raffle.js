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
import mixpanel from '../utils/mixpanel';
import GoogleAnalytics from '../utils/googleAnalytics';

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
  const paymentId = localStorage.getItem('paymentId');

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
        paymentId,
        chosenNumbers: selectedButtons,
      });

      mixpanel.track('Game played', {
        gameType: 'Raffle Draw',
        userEmail: user.email,
      });

      GoogleAnalytics.trackEvent('Game played', {
        gameType: 'Raffle Draw',
        userEmail: user.email,
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
          <img src={logo} alt="logo" style={{ width: '60px', height: '60px' }} />
          <Typography sx={{ fontWeight: '600', letterSpacing: '0.1rem', fontSize: '1.4rem', color: '#1358A5' }}>
            eventnub
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', my: '1rem', px: '1rem' }}>
          <Typography
            sx={{
              color: '#000',
              fontWeight: '400',
              fontSize: { xs: '1rem', md: '1.2rem' },
              textAlign: 'center',
              maxWidth: '600px',
            }}
          >
            Pick 5 random numbers and stand a chance to win your free ticket when two out of the 5 numbers matches with
            a random selection
          </Typography>
        </Box>
        <Box sx={{ height: '75%', width: '100%', px: { xs: '5%', sm: '10%', md: '18%' } }}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              my: '2rem',
            }}
          >
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
          <Box sx={{ textAlign: 'center' }}>
            <LoadingButton
              variant="contained"
              onClick={handleSubmit}
              loading={isSubmitting}
              disabled={selectedButtons.length !== 5}
              sx={{ background: '#1358A5', boxShadow: 'none', borderRadius: '5px', px: '2rem' }}
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
