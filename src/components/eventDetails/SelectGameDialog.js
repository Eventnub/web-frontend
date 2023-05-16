import { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, Button, Typography, Divider, Stack } from '@mui/material';
import quizIcon from '../../assets/quiz-icon.png';
import raffleIcon from '../../assets/raffle-icon.png';
import SelectPaymentOptionDialog from './SelectPaymentOptionDialog';

export default function SelectGameDialog({ open, handleClose, extraPaymentData }) {
  const [dialogShown, setDialogShown] = useState(false);
  const [gameType, setGameType] = useState('');

  const handleOpenDialog = (game) => {
    setGameType(game);
    setDialogShown(true);
  };

  const handleCloseDialog = () => {
    setDialogShown(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth="true"
        maxWidth="md"
        PaperProps={{
          sx: {
            background: '#fff',
          },
        }}
      >
        <DialogTitle>
          <Typography sx={{ color: '#000', fontWeight: '700', fontSize: '1.3rem' }}>
            Select a game to continue
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#6B6B6B', fontWeight: '400', fontSize: '1.1rem' }}>
            Win a free ticket to attend this event by playing any of the available games below
          </Typography>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mt="2rem">
            <Stack
              sx={{
                flex: 1,
                background: '#F4FEFF',
                boxShadow: '0px 2px 35px 1px rgba(0, 0, 0, 0.25)',
                height: '245px',
              }}
            >
              <Stack sx={{ height: '20%', width: '100%', p: '1rem', alignItems: 'center' }} direction="row" spacing={2}>
                <img src={quizIcon} alt="quiz" />
                <Typography sx={{ fontSize: '1rem', fontWeight: '400', color: '#000' }}>Quiz</Typography>
              </Stack>
              <Divider />
              <Stack
                sx={{
                  p: '1rem',
                  height: '80%',
                }}
                justifyContent="space-between"
              >
                <Typography sx={{ color: '#6B6B6B', fontSize: '.9rem', fontWeight: '400' }}>
                  Win a free ticket to attend the event by taking a quiz to prove how well you know the featured
                  artists, and how well you can get the song lyrics.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleOpenDialog('quiz and music match')}
                  sx={{
                    boxShadow: 'none',
                    background: '#1358A5',
                    borderRadius: '360px',
                    alignSelf: 'flex-start',
                    mt: 2,
                  }}
                >
                  Play Game
                </Button>
              </Stack>
            </Stack>
            <Stack
              sx={{
                flex: 1,
                background: '#F4FEFF',
                boxShadow: '0px 2px 35px 1px rgba(0, 0, 0, 0.25)',
                height: '245px',
              }}
            >
              <Stack sx={{ height: '20%', width: '100%', p: '1rem', alignItems: 'center' }} direction="row" spacing={2}>
                <img src={raffleIcon} alt="quiz" />
                <Typography sx={{ fontSize: '1rem', fontWeight: '400', color: '#000' }}>Raffle Draw</Typography>
              </Stack>
              <Divider />
              <Stack
                sx={{
                  p: '1rem',
                  height: '80%',
                }}
                justifyContent="space-between"
              >
                <Typography sx={{ color: '#6B6B6B', fontSize: '.9rem', fontWeight: '400' }}>
                  Win a free ticket to attend this event by winning a raffle draw. Pick 5 numbers and get the ticket
                  when 3 out of the chosen 5 matches with any of our lucky 5.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleOpenDialog('raffle draw')}
                  sx={{
                    boxShadow: 'none',
                    background: '#1358A5',
                    borderRadius: '360px',
                    alignSelf: 'flex-start',
                    mt: 2,
                  }}
                >
                  Play Game
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
      <SelectPaymentOptionDialog
        open={dialogShown}
        handleClose={handleCloseDialog}
        extraPaymentData={{ ...extraPaymentData, objective: gameType }}
      />
    </>
  );
}

SelectGameDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  extraPaymentData: PropTypes.object,
};
