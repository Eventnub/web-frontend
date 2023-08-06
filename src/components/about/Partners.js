import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import LiveNation from '../../assets/partners/live_nations.png';
import SeatGeek from '../../assets/partners/seat_geek.png';
import TicketMaster from '../../assets/partners/ticket_master.png';
import MailGun from '../../assets/partners/mailgun.png';

function Partners() {
  return (
    <Box sx={{ mb: '5rem' }}>
      <Typography
        sx={{
          color: '#000',
          textAlign: 'center',
          fontWeight: '300',
          fontSize: '2.5rem',
          mb: '2rem',
        }}
      >
        Partners
      </Typography>
      <Stack
        spacing={{ xs: 0, md: 3, lg: 8 }}
        direction="row"
        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
        alignItems="center"
        justifyContent="center"
        sx={{
          px: '1rem',
        }}
      >
        <img src={LiveNation} alt="LiveNation" />
        <img src={TicketMaster} alt="TicketMaster" />
        <img src={MailGun} alt="MailGun" />
        <img src={SeatGeek} alt="SeatGeek" />
      </Stack>
    </Box>
  );
}
export default Partners;
