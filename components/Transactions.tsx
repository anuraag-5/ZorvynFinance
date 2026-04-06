"use client";

import { useState, useMemo } from "react";
import * as motion from "motion/react-client";
import { useUserStore, Transaction, Category } from "@/lib/userStore";

type Role = "Viewer" | "Admin";

const Transactions = () => {
    const { user, setTransactions, setIncome } = useUserStore();
    const transactions = user?.transactions || [];

    const [role, setRole] = useState<Role>("Viewer");
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<"All" | "income" | "expense">("All");
    const [filterCategory, setFilterCategory] = useState<Category | "All">("All");
    const [sortOrder, setSortOrder] = useState<"date-desc" | "date-asc" | "amount-desc" | "amount-asc">("date-desc");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

    // Form state
    const [formTitle, setFormTitle] = useState("");
    const [formAmount, setFormAmount] = useState("");
    const [formType, setFormType] = useState<"income" | "expense">("expense");
    const [formCategory, setFormCategory] = useState<Category>("Food");
    const [formDate, setFormDate] = useState("");

    const openModal = (transaction?: Transaction) => {
        if (transaction) {
            setEditingTransaction(transaction);
            setFormTitle(transaction.title);
            setFormAmount(transaction.amount.toString());
            setFormType(transaction.type);
            setFormCategory(transaction.category);
            setFormDate(new Date(transaction.date).toISOString().split('T')[0]); // YYYY-MM-DD
        } else {
            setEditingTransaction(null);
            setFormTitle("");
            setFormAmount("");
            setFormType("expense");
            setFormCategory("Food");
            setFormDate(new Date().toISOString().split('T')[0]);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const saveTransactionList = (newTransactions: Transaction[]) => {
        setTransactions(newTransactions);
        localStorage.setItem("transactions", JSON.stringify(newTransactions));

        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        const newTotalIncome = newTransactions
            .filter(t => {
                const date = new Date(t.date);
                return t.type === "income" && date.getMonth() === currentMonth && date.getFullYear() === currentYear;
            })
            .reduce((sum, t) => sum + t.amount, 0);

        setIncome(newTotalIncome);
        localStorage.setItem("income", newTotalIncome.toString());
    }

    const saveTransaction = () => {
        if (!formTitle || !formAmount || !formDate) return;

        const amountNum = parseFloat(formAmount);
        const newTx: Transaction = {
            id: editingTransaction ? editingTransaction.id : Math.random().toString(36).substring(2, 11),
            title: formTitle,
            amount: amountNum,
            type: formType,
            category: formType === "income" ? "Income" : formCategory,
            date: new Date(formDate).toISOString(),
        };

        if (editingTransaction) {
            saveTransactionList(transactions.map(t => t.id === newTx.id ? newTx : t));
        } else {
            saveTransactionList([...transactions, newTx]);
        }
        closeModal();
    };

    const deleteTransaction = (id: string) => {
        saveTransactionList(transactions.filter(t => t.id !== id));
    };

    const processedList = useMemo(() => {
        let mapped = transactions.map((t, index) => ({ t, index }));

        mapped = mapped.filter(({ t }) => {
            const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = filterType === "All" || t.type === filterType;
            const matchesCategory = filterCategory === "All" || t.category === filterCategory;
            return matchesSearch && matchesType && matchesCategory;
        });

        mapped.sort((a, b) => {
            if (sortOrder === "date-desc") {
                const diff = new Date(b.t.date).getTime() - new Date(a.t.date).getTime();
                return diff === 0 ? b.index - a.index : diff;
            }
            if (sortOrder === "date-asc") {
                const diff = new Date(a.t.date).getTime() - new Date(b.t.date).getTime();
                return diff === 0 ? a.index - b.index : diff;
            }
            if (sortOrder === "amount-desc") {
                const diff = b.t.amount - a.t.amount;
                return diff === 0 ? b.index - a.index : diff;
            }
            if (sortOrder === "amount-asc") {
                const diff = a.t.amount - b.t.amount;
                return diff === 0 ? a.index - b.index : diff;
            }
            return 0;
        });

        return mapped.map(item => item.t);
    }, [transactions, searchQuery, filterType, filterCategory, sortOrder]);

    const categories: Category[] = ["Food", "Transport", "Shopping", "Entertainment", "Other", "Income"];

    return (
        <motion.div
            className="flex flex-col gap-5 w-full bg-[#1a1a24] rounded-[20px] p-5 h-full relative"
            layout
            transition={{ duration: 0.4 }}
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex gap-4 items-center">
                    <h2 className="text-lg md:text-2xl font-semibold text-white">Transactions</h2>
                    <div className="flex items-center gap-2 bg-[#2a2a36] rounded-full p-1 border border-[#3e3e50]">
                        <button
                            className={`px-3 py-1 text-sm rounded-full transition-colors ${role === "Viewer" ? "bg-[#FFCC00] text-black" : "text-gray-400"}`}
                            onClick={() => setRole("Viewer")}
                        >
                            Viewer
                        </button>
                        <button
                            className={`px-3 py-1 text-sm rounded-full transition-colors ${role === "Admin" ? "bg-[#FFCC00] text-black" : "text-gray-400"}`}
                            onClick={() => setRole("Admin")}
                        >
                            Admin
                        </button>
                    </div>
                </div>
                {role === "Admin" && (
                    <button
                        onClick={() => openModal()}
                        className="bg-[#FFCC00] text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition-colors"
                    >
                        + Add
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-[#21212b] p-4 rounded-xl">
                <input
                    type="text"
                    placeholder="Search by title..."
                    className="bg-[#1a1a24] text-white px-4 py-2 rounded-lg border border-[#3e3e50] focus:outline-none focus:border-[#FFCC00]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    className="bg-[#1a1a24] text-white px-4 py-2 rounded-lg border border-[#3e3e50] focus:outline-none focus:border-[#FFCC00]"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                >
                    <option value="All">All Types</option>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
                <select
                    className="bg-[#1a1a24] text-white px-4 py-2 rounded-lg border border-[#3e3e50] focus:outline-none focus:border-[#FFCC00]"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value as any)}
                >
                    <option value="All">All Categories</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select
                    className="bg-[#1a1a24] text-white px-4 py-2 rounded-lg border border-[#3e3e50] focus:outline-none focus:border-[#FFCC00]"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as any)}
                >
                    <option value="date-desc">Newest First</option>
                    <option value="date-asc">Oldest First</option>
                    <option value="amount-desc">Highest Amount</option>
                    <option value="amount-asc">Lowest Amount</option>
                </select>
            </div>

            <div className="flex-1 overflow-auto border border-[#3e3e50] rounded-xl rounded-b-none mt-2 custom-scrollbar">
                <table className="w-full text-left min-w-[700px]">
                    <thead className="bg-[#2a2a36] text-gray-400 sticky top-0 z-10">
                        <tr>
                            <th className="p-4 font-medium rounded-tl-xl">Date</th>
                            <th className="p-4 font-medium">Title</th>
                            <th className="p-4 font-medium">Category</th>
                            <th className="p-4 font-medium">Type</th>
                            <th className="p-4 font-medium">Amount</th>
                            {role === "Admin" && <th className="p-4 font-medium text-right rounded-tr-xl">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {processedList.length === 0 ? (
                            <tr>
                                <td colSpan={role === "Admin" ? 6 : 5} className="p-8 text-center text-gray-500">
                                    No transactions found.
                                </td>
                            </tr>
                        ) : (
                            processedList.map((t) => (
                                <tr key={t.id} className="border-b border-[#3e3e50] hover:bg-[#20202b] transition-colors">
                                    <td className="p-4 text-gray-300">
                                        {new Date(t.date).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 font-medium text-white">{t.title}</td>
                                    <td className="p-4">
                                        <span className="bg-[#2a2a36] px-2 py-1 rounded text-xs text-gray-300">
                                            {t.category}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs ${t.type === 'income' ? 'bg-[#22c55e]/10 text-[#22c55e]' : 'bg-[#4482DF]/10 text-[#4482DF]'}`}>
                                            {t.type === "income" ? "Income" : "Expense"}
                                        </span>
                                    </td>
                                    <td className={`p-4 font-semibold ${t.type === 'income' ? 'text-[#22c55e]' : 'text-white'}`}>
                                        ${t.amount.toLocaleString()}
                                    </td>
                                    {role === "Admin" && (
                                        <td className="p-4 flex justify-end gap-2">
                                            <button
                                                onClick={() => openModal(t)}
                                                className="text-[#FFCC00] hover:bg-[#FFCC00]/10 px-2 py-1 rounded text-sm transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteTransaction(t.id)}
                                                className="text-red-400 hover:bg-red-400/10 px-2 py-1 rounded text-sm transition-colors"
                                            >
                                                Del
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#1a1a24] border border-[#3e3e50] rounded-2xl w-full max-w-md p-6 shadow-2xl flex flex-col gap-4"
                    >
                        <h3 className="text-white text-xl font-semibold mb-2">{editingTransaction ? "Edit Transaction" : "New Transaction"}</h3>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-400">Title</label>
                            <input
                                type="text"
                                className="bg-[#2a2a36] text-white px-4 py-2 rounded-lg border border-[#3e3e50] focus:outline-none focus:border-[#FFCC00]"
                                value={formTitle}
                                onChange={e => setFormTitle(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-col gap-2 flex-1">
                                <label className="text-sm text-gray-400">Amount</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="bg-[#2a2a36] text-white px-4 py-2 rounded-lg border border-[#3e3e50] focus:outline-none focus:border-[#FFCC00]"
                                    value={formAmount}
                                    onChange={e => setFormAmount(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <label className="text-sm text-gray-400">Type</label>
                                <select
                                    className="bg-[#2a2a36] text-white px-4 py-2 rounded-lg border border-[#3e3e50] focus:outline-none focus:border-[#FFCC00]"
                                    value={formType}
                                    onChange={e => setFormType(e.target.value as "income" | "expense")}
                                >
                                    <option value="expense">Expense</option>
                                    <option value="income">Income</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-400">Category</label>
                            <select
                                className="bg-[#2a2a36] text-white px-4 py-2 rounded-lg border border-[#3e3e50] focus:outline-none focus:border-[#FFCC00]"
                                value={formType === "income" ? "Income" : formCategory}
                                onChange={e => setFormCategory(e.target.value as Category)}
                                disabled={formType === "income"}
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-gray-400">Date</label>
                            <input
                                type="date"
                                className="bg-[#2a2a36] text-white px-4 py-2 rounded-lg border border-[#3e3e50] focus:outline-none focus:border-[#FFCC00] scheme-dark"
                                value={formDate}
                                onChange={e => setFormDate(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-[#2a2a36] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveTransaction}
                                disabled={!formTitle || !formAmount || !formDate}
                                className="bg-[#FFCC00] text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition-colors disabled:opacity-50"
                            >
                                Save
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default Transactions;
