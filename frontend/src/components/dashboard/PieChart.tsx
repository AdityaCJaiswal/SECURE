import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { pieChartData } from "@/data/mockData";

export const PieChart = () => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">U</span>
          </div>
          <CardTitle className="text-white text-sm">Traffic</CardTitle>
        </div>
        <p className="text-xs text-gray-400">$ 10k</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pie Chart */}
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="space-y-2">
          {pieChartData.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-300">{item.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-400 mb-2">
            Distributions of Traffic in Campus
          </p>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">05th - 12th Jan</span>
            </div>
            <div className="space-y-2 mt-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Total Traffic</span>
                <span className="text-white font-medium">18.5k</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">New Visitors</span>
                <span className="text-green-400 font-medium">2.4k +1k</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Repeat Customers</span>
                <span className="text-white font-medium">16.1k</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
