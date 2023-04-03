import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@mui/material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import moment from 'moment';
import Navbar from '../../components/myEvents/Navbar';
import Page from '../../components/Page';
import Footer from '../../components/home/Footer';
import Sidebar from '../../components/myEvents/Sidebar';
import { requests } from '../../api/requests';
import useFirebase from '../../hooks/useFirebase';

export default function MyEventsPage() {
  const [event, setEvent] = useState({});
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const { eventId } = useParams();
  const { date, time } = event;
  const { user } = useFirebase();
  const formattedDate = moment(date).format('Do MMM, YYYY').toUpperCase();
  const formattedTime = moment(time, 'HH:mm').format('h:mm A');
  const navigate = useNavigate();

  const data = [
    { game: 'Quiz', won: 20, lost: 31, totalPlay: 51 },
    { game: 'Raffle Draw', won: 120, lost: 20, totalPlay: 140 },
    { game: 'Play the Beat', won: 40, lost: 42, totalPlay: 82 },
  ];

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        const { data } = await requests.getEvent(eventId);
        setEvent(data);
        setTickets(data.tickets);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchEvents();
  }, [eventId]);

  const handleArchive = async () => {
    const formData = new FormData();
    formData.append('isArchived', true);
    try {
      await requests.updateEvent(eventId, formData, user.idToken);
      navigate('/my-events');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page title="My Events">
      <Box>
        <Navbar />
        <Box sx={{ px: '2.2rem', mb: '2rem' }}>
          <Box sx={{ mt: '1.7rem', display: 'flex', gap: '2rem' }}>
            <Box
              sx={{
                borderRadius: '10px',
                flex: 0.8,
                height: '86vh',
                background: '#EDF5F6',
                px: '1.5rem',
                py: '1.5rem',
                display: { xs: 'none', md: 'block' },
                // [theme.breakpoints.down('sm')]: { display: 'none' },
              }}
            >
              <Sidebar />
            </Box>
            <Box sx={{ flex: '4', display: 'flex', flexDirection: 'column', height: 'auto' }}>
              <Typography
                sx={{
                  color: '#000',
                  fontSize: '2rem',
                  fontWeight: '600',
                  textTransform: 'capitalize',
                  display: { xs: 'none', md: 'block' },
                }}
              >
                {event.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  height: '50%',
                  gap: { xs: '1rem', md: '3rem' },
                  mt: '3rem',
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    <Box sx={{ flex: 1.3 }}>
                      <img
                        src={event.photoUrl}
                        alt={event.name}
                        style={{
                          height: '100%',
                          width: { xs: '100%', md: '100%' },
                          objectFit: 'cover',
                          objectPosition: 'center',
                          borderRadius: '10px',
                        }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        display: { xs: 'block', md: 'none' },
                        color: '#000',
                        fontWeight: '700',
                        fontSize: '1.5rem',
                      }}
                    >
                      {event.name}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        px: { xs: '0', md: '2rem' },
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            color: '#515151',
                            fontSize: '1.2rem',
                            fontWeight: '400',
                            maxWidth: { xs: '100%', md: '100%' },
                          }}
                        >
                          {event.description}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          mt: '2rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          maxWidth: { xs: '100%', md: '100%' },
                        }}
                      >
                        <Stack>
                          <Typography sx={{ color: '#ABABAB', fontWeight: '400', fontSize: '.8rem' }}>Date</Typography>
                          <Typography sx={{ color: '#000', fontWeight: '600' }}>{formattedDate}</Typography>
                        </Stack>
                        <Stack>
                          <Typography sx={{ color: '#ABABAB', fontWeight: '400', fontSize: '.8rem' }}>Time</Typography>
                          <Typography sx={{ color: '#000', fontWeight: '600' }}>{formattedTime}</Typography>
                        </Stack>
                      </Box>
                      <Box sx={{ mt: '2rem' }}>
                        <Typography sx={{ color: '#ABABAB', fontWeight: '400', fontSize: '.8rem' }}>Venue</Typography>
                        <Typography sx={{ color: '#000', fontWeight: '400' }}>
                          {`${event.venue}, ${event.state}, ${event.country}`}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
              <Box
                sx={{
                  mt: '2rem',
                  background: '#EDF5F6',
                  height: { xs: 'auto', md: '20%' },
                  borderRadius: '10px',
                  p: '1rem',
                  width: { xs: '100%', md: '100%' },
                }}
              >
                <Typography sx={{ color: '#909090', fontWeight: '400' }}>Tickets</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem',
                    mt: '1rem',
                    flexWrap: { xs: 'wrap', md: 'nowrap' },
                  }}
                >
                  {tickets.map((ticket) => (
                    <Stack key={ticket.index}>
                      <Typography sx={{ color: '#515151', fontWeight: '600' }}>{ticket.type}</Typography>
                      <Typography sx={{ color: '#000', fontWeight: '700' }}>${ticket.price}</Typography>
                    </Stack>
                  ))}
                </Box>
              </Box>
              <Box
                sx={{
                  mt: '1rem',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '1rem',
                  width: { xs: '100%', md: '100%' },
                }}
              >
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/update-event/${eventId}`}
                  startIcon={<EditIcon />}
                  sx={{ boxShadow: 'none', color: '#0BB7CE', border: '1px solid #0BB7CE' }}
                >
                  Edit Event
                </Button>
                <Button
                  startIcon={<ArchiveIcon />}
                  variant="outlined"
                  onClick={handleArchive}
                  sx={{ boxShadow: 'none', color: '#FF6C2C', border: '1px solid #FF6C2C' }}
                >
                  Send to Archive
                </Button>
              </Box>
              <Box sx={{ mt: '3rem', p: { xs: 0, md: '1rem' } }}>
                <Typography sx={{ color: '#000', fontWeight: '700', fontSize: '1.6rem' }}>Engagements</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    mt: '2rem',
                    gap: { xs: '3rem', md: '8rem' },
                    width: { xs: '100%', md: '100%' },
                    flexWrap: { xs: 'wrap', md: 'nowrap' },
                  }}
                >
                  <Stack>
                    <Typography sx={{ color: '#515151', fontWeight: '600' }}>Total Views</Typography>
                    <Typography sx={{ color: '#000', fontWeight: '700' }}>15,456</Typography>
                  </Stack>
                  <Stack>
                    <Typography sx={{ color: '#515151', fontWeight: '600' }}>145 tickets sold</Typography>
                    <Typography sx={{ color: '#000', fontWeight: '700' }}>$200,000</Typography>
                  </Stack>
                  <Stack>
                    <Typography sx={{ color: '#515151', fontWeight: '600' }}>50 tickets won</Typography>
                    <Typography sx={{ color: '#000', fontWeight: '700' }}>$40,000</Typography>
                  </Stack>
                  <Stack>
                    <Typography sx={{ color: '#515151', fontWeight: '600' }}>Total Sales</Typography>
                    <Typography sx={{ color: '#000', fontWeight: '700' }}>$240,000</Typography>
                  </Stack>
                </Box>
                <Box sx={{ mt: '2rem' }}>
                  <Typography sx={{ color: '#000', fontWeight: '700', fontSize: '1.3rem' }}>Game activities</Typography>
                  <TableContainer sx={{ mt: '2rem' }}>
                    <Table>
                      <TableHead sx={{ background: '#F5F5F5' }}>
                        <TableRow>
                          <TableCell>Game</TableCell>
                          <TableCell>Won</TableCell>
                          <TableCell>Lost</TableCell>
                          <TableCell>Total Play</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{row.game}</TableCell>
                            <TableCell>{row.won}</TableCell>
                            <TableCell>{row.lost}</TableCell>
                            <TableCell>{row.totalPlay}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Page>
  );
}
