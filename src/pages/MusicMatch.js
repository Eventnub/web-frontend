import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, styled, Stack, useMediaQuery, useTheme } from '@mui/material';
// import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
// import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import Page from '../components/Page';
import logo from '../assets/Vector.png';
import blueLogo from '../assets/blueLogo.png';
import microphone from '../assets/old-microphone.png';
import { requests } from '../api/requests';
import useFirebase from '../hooks/useFirebase';
import VoiceRecorder from '../components/musicMatch/VoiceRecorder';
// import VoiceRecorder2 from '../components/musicMatch/VoiceRecorder2';
import MusicMatchInfoDialog from '../components/musicMatch/MusicMatchInfoDialog';

const Container = styled(Box)({
  width: '100%',
  height: '100vh',
  background: '#F4F4F4',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
export default function MusicMatch() {
  // const [audio] = useState(new Audio(sound));
  // const [isPlaying, setIsPlaying] = useState(false);
  const [musicMatch, setMusicMatch] = useState(null);
  const [musicMatchInfoDialogShown, setMusicMatchInfoDialogShown] = useState(false);
  const { eventId } = useParams();
  const { user } = useFirebase();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('lg'));

  const handleOpenDialog = () => {
    setMusicMatchInfoDialogShown(true);
  };
  const handleCloseDialog = () => {
    setMusicMatchInfoDialogShown(false);
  };

  // const togglePlay = () => {
  //   if (isPlaying) {
  //     audio.pause();
  //   } else {
  //     audio.play();
  //   }
  //   setIsPlaying(!isPlaying);
  // };

  // const playList = [
  //   {
  //     name: 'name',
  //     writer: 'writer',
  //     // img: 'image.jpg',
  //     src: musicMatch?.audioUrl,
  //     id: 1,
  //   },
  // ];

  // const updateTime = () => {
  //   setDuration(audio.duration);
  //   setCurrentTime(audio.currentTime);
  // };

  // useEffect(() => {
  //   audio.addEventListener('ended', () => {
  //     setIsPlaying(false);
  //   });
  //   return () => {
  //     audio.removeEventListener('ended', () => {
  //       setIsPlaying(false);
  //     });
  //   };
  // }, [audio]);

  useEffect(() => {
    async function getEventMusicMatch() {
      try {
        const { data } = await requests.getEventMusicMatch(user.idToken, eventId);
        setMusicMatch(data);
      } catch (error) {
        console.log(error);
      }
    }
    getEventMusicMatch();
  }, [eventId, user.idToken]);

  useEffect(() => {
    function openDialog() {
      handleOpenDialog();
    }
    openDialog();
  }, []);

  return (
    <Page title="Music Match">
      {isMatch ? (
        <>
          <Stack alignItems="center" sx={{ height: '100vh', px: '1rem' }}>
            <Box sx={{ mt: '1rem' }}>
              <img src={blueLogo} alt="logo" style={{ height: '100px', width: '100px' }} />
            </Box>
            <Box
              sx={{
                bgcolor: '#fff',
                height: '80%',
                width: '100%',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                borderTopRightRadius: '12px',
                borderBottomRightRadius: '12px',
                px: '1.5rem',
              }}
            >
              <Typography
                sx={{ color: '#000', fontWeight: '200', fontSize: '1.4rem', mt: '1rem', textAlign: 'center' }}
              >
                Music Match
              </Typography>
              <Typography sx={{ textAlign: 'center', mt: 1, fontWeight: '200', color: '#000' }}>
                Play the beat and sing the song lyrics along with it (Use earpiece to allow your system easily pick your
                voice)
              </Typography>
              <Stack
                sx={{
                  height: '35%',
                  width: { xs: '100%', md: '50%' },
                  margin: 'auto',
                  mt: '1.3rem',
                }}
              >
                <Box
                  sx={{
                    width: 'fit-content',
                    height: '20%',
                    boxShadow: ' 0px 2px 4px rgba(0, 0, 0, 0.25)',
                    mx: '3rem',
                    borderRadius: '64px',
                    p: '.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    background: '#fff',
                    m: 'auto',
                  }}
                >
                  <Stack direction="row" spacing={0.5}>
                    <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '.8rem' }}>
                      {musicMatch?.songTitle}
                    </Typography>
                    <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '.8rem' }}>by</Typography>
                    <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '.8rem' }}>
                      {musicMatch?.songArtist}
                    </Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    boxShadow: ' 0px 2px 4px rgba(0, 0, 0, 0.25)',
                    height: '50%',
                    width: '100%',
                    mt: '.5rem',
                    borderRadius: '64px',
                    p: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    background: '#fff',
                    mb: '.6rem',
                  }}
                >
                  {musicMatch && (
                    <audio controls>
                      <source src={musicMatch?.audioUrl} type="audio/mp3" />
                      <track src="thg.vtt" kind="captions" label="English" />
                    </audio>
                  )}
                </Box>
                <Box
                  sx={{
                    bgcolor: '#DBDBDB',
                    width: '50%',
                    m: 'auto',
                    height: '50px',
                    borderRadius: '360px',
                    p: '.5rem',
                  }}
                >
                  <Typography sx={{ textAlign: 'center', color: '#000', fontWeight: '600' }}>00 : 25 : 05</Typography>
                </Box>
              </Stack>
              <Box sx={{ m: 'auto', height: '35%', width: { xs: '100%', md: '50%' }, margin: 'auto', mt: '.5rem' }}>
                <VoiceRecorder musicMatchId={musicMatch?.uid} />
                {/* <VoiceRecorder2 /> */}
              </Box>
            </Box>
          </Stack>
          <MusicMatchInfoDialog open={musicMatchInfoDialogShown} handleClose={handleCloseDialog} />
        </>
      ) : (
        <>
          <Container>
            <Box sx={{ height: '90%', width: '75%', display: 'flex', gap: '2rem' }}>
              <Box
                sx={{
                  height: '100%',
                  background: '#1358A5',
                  flex: 1,
                  borderTopLeftRadius: '20px',
                  borderBottomLeftRadius: '20px',
                  // display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'column',
                  boxShadow: ' 0px 2px 4px rgba(0, 0, 0, 0.25)',
                  display: { xs: 'none', lg: 'flex' },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 'auto',
                    marginTop: 'auto',
                  }}
                >
                  <img src={logo} alt="logo" style={{ width: '100px', height: '100px' }} />
                  <Typography sx={{ color: '#fff', fontWeight: '600', mt: '1rem', letterSpacing: '.5rem' }}>
                    eventnub
                  </Typography>
                </Box>
                <Typography sx={{ color: '#fff', mb: '1.5rem', fontWeight: '400', fontSize: '.8rem' }}>
                  Copyright {new Date().getFullYear()} Eventnub.com
                </Typography>
              </Box>
              <Box
                sx={{
                  height: '100%',
                  flex: 2,
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                  borderTopRightRadius: '20px',
                  borderBottomRightRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.65)',
                  px: '1rem',
                  pt: '2rem',
                  backgroundImage: `url(${microphone})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '45%',
                  backgroundPosition: 'right center',
                }}
              >
                <Typography sx={{ textAlign: 'center', color: '#000', fontSize: '2rem' }}>Music Match</Typography>
                <Typography sx={{ color: '#000', textAlign: 'center' }}>
                  Play the beat and sing the song lyrics along with it (Use earpiece to allow your system easily pick
                  your voice)
                </Typography>
                <Box
                  sx={{
                    height: '35%',
                    width: '50%',
                    margin: 'auto',
                    mt: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box
                    sx={{
                      width: 'fit-content',
                      height: '20%',
                      boxShadow: ' 0px 2px 4px rgba(0, 0, 0, 0.25)',
                      mx: '3rem',
                      borderRadius: '64px',
                      p: '.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      background: '#fff',
                      m: 'auto',
                    }}
                  >
                    <Stack direction="row" spacing={0.5}>
                      <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '.8rem' }}>
                        {musicMatch?.songTitle}
                      </Typography>
                      <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '.8rem' }}>by</Typography>
                      <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '.8rem' }}>
                        {musicMatch?.songArtist}
                      </Typography>
                    </Stack>
                  </Box>
                  <Box
                    sx={{
                      boxShadow: ' 0px 2px 4px rgba(0, 0, 0, 0.25)',
                      height: '50%',
                      width: '100%',
                      mt: '.5rem',
                      borderRadius: '64px',
                      p: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      background: '#fff',
                      mb: '.6rem',
                    }}
                  >
                    {/* <IconButton onClick={togglePlay}>
                  {isPlaying ? (
                    <PauseCircleOutlineOutlinedIcon sx={{ color: '#D587FF', fontSize: '4rem' }} />
                  ) : (
                    <PlayCircleFilledWhiteOutlinedIcon sx={{ color: '#D587FF', fontSize: '4rem' }} />
                  )}
                </IconButton> */}
                    {musicMatch && (
                      <audio controls>
                        <source src={musicMatch?.audioUrl} type="audio/mp3" />
                        <track src="thg.vtt" kind="captions" label="English" />
                      </audio>
                    )}
                  </Box>
                  <Box
                    sx={{
                      bgcolor: '#DBDBDB',
                      width: '50%',
                      m: 'auto',
                      height: '50px',
                      borderRadius: '360px',
                      p: '.5rem',
                    }}
                  >
                    <Typography sx={{ textAlign: 'center', color: '#000', fontWeight: '600' }}>00 : 25 : 05</Typography>
                  </Box>
                </Box>
                <Box sx={{ m: 'auto', height: '35%', width: '50%', margin: 'auto', mt: '.5rem' }}>
                  <VoiceRecorder musicMatchId={musicMatch?.uid} />
                </Box>
              </Box>
              <MusicMatchInfoDialog open={musicMatchInfoDialogShown} handleClose={handleCloseDialog} />
            </Box>
          </Container>
        </>
      )}
    </Page>
  );
}
