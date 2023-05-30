import React, { useState } from 'react';
import { Button, Box, Stack, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { keyframes } from '@emotion/react';
import PropTypes from 'prop-types';
import { requests } from '../../api/requests';
import useFirebase from '../../hooks/useFirebase';

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
  display: visible ? 'flex' : 'none',
  justifyContent: 'space-between',
  height: '64px',
  '--boxSize': '8px',
  '--gutter': '4px',
  width: '100%',
}));

const StyledBox = styled('div')(({ animationName }) => ({
  transform: 'scaleY(.4)',
  height: '100%',
  width: 'var(--boxSize)',
  background: '#000',
  animationDuration: '1.2s',
  animationTimingFunction: 'ease-in-out',
  animationIterationCount: 'infinite',
  borderRadius: '8px',
  animationName,
}));

const VoiceRecorder = ({ musicMatchId }) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [recordingStarted, setRecordingStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [stream, setStream] = useState(null);
  const { user } = useFirebase();
  const navigate = useNavigate();
  const paymentId = localStorage.getItem('paymentId');

  // const startRecording = async () => {
  //   setRecordingStarted(true);
  //   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //   setStream(stream);
  //   // mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/mp3' });
  //   mediaRecorder = new MediaRecorder(stream);

  //   mediaRecorder.addEventListener('dataavailable', (event) => {
  //     chunks.push(event.data);
  //   });

  //   mediaRecorder.addEventListener('stop', () => {
  //     const audioBlob = new Blob(chunks, { type: 'audio/mp3' });
  //     const audioUrl = URL.createObjectURL(audioBlob);
  //     setAudioURL(audioUrl);
  //     setAudioFile(audioBlob);
  //   });

  //   mediaRecorder.start();
  //   setRecording(true);
  // };

  const startRecording = async () => {
    try {
      setRecordingStarted(true);
      const permissionResult = await navigator.permissions.query({ name: 'microphone' });

      if (permissionResult.state === 'granted' || permissionResult.state === 'prompt') {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setStream(stream);
        // mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/mp3' });
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
      } else {
        // Handle microphone permission denial
        console.log('Microphone permission denied');
      }
    } catch (error) {
      // Handle any errors that occur during getUserMedia
      console.error('Error accessing media devices:', error);
    }
  };

  // const stopRecording = () => {
  //   setRecordingStarted(false);
  //   if (stream.getAudioTracks) {
  //     const tracks = stream.getAudioTracks();
  //     tracks.forEach((track) => {
  //       track.stop();
  //     });
  //   } else {
  //     console.log('No Tracks Found');
  //   }
  //   mediaRecorder.stop();
  //   setRecording(false);
  // };

  const stopRecording = () => {
    setRecordingStarted(false);
    if (stream && stream.getTracks) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    } else {
      console.log('No Tracks Found');
    }
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      chunks.length = 0; // Clear the chunks array
    }
    setRecording(false);
  };

  const resetRecording = () => {
    setRecording(false);
    setAudioURL(null);
    setAudioFile(null);
    setStream(null);
    window.location.reload();
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
      setIsSubmitting(false);
      navigate('/quiz-completed');
    } catch (error) {
      console.log(error.request);
    }
  };

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

      <BoxContainer visible={recordingStarted}>
        <StyledBox animationName={quietKeyframes} />
        <StyledBox animationName={normalKeyframes} />
        <StyledBox animationName={quietKeyframes} />
        <StyledBox animationName={loudKeyframes} />
        <StyledBox animationName={quietKeyframes} />
        <StyledBox animationName={quietKeyframes} />
        <StyledBox animationName={normalKeyframes} />
        <StyledBox animationName={quietKeyframes} />
        <StyledBox animationName={loudKeyframes} />
        <StyledBox animationName={quietKeyframes} />
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
          sx={{ bgcolor: '#1358A5', boxShadow: 'none' }}
          onClick={uploadRecording}
        >
          Submit
        </LoadingButton>
        <Button variant="contained" sx={{ bgcolor: '#1358A5', boxShadow: 'none' }} onClick={resetRecording}>
          Reset
        </Button>
      </Box>
    </Stack>
  );
};

export default VoiceRecorder;

VoiceRecorder.propTypes = {
  musicMatchId: PropTypes.string,
};
