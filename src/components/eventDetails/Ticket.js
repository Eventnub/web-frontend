import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

export default function Ticket() {
  return (
    <Box sx={{ backgroundColor: '#595959', height: '70%', width: '23%', p: '1.5% 1% 1% 1%', mt: '1.5%' }}>
      <Stack>
        <Typography sx={{ color: '#FF6C2C', fontSize: '2rem', fontWeight: '600', mb: '1%' }}>$50.00</Typography>
        <Typography sx={{ fontSize: '1.5rem', color: '#fff', fontWeight: '400' }}>Couples Regular</Typography>
        <Typography sx={{ fontSize: '1rem', color: '#fff', fontWeight: '400', mt: '6.5%', maxWidth: '276px' }}>
          First 20 lucky winners Get it FREE by taking a quiz game
        </Typography>
        <Button variant="outlined" sx={{ boxShadow: 'none', my: '7%', border: '1px solid #FF6C2C', color: '#fff' }}>
          Join quiz and win Ticket with $5
        </Button>
        <Button variant="outlined" sx={{ boxShadow: 'none', border: '1px solid #FF6C2C', color: '#fff' }}>
          Buy with $50
        </Button>
      </Stack>
    </Box>
  );
}
