import axios from 'axios';

const backend_url = 'https://savannah-task-backend.onrender.com/api';

const api = axios.create({
  baseURL: `${backend_url}`,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
