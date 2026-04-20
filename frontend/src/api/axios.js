import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});


api.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');

    if (userId && username) {
      config.headers['userId'] = userId;
      config.headers['username'] = username;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
