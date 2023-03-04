const BASE_URL = 'https://eventnub.onrender.com/api';

const getFullUrl = (endpoint) => `${BASE_URL}/${endpoint}`;

export const endpoints = {
  register: getFullUrl('auth/register'),
  forgot: getFullUrl('auth/send-forgot-password-email'),
  getUser: getFullUrl('users'),
  getEvents: getFullUrl('events'),
  getQuestions: getFullUrl('questions/get-event-quiz'),
  submitEventQuizAnswers: getFullUrl('questions/submit-event-quiz-answers'),
};
