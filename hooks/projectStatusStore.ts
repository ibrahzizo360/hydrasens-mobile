import { create } from 'zustand';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { BASE_URL } from '@/constants/url';
import useAuthStore from './useAuthStore';

interface ProjectStatus {
  _id?: string;
  sponsor?: string;
  sponsorWebsite?: string;
  status: string;
  location: string;
  phase: string;
  completionDate?: Date;
  incompleteReason?: string;
}

interface ProjectStatusStoreState {
  projectStatuses: ProjectStatus[];
  projectStatus: ProjectStatus;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setProjectStatusField: (field: keyof ProjectStatus, value: any) => void;
  addProjectStatus: () => Promise<void | AxiosResponse>;
  fetchProjectStatuses: () => Promise<void>;
  resetProjectStatusFields: () => void; 
}

const initialProjectStatus: ProjectStatus = {
  sponsor: '',
  sponsorWebsite: '',
  status: '',
  location: '',
  phase: '',
  completionDate: undefined,
  incompleteReason: '',
};

const useProjectStatusStore = create<ProjectStatusStoreState>((set, get) => ({
  projectStatuses: [],
  projectStatus: initialProjectStatus,
  loading: false,

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setProjectStatusField: (field, value) => {
    set((state) => ({
      projectStatus: { ...state.projectStatus, [field]: value },
    }));
  },

  addProjectStatus: async () => {
    get().setLoading(true);
    try {
      const { projectStatus } = get();
      const { token } = useAuthStore.getState();
      const response = await axios.post(
        `${BASE_URL}/project-status`,
        projectStatus,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({ projectStatuses: [...state.projectStatuses, response.data] }));
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Adding project status failed:', error.response?.data || error.message);
        return error.response;
      }
    } finally {
      get().setLoading(false);
    }
  },

  resetProjectStatusFields: () => {
    set({ projectStatus: initialProjectStatus }); // Resetting to initial values
  },

  fetchProjectStatuses: async () => {
    get().setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/project-status`);
      set({ projectStatuses: response.data });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Fetching project statuses failed:', error.response?.data || error.message);
      }
    } finally {
      get().setLoading(false);
    }
  },
}));

export default useProjectStatusStore;
