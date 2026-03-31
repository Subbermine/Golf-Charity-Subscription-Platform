import axios from 'axios';

// Base API instance
const api = axios.create({
  baseURL: '/api',
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

// Auth Services
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  signup: async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  }
};

// Score Services
export const scoreService = {
  getScores: async () => {
    const response = await api.get('/user/scores');
    return response.data;
  },
  addScore: async (scoreData) => {
    // Backend expects { score: number }
    const response = await api.post('/user/scores', { score: scoreData.value });
    return response.data;
  }
};

// Charity Services
export const charityService = {
  getCharities: async () => {
    const response = await api.get('/charity');
    return response.data;
  }
};

// Subscription Services
export const subscriptionService = {
  getSubscription: async () => {
    const response = await api.get('/user/subscription/status');
    return response.data;
  },
  subscribe: async (plan) => {
    const response = await api.post('/user/subscribe', { plan });
    return response.data;
  }
};

export default api;
