import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (credentials: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
      const { user, token } = response.data;
      set({ user, token, isAuthenticated: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
  },


  checkAuthStatus: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(`${BASE_URL}/auth/validate`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data;
        set({ user, token, isAuthenticated: true });
      } catch (error) {
        console.error('Token validation failed:', error);
        set({ user: null, token: null, isAuthenticated: false });
      }
    }
  },

  register: async (userData: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, userData);
      const { user, token } = response.data;
      set({ user, token, isAuthenticated: true });
    } catch (error) {
      console.error('Registration failed:', error);
    }
  },
}));

export default useAuthStore;
