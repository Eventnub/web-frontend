import PropTypes from 'prop-types';
import { Dialog, Box, IconButton } from '@mui/material';
import Iconify from '../../../components/Iconify';
import GamerStatistics from './GameResult';

export default function GamerDetailsModal({ open, handleClose, gamer }) {
  return (
    <Dialog fullScreen open={open} maxWidth="md" scroll="body">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', bgcolor: 'primary.main' }}>
        <IconButton aria-label="Close" onClick={handleClose} sx={{ color: '#ffffff' }}>
          <Iconify icon="eva:close-fill" width={22} height={22} />
        </IconButton>
      </Box>
      <GamerStatistics gamer={gamer} />
    </Dialog>
  );
}

GamerDetailsModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  gamer: PropTypes.object,
};
