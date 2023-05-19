import React, { useState } from 'react';
import { Button, Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import { requests } from '../../api/requests';
import useFirebase from '../../hooks/useFirebase';

let mediaRecorder;
const chunks = [];

const VoiceRecorder = ({ musicMatchId }) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [stream, setStream] = useState(null);
  const { user } = useFirebase();
  const navigate = useNavigate();

  const startRecording = async () => {
    // const md = navigator.mediaDevices;
    // const audioContext = window.AudioContext;
    // const mediaStream = window.MediaStreamAudioSourceNode;
    // const audioWorklet = AudioWorkletNode;
    // console.log(JSON.stringify({ audioContext, mediaStream, audioWorklet }));
    // console.log(md);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // setStream(stream);
    // window.alert(stream);

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
  };

  const stopRecording = () => {
    if (stream.getAudioTracks) {
      const tracks = stream.getAudioTracks();
      console.log({ tracks });
      tracks.forEach((track) => {
        track.stop();
      });
    } else {
      console.log('No Tracks Found');
    }
    mediaRecorder.stop();
    setRecording(false);
  };

  const resetRecording = () => {
    setRecording(false);
    setAudioURL(null);
    setAudioFile(null);
    setStream(null);
  };

  const uploadRecording = async () => {
    const blobFile = new File([audioFile], 'recorded_audio');
    const formData = new FormData();
    formData.append('audio', blobFile);
    formData.append('musicUnisonId', musicMatchId);
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
