"use client";

import * as motion from "motion/react-client";
import useWidth from "@/lib/hooks";
import SummaryCard from "@/components/SummaryCard";
import { useUserStore } from "@/lib/userStore";

const Dashboard = () => {
    const { user } = useUserStore();
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
    return (
        <motion.div
            layout
            className="flex-1 flex flex-col gap-5 p-5 max-h-screen overflow-y-scroll"
            transition={{ duration: 0.4 }}
        >
            <motion.div
                className="flex flex-col gap-3"
                layout
                transition={{ duration: 0.4 }}
            >
                <motion.div
                    className="flex gap-3"
                    layout
                    transition={{ duration: 0.4 }}
                >
                    <motion.div
                        layout
                        transition={{ duration: 0.4 }}
                    >Dashboard</motion.div>
                    <motion.div
                        layout
                        transition={{ duration: 0.4 }}
                    >Transactions</motion.div>
                </motion.div>
                <motion.div className="grid grid-cols-1 xl:grid-cols-2 gap-6 place-items-center md:place-items-start">
                    <motion.div className="w-full max-w-[540px]">
                        <motion.div
                            className="bg-[#1a1a24] rounded-[20px] flex md:gap-2 md:pl-9 md:pr-6 pl-6 pr-3 justify-between items-center"
                            layout
                            transition={{ duration: 0.4 }}
                        >
                            <motion.div
                                layout
                                transition={{ duration: 0.4 }}>
                                <motion.div className="text-2xl md:text-4xl"
                                    layout
                                    transition={{ duration: 0.4 }}>{totalIncome - totalExpenses}</motion.div>
                                <motion.div className="text-[8px] md:text-xs"
                                    layout
                                    transition={{ duration: 0.4 }}>Balance Left</motion.div>
                            </motion.div>
                            <SummaryCard
                                classname=""
                                totalValue={totalIncome}
                                currentValue={totalExpenses}
                                screenWidth={width}
                                iconSrc="/money.svg"
                            />
                        </motion.div>
                    </motion.div>
                    <motion.div className="flex flex-col gap-2 w-full max-w-[540px]">
                        <motion.div>
                            <motion.div
                                className="bg-[#1a1a24] rounded-[20px] flex md:gap-2 md:pl-9 md:pr-6 pl-6 pr-3 justify-between items-center"
                                layout
                                transition={{ duration: 0.4 }}
                            >
                                <motion.div
                                    layout
                                    transition={{ duration: 0.4 }}>
                                    <motion.div className="text-2xl md:text-4xl"
                                        layout
                                        transition={{ duration: 0.4 }}>{totalIncome - totalExpenses}</motion.div>
                                    <motion.div className="text-[8px] md:text-xs"
                                        layout
                                        transition={{ duration: 0.4 }}>Balance Left</motion.div>
                                </motion.div>
                                <SummaryCard
                                    classname=""
                                    totalValue={totalIncome}
                                    currentValue={totalExpenses}
                                    screenWidth={width}
                                    iconSrc="/money.svg"
                                />
                            </motion.div>
                        </motion.div>
                        <motion.div></motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
            <div></div>
            <div></div>
        </motion.div>
    );
};

export default Dashboard