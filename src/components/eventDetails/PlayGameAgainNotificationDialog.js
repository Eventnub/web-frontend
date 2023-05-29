import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, Button, Typography, DialogActions } from '@mui/material';
import infoIcon from '../../assets/information-outline.png';

export default function PlayGameAgainNotificationDialog({ open, handleClose, handleCancel, handleContinue }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      PaperProps={{
        sx: {
          background: '#fff',
          boxShadow: '0px, 0px rgba(0, 0, 0, 0.25)',
          borderRadius: '7px',
        },
      }}
    >
      <DialogTitle>
        <img src={infoIcon} alt="info" />
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: '#000', fontSize: '1rem', fontWeight: '400' }}>
          You have participated in the game, are you sure you want to play again?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleContinue}>Continue</Button>
      </DialogActions>
    </Dialog>
  );
}

PlayGameAgainNotificationDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleCancel: PropTypes.func,
  handleContinue: PropTypes.func,
};
