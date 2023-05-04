import React, { useEffect, useState } from 'react';
import { Box, styled, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import ticket from '../../assets/ticket.png';
import Tickets from './Ticket';
import { requests } from '../../api/requests';
import useFirebase from '../../hooks/useFirebase';

function TicketsBar() {
  const theme = useTheme();
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useFirebase();
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'));
  const StyledBox = styled(Box)(() => ({
    width: '23%',
    height: '100%',
    backgroundColor: '#fff',
    boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.25)',
    borderRadius: '5px',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  }));

  const StyledIconButton = styled(IconButton)(() => ({
    border: '1px solid rgba(19, 88, 165, 0.05)',
    backgroundColor: 'rgba(19, 88, 165, 0.05)',
  }));

  const Number = styled(Typography)(() => ({
    color: '#FF6C2C',
  }));

  const Title = styled(Typography)(() => ({
    color: '#000',
  }));

  const Div = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
  }));

  useEffect(() => {
    async function fetcTickets() {
      try {
        setIsLoading(true);
        const { data } = await requests.getUserAcquiredTickets(user.idToken, user.id);
        setTickets(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetcTickets();
  }, [user.idToken, user.id]);

  console.log(tickets);

  return (
    <>
      <Box
        gap="2.5rem"
        sx={{
          display: isMatch ? 'none' : 'flex',
          px: '1.5rem',
          pt: '2rem',
          justifyContent: 'center',
          alignItems: 'center',
          height: '115px',
        }}
      >
        <StyledBox sx={{ backgroundColor: ' rgba(255, 108, 44, 0.07)' }}>
          <StyledIconButton>
            <img src={ticket} alt="ticket" style={{ width: '75%', height: '75%' }} />
          </StyledIconButton>
          <Div display="flex" flexDirection="column">
            <Number variant="h6">03</Number>
            <Title variant="body2">Active Tickets</Title>
          </Div>
        </StyledBox>
        <StyledBox>
          <StyledIconButton>
            <img src={ticket} alt="ticket" style={{ width: '75%', height: '75%' }} />
          </StyledIconButton>
          <Div>
            <Number variant="h6">34</Number>
            <Title variant="body2">Total Tickets</Title>
          </Div>
        </StyledBox>
        <StyledBox>
          <StyledIconButton>
            <img src={ticket} alt="ticket" style={{ width: '75%', height: '75%' }} />
          </StyledIconButton>
          <Div>
            <Number variant="h6">22</Number>
            <Title variant="body2">Tickets Paid </Title>
          </Div>
        </StyledBox>
        <StyledBox>
          <StyledIconButton>
            <img src={ticket} alt="ticket" style={{ width: '75%', height: '75%' }} />
          </StyledIconButton>
          <Div>
            <Number variant="h6">12</Number>
            <Title variant="body2">Tickets Won</Title>
          </Div>
        </StyledBox>
      </Box>
      <Box
        margin="1rem"
        // minHeight="70vh"
        sx={{ background: '#fff', padding: '1rem', borderRadius: '10px', height: 'auto' }}
        display="flex"
        flexWrap="wrap"
        gap="3rem"
      >
        {tickets.length === 0 ? (
          <Typography>You have not purchased any ticket</Typography>
        ) : (
          <Tickets tickets={tickets} isLoading={isLoading} />
        )}
      </Box>
    </>
  );
}

export default TicketsBar;
