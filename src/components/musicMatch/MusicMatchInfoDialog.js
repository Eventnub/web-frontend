import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, Button, Typography, Box } from '@mui/material';

export default function SuccessDialog({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      PaperProps={{
        sx: {
          background: '#fff',
          // height: '50%',
          // width: '25%',
          boxShadow: '0px 0px 9px 1px rgba(0, 0, 0, 0.25)',
          borderRadius: '7px',
          // [theme.breakpoints.down('sm')]: { width: '80%', height: '30%' },
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
        <Typography sx={{ color: '#6B6B6B', fontSize: '1rem', fontWeight: '300' }}>
          You will be required to proof how well you know the song “title by artist”, by singing along the song beat
          provided.
        </Typography>
        <Typography sx={{ color: '#6B6B6B', fontSize: '1rem', fontWeight: '300', mt: '.5rem' }}>
          Win the game by getting at least 80% of the lyrics correct in 60 seconds.
        </Typography>
        <Box sx={{ mt: '8%', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{ background: '#1358A5', color: '#fff', boxShadow: 'none', borderRadius: '5px', width: '60%' }}
          >
            Okay, Start Game
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

SuccessDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
