import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { Box, Dialog, DialogTitle, DialogContent, Button, Typography, styled, useTheme } from '@mui/material';

export default function SuccessDialog({ open, handleClose }) {
  const theme = useTheme();
  const StyledButton = styled(Button)({
    variant: 'outlined',
    border: '1px solid #FF6C2C',
    borderRadius: '10px',
    width: '100%',
    color: '#FF6C2C',
  });
  const { eventId } = useParams();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          background: '#fff',
          height: '35%',
          width: '20%',
          boxShadow: '0px 0px 9px 1px rgba(0, 0, 0, 0.25)',
          borderRadius: '7px',
          [theme.breakpoints.down('sm')]: { width: '80%', height: '30%' },
        },
      }}
    >
      <DialogTitle>
        <Typography sx={{ textAlign: 'center', color: '#000', fontWeight: '400', fontSize: '1rem' }}>
          Select an option to continue
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '.8rem', mt: '3%' }}>
          <StyledButton component={Link} to={`/quiz/${eventId}`}>
            Join quiz
          </StyledButton>
          <StyledButton component={Link} to={`/raffle/${eventId}`}>
            Play raffle draw
          </StyledButton>
          <StyledButton component={Link} to={`/beat-game-activated/${eventId}`}>
            Play Name the game beat
          </StyledButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

SuccessDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
