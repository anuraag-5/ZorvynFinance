"use client";

import * as motion from "motion/react-client";
import useWidth from "@/lib/hooks";
import SummaryCard from "@/components/SummaryCard";
import AreaChartGraph from "@/components/AreaChartGraph";
import PieChartWithCustomizedLabel from "@/components/PieChart";
import { useUserStore } from "@/lib/userStore";
import { useState } from "react";
import Transactions from "@/components/Transactions";
import Insights from "@/components/Insights";

const Dashboard = () => {
    const { user } = useUserStore();
    const [currentTab, setCurrentTab] = useState<string>("Dashboard");
    const width = useWidth();
    const transactions = user?.transactions;

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const totalIncome = user?.income ?? 45000;

    const totalExpenses = transactions?.reduce((acc, transaction) => {
        const date = new Date(transaction.date);
        const isCurrentMonth = date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        if (isCurrentMonth && (transaction.category !== "Income" && transaction.type === "expense")) {
            return acc + transaction.amount;
        }
        return acc;
    }, 0) || 0;

    const pieChartData = Array.from(transactions?.reduce((acc, t) => {
        const date = new Date(t.date);
        const isCurrentMonth = date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        if (isCurrentMonth && t.type === "expense" && t.category !== "Income") {
            const currentVal = acc.get(t.category) || 0;
            acc.set(t.category, currentVal + t.amount);
        }
        return acc;
    }, new Map<string, number>()) || []).map(([name, value]) => ({ name, value, totalIncome }));

    const currentDay = today.getDate();
    const chartData = Array.from({ length: currentDay }, (_, i) => {
        const day = i + 1;
        const totalDayExpense = transactions?.reduce((acc, transaction) => {
            const date = new Date(transaction.date);
            const isTargetDay = date.getDate() === day && date.getMonth() === currentMonth && date.getFullYear() === currentYear;
            if (isTargetDay && (transaction.category !== "Income" && transaction.type === "expense")) {
                return acc + transaction.amount;
            }
            return acc;
        }, 0) || 0;
        return { date: day, expense: totalDayExpense };
    });
    return (
        <motion.div
            layout
            className="flex-1 flex flex-col gap-5 p-5 max-h-screen overflow-y-scroll"
            transition={{ duration: 0.4 }}
        >
            <motion.div
                className="flex gap-5 mt-5"
                layout
                transition={{ duration: 0.4 }}
            >
                <motion.div
                    layout
                    transition={{ duration: 0.4 }}
                    className={"relative text-black dark:text-[#FFCC00] p-3 rounded-lg cursor-pointer text-xs md:text-[16px]"}
                    onClick={() => setCurrentTab("Dashboard")}
                >
                    {
                        currentTab === "Dashboard" && <motion.div className="absolute inset-0 bg-[#FFCC00] dark:bg-[#4f4932] rounded-lg z-0"
                            layoutId="tab-bg"
                        ></motion.div>
                    }
                    <motion.div className="relative z-10">Dashboard</motion.div>
                </motion.div>
                <motion.div
                    layout
                    transition={{ duration: 0.4 }}
                    className={"relative text-black dark:text-[#FFCC00] p-3 rounded-lg cursor-pointer  text-xs md:text-[16px]"}
                    onClick={() => setCurrentTab("Transactions")}
                >
                    {
                        currentTab === "Transactions" && <motion.div className="absolute inset-0 bg-[#FFCC00] dark:bg-[#4f4932] rounded-lg z-0"
                            layoutId="tab-bg"
                        ></motion.div>
                    }
                    <motion.div className="relative z-10">Transactions</motion.div>
                </motion.div>
                <motion.div
                    layout
                    transition={{ duration: 0.4 }}
                    className={"relative text-black dark:text-[#FFCC00] p-3 rounded-lg cursor-pointer  text-xs md:text-[16px]"}
                    onClick={() => setCurrentTab("Insights")}
                >
                    {
                        currentTab === "Insights" && <motion.div className="absolute inset-0 bg-[#FFCC00] dark:bg-[#4f4932] rounded-lg z-0"
                            layoutId="tab-bg"
                        ></motion.div>
                    }
                    <motion.div className="relative z-10">Insights</motion.div>
                </motion.div>
            </motion.div>

            {
                currentTab === "Dashboard" ? (
                    <>
                        <motion.div
                            className="flex flex-col gap-6 xl:gap-10"
                            layout
                            transition={{ duration: 0.4 }}
                        >
                            <motion.div className="grid grid-cols-1 xl:grid-cols-2 gap-3 place-items-center md:place-items-start">
                                <motion.div className="w-full h-full">
                                    <motion.div
                                        className="bg-[#1a1a24] text-white rounded-[20px] flex md:gap-2 md:pl-9 md:pr-6 pl-6 pr-3 justify-between items-center min-h-full"
                                        layout
                                        transition={{ duration: 0.4 }}
                                    >
                                        <motion.div
                                            layout
                                            transition={{ duration: 0.4 }}>
                                            <motion.div className="text-2xl md:text-4xl xl:text-6xl"
                                                layout
                                                transition={{ duration: 0.4 }}>{totalIncome - totalExpenses}</motion.div>
                                            <motion.div className="text-[10px] md:text-sm"
                                                layout
                                                transition={{ duration: 0.4 }}>Balance Left</motion.div>
                                        </motion.div>
                                        <SummaryCard
                                            classname=""
                                            totalValue={totalIncome}
                                            currentValue={totalExpenses}
                                            screenWidth={width}
                                            iconSrc="/money.svg"
                                            type="Balance"
                                        />
                                    </motion.div>
                                </motion.div>
                                <motion.div className="flex flex-col justify-between gap-3 w-full h-full">
                                    <motion.div>
                                        <motion.div
                                            className="bg-[#1a1a24] text-white rounded-[20px] flex md:gap-2 md:pl-9 md:pr-6 pl-6 pr-3 justify-between items-center"
                                            layout
                                            transition={{ duration: 0.4 }}
                                        >
                                            <motion.div
                                                layout
                                                transition={{ duration: 0.4 }}>
                                                <motion.div className="text-2xl md:text-4xl"
                                                    layout
                                                    transition={{ duration: 0.4 }}>{totalIncome}</motion.div>
                                                <motion.div className="text-[8px] md:text-xs"
                                                    layout
                                                    transition={{ duration: 0.4 }}>Total Income</motion.div>
                                            </motion.div>
                                            <SummaryCard
                                                classname=""
                                                totalValue={totalIncome}
                                                currentValue={totalIncome}
                                                screenWidth={width}
                                                iconSrc="/money.svg"
                                                type="Income"
                                                color="#DE6969"
                                            />
                                        </motion.div>
                                    </motion.div>
                                    <motion.div>
                                        <motion.div
                                            className="bg-[#1a1a24] text-white rounded-[20px] flex md:gap-2 md:pl-9 md:pr-6 pl-6 pr-3 justify-between items-center"
                                            layout
                                            transition={{ duration: 0.4 }}
                                        >
                                            <motion.div
                                                layout
                                                transition={{ duration: 0.4 }}>
                                                <motion.div className="text-2xl md:text-4xl"
                                                    layout
                                                    transition={{ duration: 0.4 }}>{totalExpenses}</motion.div>
                                                <motion.div className="text-[8px] md:text-xs"
                                                    layout
                                                    transition={{ duration: 0.4 }}>Total Expense</motion.div>
                                            </motion.div>
                                            <SummaryCard
                                                classname=""
                                                totalValue={totalIncome}
                                                currentValue={totalExpenses}
                                                screenWidth={width}
                                                iconSrc="/money.svg"
                                                type="Expense"
                                                color="#4482DF"
                                            />
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                        <motion.div className="flex flex-col xl:flex-row gap-5 w-full mt-5">
                            <motion.div className="bg-[#1a1a24] text-white rounded-[20px] p-5 w-full xl:w-2/3">
                                <div className="mb-14 text-xl">Time Based Visualisation (Monthly)</div>
                                <AreaChartGraph data={chartData} width={width} />
                            </motion.div>
                            <motion.div className="bg-[#1a1a24] text-white rounded-[20px] p-5 w-full xl:w-1/3">
                                <div className="mb-4 text-xl">Categorical Expenses</div>
                                <PieChartWithCustomizedLabel data={pieChartData} />
                            </motion.div>
                        </motion.div>
                    </>
                ) : currentTab === "Transactions" ? (

                    <motion.div className="flex-1 flex max-h-min" layout>
                        <Transactions />
                    </motion.div>

                ) : (
                    <motion.div className="flex-1 flex" layout>
                        <Insights />
                    </motion.div>
                )
            }
        </motion.div>
    );
};

export default Dashboard;