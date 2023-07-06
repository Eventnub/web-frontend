import React, { useState, useEffect } from 'react';
import { Button, Box, Stack, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { keyframes } from '@emotion/react';
import PropTypes from 'prop-types';
import { requests } from '../../api/requests';
import useFirebase from '../../hooks/useFirebase';
import mixpanel from '../../utils/mixpanel';

let mediaRecorder;
const chunks = [];

const quietKeyframes = keyframes`
  25% {
    transform: scaleY(.6);
  }
  50% {
    transform: scaleY(.4);
  }
  75% {
    transform: scaleY(.8);
  }
`;

const normalKeyframes = keyframes`
  25% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(.4);
  }
  75% {
    transform: scaleY(.6);
  }
`;

const loudKeyframes = keyframes`
  25% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(.4);
  }
  75% {
    transform: scaleY(1.2);
  }
`;

const BoxContainer = styled('div')(({ visible }) => ({
  display: visible === 'true' ? 'flex' : 'none',
  justifyContent: 'space-between',
  height: '64px',
  '--boxSize': '8px',
  '--gutter': '4px',
  width: '100%',
}));

const StyledBox = styled('div')(({ animationname }) => ({
  transform: 'scaleY(.4)',
  height: '100%',
  width: 'var(--boxSize)',
  background: '#000',
  animationDuration: '1.2s',
  animationTimingFunction: 'ease-in-out',
  animationIterationCount: 'infinite',
  borderRadius: '8px',
  animationname,
}));

const VoiceRecorder = ({ musicMatchId, isTimeElapsed }) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [recordingStarted, setRecordingStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [stream, setStream] = useState(null);
  const { user } = useFirebase();
  const navigate = useNavigate();
  const paymentId = localStorage.getItem('paymentId');

  const startRecording = async () => {
    setRecordingStarted(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setStream(stream);
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.addEventListener('dataavailable', (event) => {
      chunks.push(event.data);
    });

    mediaRecorder.addEventListener('stop', () => {
      const audioBlob = new Blob(chunks, { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioURL(audioUrl);
      setAudioFile(audioBlob);
    });

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    setRecordingStarted(false);
    try {
      if (stream.getAudioTracks) {
        const tracks = stream.getAudioTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      } else {
        console.log('No Tracks Found');
      }
      mediaRecorder.stop();
    } catch (error) {
      console.log(error);
    }
    setRecording(false);
  };

  const resetRecording = () => {
    stopRecording(false);

    setTimeout(() => {
      setRecording(false);
      setAudioURL(null);
      setAudioFile(null);
      setStream(null);
    }, 5);
  };

  const uploadRecording = async () => {
    const blobFile = new File([audioFile], 'recorded_audio');
    const formData = new FormData();
    formData.append('audio', blobFile);
    formData.append('musicUnisonId', musicMatchId);
    formData.append('paymentId', paymentId);
    try {
      setIsSubmitting(true);
      await requests.submitAudioRecording(user.idToken, formData);

      mixpanel.track('Game played', {
        gameType: 'Music Match',
        userEmail: user.email,
      });

      setIsSubmitting(false);
      navigate('/quiz-completed');
    } catch (error) {
      console.log(error.request);
    }
  };

  useEffect(() => {
    if (isTimeElapsed) {
      setTimeout(async () => {
        await uploadRecording();
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimeElapsed]);

  return (
    <Stack sx={{ padding: '.8rem' }}>
      <Stack justifyContent="space-between" direction="row" spacing={2} sx={{ marginBottom: '.8rem' }}>
        <Button
          onClick={startRecording}
          disabled={recording}
          variant="contained"
          sx={{
            boxShadow: 'none',
            bgcolor: '#FF6C2C',
            '&:hover': {
              backgroundColor: '#FF6C2C',
            },
          }}
        >
          Start Recording
        </Button>
        <Button
          onClick={stopRecording}
          disabled={!recording}
          variant="contained"
          sx={{
            boxShadow: 'none',
            bgcolor: '#FF6C2C',
            '&:hover': {
              backgroundColor: '#FF6C2C',
            },
          }}
        >
          Stop Recording
        </Button>
      </Stack>

      <BoxContainer visible={recordingStarted.toString()}>
        <StyledBox animationname={quietKeyframes} />
        <StyledBox animationname={normalKeyframes} />
        <StyledBox animationname={quietKeyframes} />
        <StyledBox animationname={loudKeyframes} />
        <StyledBox animationname={quietKeyframes} />
        <StyledBox animationname={quietKeyframes} />
        <StyledBox animationname={normalKeyframes} />
        <StyledBox animationname={quietKeyframes} />
        <StyledBox animationname={loudKeyframes} />
        <StyledBox animationname={quietKeyframes} />
      </BoxContainer>
      {audioURL && (
        <audio controls>
          <source src={audioURL} type="audio/ogg" />
          <source src={audioURL} type="audio/mpeg" />
          <track src="dav.vtt" kind="captions" label="English" />
        </audio>
      )}
      {/* {error && <p>{error}</p>} */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.2rem' }}>
        <LoadingButton
          loading={isSubmitting}
          variant="contained"
          disabled={isTimeElapsed}
          sx={{ bgcolor: '#1358A5', boxShadow: 'none' }}
          onClick={uploadRecording}
        >
          Submit
        </LoadingButton>
        <Button
          variant="contained"
          disabled={isTimeElapsed}
          sx={{ bgcolor: '#1358A5', boxShadow: 'none' }}
          onClick={resetRecording}
        >
          Reset
        </Button>
      </Box>
    </Stack>
  );
};

export default VoiceRecorder;

VoiceRecorder.propTypes = {
  musicMatchId: PropTypes.string,
  isTimeElapsed: PropTypes.bool,
};
