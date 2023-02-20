import PropTypes from 'prop-types';
import { Box, Dialog, DialogContent, DialogContentText } from '@mui/material';

export default function SuccessDialog({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <DialogContent sx={{ bgcolor: '#fff' }}>
        <Box
          component="form"
          noValidate
          sx={{
            margin: 'auto',
            padding: '15px',
          }}
        >
          <DialogContentText sx={{ textAlign: 'center', mt: 2 }}>
            A password reset link have been sent to your email
          </DialogContentText>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

SuccessDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
