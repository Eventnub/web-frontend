import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, Button, Typography, Box, useTheme } from '@mui/material';

export default function SuccessDialog({ open, handleClose }) {
  const theme = useTheme();
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
        <Typography sx={{ textAlign: 'center', color: '#000', fontWeight: '600', fontSize: '1.8rem' }}>
          Successful
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ textAlign: 'center', color: '#6B6B6B', fontSize: '1rem', fontWeight: '300' }}>
          Your result will be sent to your mail in 24 hours
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

SuccessDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
