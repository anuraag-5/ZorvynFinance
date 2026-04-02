import { create } from "zustand";

type User = {
  name: string;
  email: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  getUser: () => {
    email: string;
  };
  clearUser: () => void;
  clearAll: () => void;
};

const getActualUser = () => {
  return {
    email: localStorage.getItem("email") as string,
  };
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  getUser: () => getActualUser(),
  clearUser: () => set({ user: null }),
  clearAll: () => set({ user: null }),
}));
