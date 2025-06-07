import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { trafficData } from "@/data/mockData";

export const TrafficChart = () => {
  return (
    <Card className="bg-gray-800 border-gray-700 col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white text-lg">Traffic</CardTitle>
        <div className="flex items-center gap-2">
          <Select defaultValue="2024">
            <SelectTrigger className="w-20 bg-gray-700 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="2024" className="text-white">
                2024
              </SelectItem>
              <SelectItem value="2023" className="text-white">
                2023
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="sm"
            className="bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
              <YAxis
                stroke="#9CA3AF"
                fontSize={12}
                domain={[0, 300]}
                ticks={[0, 25, 50, 75, 100, 125, 150]}
              />
              <Legend wrapperStyle={{ color: "#9CA3AF" }} iconType="line" />
              <Line
                type="monotone"
                dataKey="toys"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ fill: "#8B5CF6", strokeWidth: 0, r: 4 }}
                name="Toys"
              />
              <Line
                type="monotone"
                dataKey="animalCare"
                stroke="#10B981"
                strokeWidth={3}
                strokeDasharray="8 8"
                dot={{ fill: "#10B981", strokeWidth: 0, r: 4 }}
                name="Animal Care Products"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Character illustration placeholder */}
        <div className="absolute bottom-4 right-8 text-4xl">👩‍💼</div>
      </CardContent>
    </Card>
  );
};
