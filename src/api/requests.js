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

export const requests = {
  register: (data) => axios.post(endpoints.register, data, jsonHeader),
  forgot: (data) => axios.post(endpoints.forgot, data, jsonHeader),
  getUser: (uid, idToken) => axios.get(`${endpoints.getUser}/${uid}`, getJsonHeaderWithAuthToken(idToken)),
};
