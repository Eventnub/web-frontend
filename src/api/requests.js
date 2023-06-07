import axios from 'axios';
import { endpoints } from './endpoints';

const jsonHeader = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const getJsonHeaderWithAuthToken = (idToken) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${idToken}`,
  },
});
const getMultipartHeaderWithAuthToken = (idToken) => ({
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${idToken}`,
  },
});

export const requests = {
  register: (data) => axios.post(endpoints.register, data, jsonHeader),
  registerViaProvider: (data) => axios.post(endpoints.registerViaProvider, data, jsonHeader),
  forgot: (data) => axios.post(endpoints.forgot, data, jsonHeader),
  getUser: (uid, idToken) => axios.get(`${endpoints.getUser}/${uid}`, getJsonHeaderWithAuthToken(idToken)),
  getEvents: () => axios.get(endpoints.getEvents, jsonHeader),
  getEvent: (uid) => axios.get(`${endpoints.getEvents}/${uid}`, jsonHeader),
  getQuestions: (eventId, idToken) =>
    axios.get(`${endpoints.getQuestions}/${eventId}`, getJsonHeaderWithAuthToken(idToken)),
  submitEventQuizAnswers: (eventId, idToken, data) =>
    axios.post(`${endpoints.submitEventQuizAnswers}/${eventId}`, data, getJsonHeaderWithAuthToken(idToken)),
  verifyTicketPayment: (idToken, data) =>
    axios.post(endpoints.verifyTicketPayment, data, getJsonHeaderWithAuthToken(idToken)),
  getEventRaffleDraw: (eventId, idToken) =>
    axios.get(`${endpoints.getEventRaffleDraw}/${eventId}`, getJsonHeaderWithAuthToken(idToken)),
  submitEventRaffleDrawChoice: (eventId, idToken, data) =>
    axios.post(`${endpoints.submitEventRaffleDrawChoice}/${eventId}`, data, getJsonHeaderWithAuthToken(idToken)),
  uploadUserProfilePhoto: (idToken, data) =>
    axios.post(`${endpoints.uploadUserProfilePhoto}`, data, getMultipartHeaderWithAuthToken(idToken)),
  changeUserToHost: (idToken, data) =>
    axios.post(endpoints.changeUserToHost, data, getJsonHeaderWithAuthToken(idToken)),
  createEvent: (idToken, data) =>
    axios.post(`${endpoints.createEvent}`, data, getMultipartHeaderWithAuthToken(idToken)),
  getCreatorEvents: (idToken, creatorId) =>
    axios.get(`${endpoints.getCreatorEvents}/${creatorId}`, getJsonHeaderWithAuthToken(idToken)),
  getCreatorEvent: (eventId) => axios.get(`${endpoints.getCreatorEvents}/${eventId}`, jsonHeader),
  updateEvent: (eventId, data, idToken) =>
    axios.patch(`${endpoints.getEvents}/${eventId}`, data, getMultipartHeaderWithAuthToken(idToken)),
  getUserPaymentForEvent: (eventId, idToken) =>
    axios.get(`${endpoints.getUserPaymentForEvent}/${eventId}`, getJsonHeaderWithAuthToken(idToken)),
  verifyStripePayment: (idToken, data) =>
    axios.post(endpoints.verifyStripePayment, data, getJsonHeaderWithAuthToken(idToken)),
  getEventMusicMatch: (idToken, eventId) =>
    axios.get(`${endpoints.getEventMusicMatch}/${eventId}`, getJsonHeaderWithAuthToken(idToken)),
  transcribeAudio: (idToken, data) =>
    axios.post(endpoints.transcribeAudio, data, getMultipartHeaderWithAuthToken(idToken)),
  submitAudioRecording: (idToken, data) =>
    axios.post(endpoints.submitAudioRecording, data, getMultipartHeaderWithAuthToken(idToken)),
  getUserAcquiredTickets: (idToken, uid) =>
    axios.get(`${endpoints.getUserAcquiredTickets}/${uid}`, getJsonHeaderWithAuthToken(idToken)),
  submitContactUsMessage: (data) => axios.post(endpoints.submitContactUsMessage, data, jsonHeader),
};
