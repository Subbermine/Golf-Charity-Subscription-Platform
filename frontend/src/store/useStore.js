import { create } from 'zustand';
import { scoreService, charityService, subscriptionService } from '../services/api';

const useStore = create((set) => ({
  scores: [],
  charities: [],
  subscription: null,
  isLoading: false,
  error: null,

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
      const newScore = await scoreService.addScore(scoreData);
      set((state) => ({ 
        scores: [newScore, ...state.scores].slice(0, 5), 
        isLoading: false 
      }));
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
  }
}));

export default useStore;
