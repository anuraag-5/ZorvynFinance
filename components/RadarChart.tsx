import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface RadarData {
    subject: string;
    A: number;
    fullMark?: number;
}

const SimpleRadarChart = ({ data }: { data: RadarData[] }) => {
    return (
        <ResponsiveContainer width="100%" minHeight={300} maxHeight={400} >
            <RadarChart
                outerRadius="70%"
                data={data}
                margin={{ top: 20, left: 20, right: 20, bottom: 20 }}
            >
                <PolarGrid stroke="#3e3e50" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#666", fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={false} axisLine={false} />
                <Radar name="Amount Spent" dataKey="A" stroke="#FFCC00" fill="#FFCC00" fillOpacity={0.4} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#0f0f17', borderColor: '#3e3e50', borderRadius: '8px' }} 
                    itemStyle={{ color: '#FFCC00' }} 
                />
            </RadarChart>
        </ResponsiveContainer>
    );
};

export default SimpleRadarChart;