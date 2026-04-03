"use client";

import { useState, useEffect } from "react";
import * as motion from "motion/react-client";
import { useUserStore } from "@/lib/userStore";

const Configuration = () => {
    const { user, setUser, setIncome, setTransactions } = useUserStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [income, setIncomeVal] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const storedEmail = localStorage.getItem("email") || "";
        const storedPassword = localStorage.getItem("password") || "";
        const storedIncome = localStorage.getItem("income") || "80000";
        setEmail(storedEmail);
        setPassword(storedPassword);
        setIncomeVal(storedIncome);
    }, []);

    const handleSave = () => {
        if (!email || !password) {
            setMessage("Email and password cannot be empty.");
            return;
        }

        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("income", income);
        setUser(email);
        
        let tx = user?.transactions || [];
        const newIncomeVal = Number(income);
        const baseIncomeTxIndex = tx.findIndex(t => t.type === "income");
        
        if (baseIncomeTxIndex !== -1) {
            tx = [...tx];
            tx[baseIncomeTxIndex] = { ...tx[baseIncomeTxIndex], amount: newIncomeVal };
            setTransactions(tx);
            localStorage.setItem("transactions", JSON.stringify(tx));
        }

        const newTotalIncome = tx
            .filter(t => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);

        setIncome(newTotalIncome);
        localStorage.setItem("income", newTotalIncome.toString());

        setMessage("Credentials & Income updated successfully!");

        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    return (
        <motion.div
            layout
            className="flex-1 p-5 md:p-10 max-h-screen overflow-y-auto"
            transition={{ duration: 0.4 }}
        >
            <div className="max-w-xl mx-auto bg-[#1a1a24] rounded-[20px] p-6 md:p-8 border border-[#3e3e50] shadow-xl mt-10">
                <h1 className="text-2xl font-semibold mb-6">Configuration</h1>

                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Email Address</label>
                        <input
                            type="email"
                            className="bg-[#2a2a36] text-white px-4 py-3 rounded-lg border border-[#3e3e50] focus:outline-none focus:border-[#FFCC00] transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter new email"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Password</label>
                        <input
                            type="text"
                            className="bg-[#2a2a36] text-white px-4 py-3 rounded-lg border border-[#3e3e50] focus:outline-none focus:border-[#FFCC00] transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-400">Total Base Income</label>
                        <input
                            type="number"
                            className="bg-[#2a2a36] text-white px-4 py-3 rounded-lg border border-[#3e3e50] focus:outline-none focus:border-[#FFCC00] transition-colors"
                            value={income}
                            onChange={(e) => setIncomeVal(e.target.value)}
                            placeholder="Enter base income"
                        />
                    </div>

                    {message && (
                        <div className={`p-3 rounded-lg text-sm mt-2 ${message.includes("successfully") ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                            {message}
                        </div>
                    )}

                    <button
                        onClick={handleSave}
                        className="mt-4 w-full bg-[#FFCC00] text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Configuration;