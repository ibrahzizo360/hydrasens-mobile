import { create } from 'zustand';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { BASE_URL } from '@/constants/url';

interface Contribution {
  _id?: string; 
  name: string;
  location: string;
  type: string;
  use: string;
  rating: string;
  comment?: string;
  photos: string[];
  createdAt?: Date;
}

interface ContributionStoreState {
  contributions: Contribution[];
  contribution: Contribution;
  loading: boolean;
  setLoading: (loading: boolean) => void; // New method to set loading state
  setContributionField: (field: keyof Contribution, value: any) => void;
  addContribution: () => Promise<void | AxiosResponse>;
  fetchContributions: () => Promise<void>;
  resetContributionFields: () => void; 
}

const initialContribution: Contribution = {
    name: '',
    location: '',
    type: '',
    use: '',
    rating: '',
    comment: '',
    photos: [],
  };

const useContributionStore = create<ContributionStoreState>((set, get) => ({
  contributions: [],
  contribution: initialContribution,
  loading: false,

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setContributionField: (field, value) => {
    set((state) => ({
      contribution: { ...state.contribution, [field]: value },
    }));
  },

  addContribution: async () => {
    get().setLoading(true);
    try {
      const { contribution } = get();
      const response = await axios.post(`${BASE_URL}/contributions`, contribution);
      set((state) => ({ contributions: [...state.contributions, response.data] }));
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Adding contribution failed:', error.response?.data || error.message);
        return error.response;
      }
    } finally {
      get().setLoading(false);
    }
  },

  resetContributionFields: () => {
    set({ contribution: initialContribution }); // Resetting to initial values
  },

  fetchContributions: async () => {
    get().setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/contributions`);
      set({ contributions: response.data });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Fetching contributions failed:', error.response?.data || error.message);
      }
    } finally {
      get().setLoading(false);
    }
  },
}));

export default useContributionStore;
