import { create } from "zustand";

export type Category =
  | "Food"
  | "Transport"
  | "Shopping"
  | "Entertainment"
  | "Other"
  | "Income";

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: Category;
  date: string;
};

type User = {
  name: string;
  email: string;
  income: number;
  transactions: Transaction[];
};

type UserStore = {
  user: User | null;
  setUser: ({
    email,
    income,
    transactions,
  }: {
    email: string;
    income: number;
    transactions: Transaction[];
  }) => void;
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
  setUser: ({ email, income, transactions }) =>
    set({ user: { email, name: "Zorvyn", income, transactions } }),
  getUser: () => getActualUser(),
  clearUser: () => set({ user: null }),
  clearAll: () => set({ user: null }),
}));
