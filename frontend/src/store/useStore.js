import { create } from 'zustand';
import { scoreService, charityService, subscriptionService, userService, adminService, drawService, winnerService } from '../services/api';

const useStore = create((set) => ({
  scores: [],
  charities: [],
  subscription: null,
  isLoading: false,
  error: null,
  
  // Admin State
  adminUsers: [],
  adminReports: null,
  latestDraw: null,
  drawHistory: [],
  winners: [],
  myWinnings: [],

  fetchScores: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await scoreService.getScores();
      set({ scores: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addScore: async (scoreData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedScores = await scoreService.addScore(scoreData);
      set({ 
        scores: updatedScores, 
        isLoading: false 
      });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchCharities: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await charityService.getCharities();
      set({ charities: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addCharity: async (charityData) => {
    set({ isLoading: true, error: null });
    try {
      const newCharity = await charityService.createCharity(charityData);
      set((state) => ({ 
        charities: [...state.charities, newCharity], 
        isLoading: false 
      }));
      return newCharity;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return null;
    }
  },

  updateCharity: async (id, charityData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedCharity = await charityService.updateCharity(id, charityData);
      set((state) => ({
        charities: state.charities.map((c) => (c._id === id ? updatedCharity : c)),
        isLoading: false,
      }));
      return updatedCharity;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return null;
    }
  },

  selectCharity: async (charityId) => {
    set({ isLoading: true, error: null });
    try {
      const updatedUser = await userService.updateProfile({ charityId });
      set({ isLoading: false });
      return updatedUser;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return null;
    }
  },

  fetchSubscription: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await subscriptionService.getSubscription();
      set({ subscription: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  subscribe: async (plan) => {
    set({ isLoading: true, error: null });
    try {
      const data = await subscriptionService.subscribe(plan);
      set({ subscription: data, isLoading: false });
      return true;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return false;
    }
  },

  // Admin Actions
  fetchAdminUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await adminService.getUsers();
      set({ adminUsers: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchAdminReports: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await adminService.getReports();
      set({ adminReports: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchLatestDraw: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await drawService.getLatestDraw();
      set({ latestDraw: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchAdminLatestDraw: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await drawService.getAdminLatestDraw();
      set({ latestDraw: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  fetchDrawHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await drawService.getHistory();
      set({ drawHistory: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  runDraw: async (drawData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await drawService.runDraw(drawData);
      set({ latestDraw: data, isLoading: false });
      return data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return null;
    }
  },

  publishDrawResults: async (drawId) => {
    set({ isLoading: true, error: null });
    try {
      const data = await drawService.publishResults(drawId);
      set({ latestDraw: data, isLoading: false });
      return data;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return null;
    }
  },

  fetchWinners: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await winnerService.getWinners();
      set({ winners: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  updateWinnerStatus: async (id, status) => {
    set({ isLoading: true, error: null });
    try {
      const updatedWinner = await winnerService.updateStatus(id, status);
      set((state) => ({
        winners: state.winners.map((w) => (w._id === id ? updatedWinner : w)),
        isLoading: false,
      }));
      return true;
    } catch (err) {
      set({ error: err.message, isLoading: false });
      return false;
    }
  },

  fetchMyWinnings: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await winnerService.getMyWinnings();
      set({ myWinnings: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  }
}));

export default useStore;
