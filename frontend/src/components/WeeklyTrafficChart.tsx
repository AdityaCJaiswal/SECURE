import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { Calendar } from 'lucide-react';

interface WeeklyTrafficChartProps {
  data: Array<{
    day: string;
    count: number;
  }>;
}

const WeeklyTrafficChart: React.FC<WeeklyTrafficChartProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6B7280'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-xl">
          <p className="text-white font-medium">{`${label}`}</p>
          <p className="text-blue-400 font-semibold">{`${payload[0].value} vehicles`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 h-full flex flex-col shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-green-500/20 rounded-lg">
          <Calendar className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h3 className="text-white text-xl font-semibold">Weekly Overview</h3>
          <p className="text-gray-300 text-sm">Daily traffic comparison</p>
        </div>
      </div>
      
      <div className="flex-1 min-h-0 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            onMouseMove={(state) => {
              if (state.isTooltipActive) {
                setHoveredIndex(state.activeTooltipIndex || null);
              } else {
                setHoveredIndex(null);
              }
            }}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <XAxis 
              dataKey="day" 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="count" 
              radius={[8, 8, 0, 0]}
              className="transition-all duration-200"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]}
                  opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.6}
                  className="transition-opacity duration-200"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyTrafficChart;