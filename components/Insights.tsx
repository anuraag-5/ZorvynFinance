"use client";

import * as motion from "motion/react-client";
import { useUserStore } from "@/lib/userStore";
import SimpleRadarChart from "./RadarChart";
import AreaChartGraph from "./AreaChartGraph";
import useWidth from "@/lib/hooks";

const Insights = () => {
    const { user } = useUserStore();
    const transactions = user?.transactions || [];
    const width = useWidth();

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    let lastMonth = currentMonth - 1;
    let lastMonthYear = currentYear;
    if (lastMonth < 0) {
        lastMonth = 11;
        lastMonthYear--;
    }

    const categoriesMap = new Map<string, number>();
    let currentMonthExpense = 0;
    let lastMonthExpense = 0;

    transactions.forEach(t => {
        if (t.type === "expense" && t.category !== "Income") {
            const date = new Date(t.date);
            const m = date.getMonth();
            const y = date.getFullYear();

            if (m === currentMonth && y === currentYear) {
                currentMonthExpense += t.amount;
                const val = categoriesMap.get(t.category) || 0;
                categoriesMap.set(t.category, val + t.amount);
            } else if (m === lastMonth && y === lastMonthYear) {
                lastMonthExpense += t.amount;
            }
        }
    });

    const radarData = Array.from(categoriesMap.entries()).map(([subject, amount]) => ({
        subject,
        A: amount
    }));

    let highestCategory = "None";
    let highestAmount = 0;
    radarData.forEach(d => {
        if (d.A > highestAmount) {
            highestAmount = d.A;
            highestCategory = d.subject;
        }
    });

    const areaData = [
        { date: "Last Month", expense: lastMonthExpense },
        { date: "Current Month", expense: currentMonthExpense }
    ];

    const diff = currentMonthExpense - lastMonthExpense;
    const diffPercent = lastMonthExpense > 0 ? ((diff / lastMonthExpense) * 100).toFixed(1) : "N/A";

    let observation = "Not enough data for insights.";
    if (highestAmount > 0) {
        observation = `Your highest spending category this month is ${highestCategory} at ₹${highestAmount.toLocaleString("en-IN")}. `;
        if (lastMonthExpense > 0) {
            if (diff > 0) {
                observation += `You have spent ${diffPercent}% (₹${diff.toLocaleString("en-IN")}) more this month compared to last month.`;
            } else {
                observation += `Great job! You have spent ${Math.abs(Number(diffPercent))}% (₹${Math.abs(diff).toLocaleString("en-IN")}) less this month compared to last month.`;
            }
        } else {
            observation += `No expenses tracked last month for comparison.`;
        }
    }

    return (
        <motion.div
            className="flex flex-col gap-5 w-full max-h-screen overflow-y-auto custom-scrollbar pb-10 text-white"
            layout
            transition={{ duration: 0.4 }}
        >
            <div className="bg-[#1a1a24] rounded-[20px] p-6 border border-[#3e3e50]">
                <h2 className="text-xl font-semibold mb-4">Observation</h2>
                <p className="text-white text-lg leading-relaxed p-4 rounded-xl">
                    {observation}
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 w-full">
                <div className="bg-[#1a1a24] rounded-[20px] p-6 border border-[#3e3e50] flex flex-col items-center justify-between min-h-[400px]">
                    <h3 className="text-xl font-semibold mb-4 w-full text-left">Highest Spending</h3>
                    {radarData.length > 0 ? (
                        <div className="w-full flex-1 ml-[-20px] md:ml-0 overflow-visible">
                            <SimpleRadarChart data={radarData} />
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500 py-10">No expense data this month</div>
                    )}
                </div>

                <div className="bg-[#1a1a24] rounded-[20px] p-6 border border-[#3e3e50] flex flex-col items-center min-h-[400px]">
                    <h3 className="text-xl font-semibold mb-4 w-full text-left">Monthly Comparison</h3>
                    <div className="w-full flex-1 flex flex-col justify-center mt-6 pr-4">
                        <AreaChartGraph data={areaData} width={width} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Insights;
