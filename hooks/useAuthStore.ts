import { create } from 'zustand';
import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@/constants/url';

interface AuthStoreState {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  onBoardingCompleted: boolean;
  login: (credentials: any) => Promise<void | AxiosResponse>;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
  register: (userData: any) => Promise<void | AxiosResponse>;
  setOnBoardingCompleted: (completed: boolean) => Promise<void>;
}

const useAuthStore = create<AuthStoreState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  onBoardingCompleted: false,

  login: async (credentials) => {
    set({ loading: true });
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
      const { user, token } = response.data;
      set({ user, token, isAuthenticated: true });
      return response;
    } catch (error: any) {
      console.error('Login failed:', error);
      return error.response;
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuthStatus: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      set({ loading: true });
      try {
        const response = await axios.get(`${BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data;
        set({ user, token, isAuthenticated: true });
      } catch (error) {
        console.error('Token validation failed:', error);
        set({ user: null, token: null, isAuthenticated: false });
      } finally {
        set({ loading: false });
      }
    }
  },

  register: async (userData) => {
    set({ loading: true });
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, userData);
      const { user, token } = response.data;
      set({ user, token, isAuthenticated: true });
      return response;
    } catch (error: any) {
      console.error('Registration failed:', error.response);
      return error.response;
    } finally {
      set({ loading: false });
    }
  },

  setOnBoardingCompleted: async (completed) => {
    await AsyncStorage.setItem('onBoardingCompleted', JSON.stringify(completed));
    set({ onBoardingCompleted: completed });
  },

  loadOnBoardingStatus: async () => {
    const completed = await AsyncStorage.getItem('onBoardingCompleted');
    set({ onBoardingCompleted: completed === 'true' }); // Convert string to boolean
  },
}));

export default useAuthStore;
