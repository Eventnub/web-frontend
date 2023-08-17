import React from 'react';
import { Container, Grid, Stack, Typography } from '@mui/material';

const STEPS = [
  {
    index: 1,
    description: 'Find any afrobeat event in your area with your favourite performing artiste',
  },
  {
    index: 2,
    description: 'Prove how much you know your favourite artiste by playing a game',
  },
  {
    index: 3,
    description: 'Win the game and get free or discounted ticket to the event.',
  },
];

export default function About() {
  return (
    <Container sx={{ marginTop: '4rem', marginBottom: '4rem' }}>
      <Typography variant="h4" sx={{ color: '#000', textAlign: 'center', mb: '1rem' }}>
        How it Works
      </Typography>
      <Grid container gap={1}>
        {STEPS.map((step) => (
          <Grid key={step.index} item xs={12}>
            <Stack direction="column" justifyContent="center" alignItems="center" sx={{ px: '1rem' }}>
              <Typography variant="subtitle1" sx={{ textAlign: 'center', color: 'grey.500' }}>
                Step {step.index}.
              </Typography>
              <Typography paragraph sx={{ textAlign: 'center', color: '#000', fontWeight: '200', maxWidth: '400px' }}>
                {step.description}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
