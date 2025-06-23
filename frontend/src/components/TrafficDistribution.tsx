import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Users } from 'lucide-react';

interface TrafficDistributionProps {
  data: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
}

const TrafficDistribution: React.FC<TrafficDistributionProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const COLORS = {
    faculty: '#10B981',
    workers: '#F59E0B',
    students: '#EF4444',
    strangers: '#6B7280'
  };

  const pieData = data.map(item => ({
    name: item.type,
    value: item.count,
    percentage: item.percentage
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-xl">
          <p className="text-white font-medium capitalize">{payload[0].name}</p>
          <p className="text-gray-300">{`Count: ${payload[0].value.toLocaleString()}`}</p>
          <p className="text-gray-300">{`Percentage: ${payload[0].payload.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 h-full flex flex-col shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-orange-500/20 rounded-lg">
          <Users className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <h3 className="text-white text-xl font-semibold">Visitor Types</h3>
          <p className="text-gray-300 text-sm">Distribution breakdown</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center min-h-0">
        <div className="w-48 h-48 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.name as keyof typeof COLORS]}
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                    className="transition-opacity duration-200 cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full space-y-3">
          {data.map((item, index) => (
            <div 
              key={item.type} 
              className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer hover:bg-white/10 ${
                activeIndex === index ? 'bg-white/10' : ''
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[item.type as keyof typeof COLORS] }}
                ></div>
                <span className="text-white capitalize font-medium">{item.type}</span>
              </div>
              <div className="text-right">
                <div className="text-white font-bold">{item.count.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">{item.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrafficDistribution;