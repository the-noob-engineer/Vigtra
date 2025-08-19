import { writable } from 'svelte/store';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: {
    id: '1',
    name: 'Admin User',
    email: 'admin@insuranceos.com',
    role: 'System Administrator'
  },
  isAuthenticated: true,
  loading: false
};

export const auth = writable<AuthState>(initialState);

export const login = async (email: string, password: string) => {
  auth.update(state => ({ ...state, loading: true }));
  
  // Mock authentication - in real app this would call API
  setTimeout(() => {
    auth.set({
      user: {
        id: '1',
        name: 'Admin User',
        email,
        role: 'System Administrator'
      },
      isAuthenticated: true,
      loading: false
    });
  }, 1000);
};

export const logout = () => {
  auth.set({
    user: null,
    isAuthenticated: false,
    loading: false
  });
};