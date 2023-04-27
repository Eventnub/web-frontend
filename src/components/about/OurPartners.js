import React from 'react';
import { Box, Typography } from '@mui/material';
import starbucks from '../../assets/Starbucks.png';
import uol from '../../assets/UOL.png';
import wikimedia from '../../assets/Wikimedia.png';
import yii3 from '../../assets/yii3_sign 1.png';

export default function OurPartners() {
  return (
    <Box mb={'4rem'}>
      <Typography sx={{ color: '#000', textAlign: 'center', fontWeight: '300', fontSize: '2.5rem', mb: '3rem' }}>
        Our Partners
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: '1.5rem', md: '4rem' },
            flexWrap: { xs: 'wrap', md: 'no-wrap' },
            px: '1rem',
          }}
        >
          <img src={starbucks} alt="startbucks" />
          <img src={wikimedia} alt="wikimedia" />
          <img src={yii3} alt="yii3" />
          <img src={uol} alt="uol" />
        </Box>
      </Box>
    </Box>
  );
}
