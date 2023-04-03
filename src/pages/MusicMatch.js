import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, styled, Avatar, IconButton } from '@mui/material';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import Page from '../components/Page';
import logo from '../assets/Vector.png';
import microphone from '../assets/old-microphone.png';
import avatar from '../assets/avatar.png';
import { requests } from '../api/requests';
import useFirebase from '../hooks/useFirebase';
import VoiceRecorder from '../components/musicMatch/VoiceRecorder';
import sound from '../assets/sound.mp3';
// import VoiceRecorder2 from '../components/musicMatch/VoiceRecorder2';

const Container = styled(Box)({
  width: '100%',
  height: '100vh',
  background: '#F4F4F4',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
export default function MusicMatch() {
  const [audio] = useState(new Audio(sound));
  const [isPlaying, setIsPlaying] = useState(false);
  const [musicMatch, setMusicMatch] = useState(null);
  const { eventId } = useParams();
  const { user } = useFirebase();

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

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

  useEffect(() => {
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });
    return () => {
      audio.removeEventListener('ended', () => {
        setIsPlaying(false);
      });
    };
  }, [audio]);

  useEffect(() => {
    async function getEventMusicMatch() {
      try {
        const { data } = await requests.getEventMusicMatch(user.idToken, eventId);
        setMusicMatch(data[0]);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    getEventMusicMatch();
  }, [eventId, user.idToken]);

  console.log({ musicMatch });

  return (
    <Page title="Music Match">
      <Container>
        <Box sx={{ height: '90%', width: '75%', display: 'flex', gap: '2rem' }}>
          <Box
            sx={{
              height: '100%',
              background: '#1358A5',
              flex: 1,
              borderTopLeftRadius: '20px',
              borderBottomLeftRadius: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'column',
              boxShadow: ' 0px 2px 4px rgba(0, 0, 0, 0.25)',
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
              Play the beat and sing the song lyrics along with it (Use earpiece to allow your system easily pick your
              voice)
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
                }}
              >
                <Avatar src={avatar} sx={{ width: 30, height: 30 }} />
                <Typography sx={{ color: '#000', fontWeight: '400', fontSize: '.8rem' }}>
                  {musicMatch?.songTitle} by {musicMatch?.songArtist}
                </Typography>
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
                }}
              >
                <IconButton onClick={togglePlay}>
                  {isPlaying ? (
                    <PauseCircleOutlineOutlinedIcon sx={{ color: '#D587FF', fontSize: '4rem' }} />
                  ) : (
                    <PlayCircleFilledWhiteOutlinedIcon sx={{ color: '#D587FF', fontSize: '4rem' }} />
                  )}
                </IconButton>
                {/* {musicMatch && (
                  <AudioPlayer
                    playList={playList}
                    activeUI={{
                      ...activeUI,
                      progress: progressType,
                    }}
                    // placement={{
                    //   player: playerPlacement,
                    //   interface: {
                    //     templateArea: interfacePlacement,
                    //   },
                    //   playList: playListPlacement,
                    //   volumeSlider: volumeSliderPlacement,
                    // }}
                    rootContainerProps={{
                      colorScheme: theme,
                      // width,
                    }}
                  />
                )} */}
              </Box>
              <Box>
                <VoiceRecorder />
                {/* <VoiceRecorder2 /> */}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Page>
  );
}
