import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      
      // Also send X-userId and X-username for direct backend communication (bypassing gateway)
      const userId = localStorage.getItem('userId');
      const username = localStorage.getItem('username');
      if (userId) config.headers['X-userId'] = userId;
      if (username) config.headers['X-username'] = username;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
