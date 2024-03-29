import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, Button, Typography, Box, useTheme } from '@mui/material';

export default function PaymentDialog({ open, handleClose }) {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          background: '#fff',
          height: '40%',
          width: '23%',
          boxShadow: '0px 0px 9px 1px rgba(0, 0, 0, 0.25)',
          borderRadius: '7px',
          [theme.breakpoints.down('sm')]: { width: '80%', height: '35%' },
        },
      }}
    >
      <DialogTitle>
        <Typography sx={{ textAlign: 'center', color: '#000', fontWeight: '600', fontSize: '1.8rem' }}>
          Payment Successful
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ textAlign: 'center', color: '#6B6B6B', fontSize: '1rem', fontWeight: '300' }}>
          Your receipt will be sent to your email.
        </Typography>
        <Box sx={{ mt: '8%', textAlign: 'center' }}>
          <Button
            variant="contained"
            component={Link}
            to={'/'}
            sx={{ background: '#1358A5', color: '#fff', boxShadow: 'none', borderRadius: '5px', width: '50%' }}
          >
            Okay
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

PaymentDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
