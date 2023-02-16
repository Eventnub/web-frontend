import axios from 'axios';
import { endpoints } from './endpoints';

const jsonHeader = {
  headers: {
    'Content-Type': 'application/json',
  },
};
export const requests = {
  register: (data) => {
    return axios.post(endpoints.register, data, jsonHeader);
  },
  forgot: (data) => {
    return axios.post(endpoints.forgot, data, jsonHeader);
  },
};
