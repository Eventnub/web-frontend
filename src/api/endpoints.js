const BASE_URL = 'https://eventnub.onrender.com/api';

const getFullUrl = (endpoint) => {
  return `${BASE_URL}/${endpoint}`;
};

export const endpoints = {
  register: getFullUrl('auth/register'),
  forgot: getFullUrl('auth/send-forgot-password-email'),
};
