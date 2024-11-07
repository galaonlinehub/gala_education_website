//APP SETTINGS

import axios from 'axios';

export const api = axios.create({
  baseURL:'https://galaweb.galahub.org/api',
  headers: {
    'Content-Type': 'application/json',
    
  },
});

