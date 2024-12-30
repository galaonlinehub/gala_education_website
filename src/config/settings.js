//APP SETTINGS

import axios from 'axios';

export const api = axios.create({
  baseURL:'http://localhost:8000/api',
  // baseURL:'http://192.168.0.12:8000/api',
  // baseURL:'https://galaweb.galahub.org/api',
  headers: {
    'Content-Type': 'application/json',
    
  },
});

