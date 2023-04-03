import React, { useState } from 'react';
import { Button } from '@mui/material';
import { requests } from '../../api/requests';
import useFirebase from '../../hooks/useFirebase';

let mediaRecorder;
const chunks = [];

const VoiceRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [stream, setStream] = useState(null);
  const { user } = useFirebase();

  const startRecording = async () => {
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

  const uploadRecording = async () => {
    const blobFile = new File([audioFile], 'recorded_audio');
    const formData = new FormData();
    formData.append('audio', blobFile);
    try {
      const { data } = await requests.transcribeAudio(user.idToken, formData);
      console.log(data);
    } catch (error) {
      console.log(error.request);
    }
  };
  console.log({ audioFile });

  return (
    <div>
      <Button onClick={startRecording} disabled={recording}>
        Start Recording
      </Button>
      <Button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </Button>
      {audioURL && (
        <audio controls>
          <source src={audioURL} type="audio/ogg" />
          <source src={audioURL} type="audio/mpeg" />
          <track src="dav.vtt" kind="captions" label="English" />
        </audio>
      )}
      {/* {error && <p>{error}</p>} */}
      <Button onClick={uploadRecording}>Upload</Button>
    </div>
  );
};

export default VoiceRecorder;
