import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:1234/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  verifyOTP: (data) => api.post('/auth/verify-otp', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
};

export const userAPI = {
  getUsers: () => api.get('/users'),
  getUserById: (id) => api.get(`/users/${id}`),
  searchUsers: (query) => api.get(`/users/search?query=${encodeURIComponent(query)}`),
  updateProfile: (data) => api.put('/users/profile', data),
};

export const messageAPI = {
  sendMessage: (data) => api.post('/messages', data),
  getMessages: (userId) => api.get(`/messages/${userId}`),
  markAsRead: (messageId) => api.put(`/messages/${messageId}/read`),
};

export default api;
