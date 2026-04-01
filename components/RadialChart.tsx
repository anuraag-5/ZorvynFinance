"use client";

import {
    RadialBarChart,
    RadialBar,
    PolarAngleAxis,
    ResponsiveContainer,
} from "recharts";

export default function RadialChart({
    width = 340,
    height = 220,
    totalValue = 100,
    currentValue = 75,
    color = "#ffffff",
    iconSrc = "/icons/flame.png",
}) {
    const percentage = Math.min(100, Math.max(0, (currentValue / totalValue) * 100));
    const data = [{ value: percentage }];

    const shorter = Math.min(width, height);
    const barSize = shorter * 0.07;
    const iconCircleSize = shorter * 0.22;
    const iconImgSize = iconCircleSize * 0.48;

    return (
        <div
            style={{ width, height }}
            className="bg-[#1a1a24] rounded-[20px] relative flex items-center justify-center overflow-hidden"
        >
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    data={data}
                    startAngle={91}
                    endAngle={-269}
                    innerRadius="55%"
                    outerRadius="78%"
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
                        cornerRadius={999}
                    />
                </RadialBarChart>
            </ResponsiveContainer>

            {/* Centre icon circle */}
            <div
                style={{
                    width: iconCircleSize,
                    height: iconCircleSize,
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1a1a24] border border-white/10 flex items-center justify-center pointer-events-none"
            >
                <img
                    src={iconSrc}
                    alt="icon"
                    width={iconImgSize}
                    height={iconImgSize}
                    className="object-contain"
                />
            </div>
        </div>
    );
}