

import axios, { AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';

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

// Adicione um interceptor de resposta para lidar com erros de autenticação ou outros erros
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Aqui você pode lidar com erros de autenticação, por exemplo
    return Promise.reject(error);
  }
);

export default api;