const BASE_URL = 'https://eventnub.onrender.com/api';

const getFullUrl = (endpoint) => `${BASE_URL}/${endpoint}`;

export const endpoints = {
  register: getFullUrl('auth/register'),
  registerViaProvider: getFullUrl('auth/register-via-provider'),
  forgot: getFullUrl('auth/send-forgot-password-email'),
  getUser: getFullUrl('users'),
  getEvents: getFullUrl('events'),
  getQuestions: getFullUrl('questions/get-event-quiz'),
  submitEventQuizAnswers: getFullUrl('questions/submit-event-quiz-answers'),
  verifyTicketPayment: getFullUrl('payments/handle-paystack-ticket-payment'),
  getEventRaffleDraw: getFullUrl('raffle-draws/get-event-raffle-draw'),
  submitEventRaffleDrawChoice: getFullUrl('raffle-draws/submit-event-raffle-draw-choice'),
  uploadUserProfilePhoto: getFullUrl('users/upload-user-profile-photo'),
  changeUserToHost: getFullUrl('users/change-user-to-host'),
  createEvent: getFullUrl('events'),
  getCreatorEvents: getFullUrl('events/get-creator-events'),
  getUserPaymentForEvent: getFullUrl('payments/get-user-payments-for-event'),
  verifyStripePayment: getFullUrl('payments/handle-stripe-ticket-payment'),
  getEventMusicMatch: getFullUrl('music-unison/get-event-music-unison'),
  transcribeAudio: getFullUrl('music-unison/transcribe-audio'),
  submitAudioRecording: getFullUrl('music-unison/submit-event-music-unison-audio'),
  getUserAcquiredTickets: getFullUrl('tickets/get-user-acquired-tickets'),
  submitContactUsMessage: getFullUrl('contact-us'),
};
