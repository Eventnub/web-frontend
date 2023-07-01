import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, Button, Typography, Box } from '@mui/material';

export default function MusicMatchInfoDialog({ open, handleClose, onGameStarted }) {
  const handleStartGame = () => {
    onGameStarted();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      PaperProps={{
        sx: {
          background: '#fff',
          boxShadow: '0px 0px 9px 1px rgba(0, 0, 0, 0.25)',
          borderRadius: '7px',
        },
      }}
    >
      <DialogTitle>
        <Typography sx={{ color: '#000', fontWeight: '600', fontSize: '1.3rem' }}>Music Match</Typography>
        <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '1rem' }}>
          Welcome to the second section of the game
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: '#6B6B6B', fontSize: '1rem', fontWeight: '300', textAlign: 'justify' }}>
          You will be required to prove how well you know a song by the event artiste, by singing along the song beat
          provided.
        </Typography>
        <Typography sx={{ color: '#6B6B6B', fontSize: '1rem', fontWeight: '300', mt: '.5rem', textAlign: 'justify' }}>
          Win the game by getting at least 80% of the lyrics correct in 8 minutes.
        </Typography>
        <Box sx={{ mt: '8%', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleStartGame}
            sx={{
              background: '#1358A5',
              color: '#fff',
              boxShadow: 'none',
              borderRadius: '5px',
              px: '2rem',
            }}
          >
            Start Game
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

MusicMatchInfoDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  onGameStarted: PropTypes.func,
};
