

import axios, { AxiosResponse } from 'axios';
import { getSession, signOut } from 'next-auth/react';

const api = axios.create({
  baseURL: 'http://localhost:8080/', // Substitua pelo URL da sua API
});

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session) {
      config.headers['authorization'] = `Bearer ${session?.user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if(error.response && error.response.status == 401){
      signOut()
    }
    return Promise.reject(error);
  }
);

export default api;