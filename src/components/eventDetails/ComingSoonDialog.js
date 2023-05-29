import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, Button, Typography, Box } from '@mui/material';
import infoIcon from '../../assets/information-outline.png';

export default function ComingSoonDialog({ open, handleClose }) {
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
          This option is currently not available, use the play game option with (amount) to win your ticket for this
          event
        </Typography>
        <Box sx={{ mt: '8%', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleClose}
            sx={{
              background: '#1358A5',
              color: '#fff',
              boxShadow: 'none',
              borderRadius: '5px',
              width: '60%',
              height: '50px',
              px: '1.5rem',
            }}
          >
            <Typography sx={{ color: '#fff', fontSize: '.7rem', textAlign: 'center', fontWeight: '700' }}>
              Continue with play game now
            </Typography>
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

ComingSoonDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
