import React, { useState } from 'react';
import { Recorder } from 'react-voice-recorder';
import 'react-voice-recorder/dist/index.css';
import { requests } from '../../api/requests';
import useFirebase from '../../hooks/useFirebase';

const VoiceRecorder = () => {
  const [audioDetails, setAudioDetails] = useState({
    url: null,
    blob: null,
    chunks: null,
    duration: {
      h: 0,
      m: 0,
      s: 0,
    },
  });
  const { user } = useFirebase();

  const handleAudioStop = (data) => {
    console.log(data);
    setAudioDetails(data);
  };

  const handleAudioUpload = async (file) => {
    const blobFile = new File([file], 'recorded_audio');
    const formData = new FormData();
    formData.append('audio', blobFile);
    try {
      const { data } = await requests.transcribeAudio(user.idToken, formData);
      console.log(data);
    } catch (error) {
      console.log(error.request);
    }
    console.log(file);
  };

  // const handleCountDown = (data) => {
  //   // console.log(data);
  // };

  const handleReset = () => {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    };
    setAudioDetails(reset);
  };

  return (
    <Recorder
      record
      title={'New recording'}
      audioURL={audioDetails.url}
      showUIAudio
      handleAudioStop={(data) => handleAudioStop(data)}
      handleAudioUpload={(data) => handleAudioUpload(data)}
      // handleCountDown={(data) => handleCountDown(data)}
      handleReset={() => handleReset()}
      mimeTypeToUseWhenRecording={`audio/webm`} // For specific mimetype.
    />
  );
};

export default VoiceRecorder;
