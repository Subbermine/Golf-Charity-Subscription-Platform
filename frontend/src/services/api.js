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

// Admin Services
export const adminService = {
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  getReports: async () => {
    const response = await api.get('/admin/reports');
    return response.data;
  }
};

// Draw Services
export const drawService = {
  runDraw: async (drawData) => {
    const response = await api.post('/draw/run', drawData);
    return response.data;
  },
  publishResults: async (drawId) => {
    const response = await api.put(`/draw/${drawId}/publish`);
    return response.data;
  },
  getLatestDraw: async () => {
    const response = await api.get('/draw/latest');
    return response.data;
  },
  getAdminLatestDraw: async () => {
    const response = await api.get('/draw/admin/latest');
    return response.data;
  },
  getHistory: async () => {
    const response = await api.get('/draw/history');
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
  },
  createCharity: async (charityData) => {
    const response = await api.post('/charity', charityData);
    return response.data;
  },
  updateCharity: async (id, charityData) => {
    const response = await api.put(`/charity/${id}`, charityData);
    return response.data;
  }
};

// User Services
export const userService = {
  updateProfile: async (userData) => {
    const response = await api.put('/user/profile', userData);
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

// Winner Services
export const winnerService = {
  getWinners: async () => {
    const response = await api.get('/winner/all');
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await api.put(`/winner/${id}/verify`, { status });
    return response.data;
  },
  getMyWinnings: async () => {
    const response = await api.get('/winner/my');
    return response.data;
  }
};

export default api;
