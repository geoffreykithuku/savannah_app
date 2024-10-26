import axios from 'axios';
const backend_url = import.meta.env.VITE_BACKEND_URL as string;
const token = localStorage.getItem('authToken');

const api = axios.create({
  baseURL: `${backend_url}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
