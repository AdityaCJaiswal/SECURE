import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { Download, TrendingUp } from 'lucide-react';

interface TrafficChartProps {
  data: Array<{
    hour: string;
    count: number;
  }>;
}

const TrafficChart: React.FC<TrafficChartProps> = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Hour,Count\n" + 
        data.map(row => `${row.hour},${row.count}`).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `traffic-data-${selectedYear}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-xl">
          <p className="text-white font-medium">{`${label}:00`}</p>
          <p className="text-blue-400 font-semibold">{`${payload[0].value} vehicles`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 h-full flex flex-col shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white text-xl font-semibold">Traffic Flow</h3>
            <p className="text-gray-300 text-sm">Hourly vehicle count</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isDownloading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Export</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="hour" 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.7)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
              activeDot={{ 
                r: 7, 
                stroke: '#3B82F6', 
                strokeWidth: 2, 
                fill: '#3B82F6',
                className: 'animate-pulse'
              }}
              className="drop-shadow-sm"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrafficChart;