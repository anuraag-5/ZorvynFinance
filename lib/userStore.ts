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
  setUser: (email: string) => void;
  setIncome: (income: number) => void;
  setTransactions: (transactions: Transaction[]) => void;
  getUser: () => {
    email: string;
  };
  getIncome: () => number;
  getTransactions: () => Transaction[];
  clearUser: () => void;
  clearAll: () => void;
};

const getActualUser = () => {
  return {
    email: localStorage.getItem("email") as string,
  };
};

const getActualIncome = (): number => {
  const income = localStorage.getItem("income");
  return income ? Number(income) : 80000;
};

const getActualTransactions = (): Transaction[] => {
  const transactions = localStorage.getItem("transactions");
  return transactions ? JSON.parse(transactions) : [];
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (email) =>
    set((state) => ({
      user: {
        email,
        name: state.user?.name || "Zorvyn",
        income: state.user?.income || 0,
        transactions: state.user?.transactions || [],
      },
    })),
  setIncome: (income) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, income }
        : { email: "", name: "Zorvyn", income, transactions: [] },
    })),
  setTransactions: (transactions) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, transactions }
        : { email: "", name: "Zorvyn", income: 0, transactions },
    })),
  getUser: () => getActualUser(),
  getIncome: () => getActualIncome(),
  getTransactions: () => getActualTransactions(),
  clearUser: () => set({ user: null }),
  clearAll: () => set({ user: null }),
}));
