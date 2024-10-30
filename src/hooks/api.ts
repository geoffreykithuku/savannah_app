import axios from 'axios';
const backend_url = 'https://savannah-task-backend.onrender.com/api';

// const backend_url = 'http://localhost:5000/api';
const token = localStorage.getItem('authToken');

const api = axios.create({
  baseURL: `${backend_url}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default api;
