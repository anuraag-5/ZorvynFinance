"use client";
import * as motion from "motion/react-client";
import Image from "next/image";

import {
    RadialBarChart,
    RadialBar,
    PolarAngleAxis,
    ResponsiveContainer,
} from "recharts";

export default function RadialChart({
    totalValue = 100,
    currentValue = 75,
    color = "#ffffff",
    iconSrc = "/icons/flame.png",
    screenWidth
}: { totalValue: number, currentValue: number, color?: string, iconSrc: string, screenWidth: number }) {
    const percentage = Math.min(100, Math.max(0, (currentValue / totalValue) * 100));
    const data = [{ value: percentage }];

    const barSize = screenWidth < 768 ? 5 : 10;
    const iconCircleSize = screenWidth < 768 ? 30 : 50;
    const iconImgSize = iconCircleSize * 0.48;

    return (
        <motion.div className="relative"
            layout
            transition={{ duration: 0.4 }}
        >
            <ResponsiveContainer width={screenWidth > 768 ? 280 : 200} height={screenWidth > 768 ? 280 : 200}>
                <RadialBarChart
                    data={data}
                    startAngle={90}
                    endAngle={-270}
                    innerRadius="55%"
                    outerRadius="100%"
                    barSize={barSize}
                    cx="50%"
                    cy="50%"
                >
                    <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        tick={false}
                        axisLine={false}
                    />
                    <RadialBar
                        dataKey="value"
                        fill={color}
                        background={{ fill: "rgba(255,255,255,0.05)" }}
                        cornerRadius={0}
                    />
                </RadialBarChart>
            </ResponsiveContainer>
            <motion.div
                style={{
                    width: iconCircleSize,
                    height: iconCircleSize,
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center pointer-events-none"
                layout
                transition={{ duration: 0.4 }}
            >
                <Image
                    src={iconSrc}
                    alt="icon"
                    width={iconImgSize}
                    height={iconImgSize}
                    className="object-contain"
                />
            </motion.div>
        </motion.div>
    );
}