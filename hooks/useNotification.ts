import { create } from 'zustand';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { BASE_URL } from '@/constants/url';
import useAuthStore from './useAuthStore';

interface Notification {
  _id?: string;
  title: string;
  description: string;
  type: string;
  userId: string;
  status: string; // Could be 'read' or 'unread'
  createdAt?: Date;
}

interface NotificationStoreState {
  notifications: Notification[];
  notification: Notification;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setNotificationField: (field: keyof Notification, value: any) => void;
  addNotification: (notification: Notification) => Promise<void | AxiosResponse>;
  fetchNotifications: () => Promise<void>;
  updateNotificationStatus: (id: string, status: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  resetNotificationFields: () => void;
}

const initialNotification: Notification = {
  title: '',
  description: '',
  type: '',
  userId: '',
  status: 'unread', // Default to 'unread'
};

const useNotificationStore = create<NotificationStoreState>((set, get) => ({
  notifications: [],
  notification: initialNotification,
  loading: false,

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setNotificationField: (field, value) => {
    set((state) => ({
      notification: { ...state.notification, [field]: value },
    }));
  },

  addNotification: async (notification) => {
    get().setLoading(true);
    try {
      const { token } = useAuthStore.getState();
      const response = await axios.post(
        `${BASE_URL}/notifications`,
        notification,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({ notifications: [...state.notifications, response.data] }));
      return response;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Adding notification failed:', error.response?.data || error.message);
        return error.response;
      }
    } finally {
      get().setLoading(false);
    }
  },

  fetchNotifications: async () => {
    get().setLoading(true);
    try {
      const { token } = useAuthStore.getState();
      const response = await axios.get(`${BASE_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ notifications: response.data });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Fetching notifications failed:', error.response?.data || error.message);
      }
    } finally {
      get().setLoading(false);
    }
  },

  updateNotificationStatus: async (id, status) => {
    get().setLoading(true);
    try {
      const { token } = useAuthStore.getState();
      const response = await axios.put(
        `${BASE_URL}/notifications/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification._id === id ? { ...notification, status } : notification
        ),
      }));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Updating notification status failed:', error.response?.data || error.message);
      }
    } finally {
      get().setLoading(false);
    }
  },

  deleteNotification: async (id) => {
    get().setLoading(true);
    try {
      const { token } = useAuthStore.getState();
      await axios.delete(`${BASE_URL}/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        notifications: state.notifications.filter((notification) => notification._id !== id),
      }));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Deleting notification failed:', error.response?.data || error.message);
      }
    } finally {
      get().setLoading(false);
    }
  },

  resetNotificationFields: () => {
    set({ notification: initialNotification }); // Resetting to initial values
  },
}));

export default useNotificationStore;
