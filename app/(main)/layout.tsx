"use client";

import * as motion from "motion/react-client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutGroup } from "motion/react";
import { signOut } from "@/lib/auth";
import { useUserStore, Transaction, Category } from "@/lib/userStore";
import NavbarMobile from "@/components/MobileNav";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { setUser, setIncome, setTransactions } = useUserStore();
    useEffect(() => {
        const email = localStorage.getItem("email");
        if (!email) {
            router.push("/");
            signOut();
            return;
        }
        const password = localStorage.getItem("password");
        if (!password) {
            router.push("/");
            signOut();
            return;
        }
        const income = localStorage.getItem("income");
        const parsedIncome = income ? Number(income) : 60000;
        if (!income) {
            localStorage.setItem("income", parsedIncome.toString())
        }

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const currentDay = today.getDate();

        const cutoffDate = new Date(year, month - 1, 1);

        let parsedTransactions: Transaction[] = [];
        const rawTransactions = localStorage.getItem("transactions");
        if (rawTransactions) {
            parsedTransactions = JSON.parse(rawTransactions);

            const originalLength = parsedTransactions.length;
            parsedTransactions = parsedTransactions.filter(t => new Date(t.date) >= cutoffDate);

            if (parsedTransactions.length !== originalLength) {
                localStorage.setItem("transactions", JSON.stringify(parsedTransactions));
            }

            if (currentDay === 1) {
                const hasIncomeThisMonth = parsedTransactions.some(t => {
                    const date = new Date(t.date);
                    return t.type === "income" && date.getFullYear() === year && date.getMonth() === month;
                });

                if (!hasIncomeThisMonth) {
                    parsedTransactions.push({
                        id: Math.random().toString(36).substring(2, 11),
                        title: "Salary",
                        amount: parsedIncome,
                        type: "income",
                        category: "Income",
                        date: new Date(year, month, 1).toISOString(),
                    });
                    localStorage.setItem("transactions", JSON.stringify(parsedTransactions));
                }
            }
        } else {
            const categories: Category[] = ["Food", "Transport", "Shopping", "Entertainment", "Other"];
            const titles = ["Groceries", "Uber", "Amazon", "Netflix", "Misc"];

            for (let day = 1; day <= currentDay; day++) {
                const numTransactions = Math.floor(Math.random() * 3) + 1;
                for (let i = 0; i < numTransactions; i++) {
                    const date = new Date(year, month, day);
                    const randomCategoryIdx = Math.floor(Math.random() * categories.length);
                    parsedTransactions.push({
                        id: Math.random().toString(36).substring(2, 11),
                        title: titles[randomCategoryIdx],
                        amount: Math.floor(Math.random() * 5000) + 100,
                        type: "expense",
                        category: categories[randomCategoryIdx],
                        date: date.toISOString(),
                    });
                }
            }
            parsedTransactions.push({
                id: Math.random().toString(36).substring(2, 11),
                title: "Salary",
                amount: parsedIncome,
                type: "income",
                category: "Income",
                date: new Date(year, month, 1).toISOString(),
            });

            localStorage.setItem("transactions", JSON.stringify(parsedTransactions));
        }

        setUser(email);
        setIncome(parsedIncome);
        setTransactions(parsedTransactions);
    }, [])
    return (
        <LayoutGroup>
            <motion.div layout className="flex-1 flex flex-col md:flex-row">
                <NavbarMobile />
                <Navbar />
                {children}
            </motion.div>
        </LayoutGroup>
    );
};

export default MainLayout;