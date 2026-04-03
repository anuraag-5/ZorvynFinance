import { Pie, PieChart, Sector, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const RADIAN = Math.PI / 180;
const COLORS = ['#FFCC00', '#DE6969', '#4482DF', '#00C49F', '#FFBB28', '#FF8042'];

const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, payload, percent } = props;

    if (percent < 0.05) return null;

    const radius = Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
    const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
    const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

    return (
        <g>
            <text x={x} y={y - 8} fill="#fff" fontSize={12} fontWeight={600} textAnchor="middle" dominantBaseline="central">
                {payload.name}
            </text>
            <text x={x} y={y + 8} fill="rgba(0,0,0,1)" fontSize={11} textAnchor="middle" dominantBaseline="central">
                {(percent * 100).toFixed(1)}%
            </text>
        </g>
    );
};

export default function PieChartWithCustomizedLabel({
    data,
    isAnimationActive = true,
}: {
    data: any[];
    isAnimationActive?: boolean;
}) {
    if (!data || data.length === 0) {
        return (
            <div className="text-center text-[#555] py-10 mt-10">
                No expense data available
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={350}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius="80%"
                    dataKey="value"
                    isAnimationActive={isAnimationActive}
                    stroke="rgba(255,255,255,0.05)"
                    shape={(props: any) => (
                        <Sector {...props} fill={COLORS[props.index % COLORS.length]} />
                    )} />

                <Tooltip
                    formatter={(value: any, _: any, entry: any) => [
                        `₹${Number(value).toLocaleString('en-IN')}`,
                        entry.payload.name,
                    ]}
                    contentStyle={{
                        backgroundColor: '#0f0f17',
                        borderRadius: '10px',
                        border: '1px solid #FFCC0033',
                    }}
                    itemStyle={{ color: '#FFCC00' }}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}