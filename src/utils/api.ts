
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


// Defina um tipo para a configuração interna do Axios


const api = axios.create({
  baseURL: 'http://localhost:8080/', // Substitua pelo URL da sua API
});

// Adicione um interceptor de requisição para adicionar cabeçalhos personalizados, se necessário
api.interceptors.request.use(
  (config) => {
    // Aqui você pode adicionar cabeçalhos personalizados, como tokens de autenticação
    // config.headers['Authorization'] = 'Bearer SeuTokenDeAutenticacao';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Adicione um interceptor de resposta para lidar com erros de autenticação ou outros erros
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Aqui você pode realizar alguma lógica com a resposta antes de passá-la adiante
    return response;
  },
  (error) => {
    // Aqui você pode lidar com erros de autenticação, por exemplo
    if (error.response?.status === 401) {
      // Redirecione o usuário para a página de login ou execute outra ação apropriada
      // router.push('/login'); // Certifique-se de importar o router do Next.js
    }
    return Promise.reject(error);
  }
);

export default api;