import { create } from "zustand";
import { api } from "../api/axios";

interface User {
  id: string;
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  login: async (token) => {
    localStorage.setItem("token", token);
    set({ token });
    await useAuthStore.getState().fetchUser();
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  fetchUser: async () => {
    try {
      const { data } = await api.get("/auth/me");
      set({ user: data });
    } catch {
      set({ user: null, token: null });
      localStorage.removeItem("token");
    }
  },
}));
