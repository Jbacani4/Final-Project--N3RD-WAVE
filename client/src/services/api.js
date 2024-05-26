import axios from 'axios';

const API_URL = 'https://final-project-n3rd-wave.onrender.com/api'; // Update this to backend URL if changes

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in the headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Assume token is stored in localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;