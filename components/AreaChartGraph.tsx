import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface ChartData {
    date: number | string;
    expense: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div
            style={{
                background: "#0f0f17",
                border: "1px solid #FFCC0033",
                borderRadius: "10px",
                padding: "10px 16px",
            }}
        >
            <p style={{ margin: 0, color: "#888", fontSize: "12px" }}>{typeof label === 'number' || !isNaN(Number(label)) ? `Day ${label}` : label}</p>
            <p style={{ margin: "4px 0 0", color: "#FFCC00", fontSize: "18px", fontWeight: 600 }}>
                ₹{Number(payload[0].value).toLocaleString("en-IN")}
            </p>
        </div>
    );
};

const AreaChartGraph = ({ data, width }: { data: ChartData[], width: number }) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <AreaChart
                data={data}
                margin={{ top: 10, right: 20, left: width > 768 ? 10 : 0, bottom: width > 768 ? 30 : 18 }}
            >
                <defs>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFCC00" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#FFCC00" stopOpacity={0.02} />
                    </linearGradient>
                </defs>

                <CartesianGrid
                    vertical={false}
                    stroke="rgba(255,255,255,0.05)"
                />

                <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#666", fontSize: 12 }}
                    tickFormatter={width > 768 ? undefined : (val) => val}
                />

                <YAxis
                    axisLine={false}
                    tickLine={false}
                    width={70}
                    tick={{ fill: "#666", fontSize: 12 }}
                    tickFormatter={(value: number) =>
                        value >= 1000
                            ? `₹${(value / 1000).toFixed(0)}k`
                            : `₹${value}`
                    }
                />

                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.08)" }} />

                <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="#FFCC00"
                    strokeWidth={2}
                    fill="url(#expenseGradient)"
                    dot={false}
                    activeDot={{ r: 5, fill: "#FFCC00", stroke: "#0f0f17", strokeWidth: 2 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default AreaChartGraph;