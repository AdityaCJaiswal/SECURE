import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { weeklyTrafficData } from "@/data/mockData";

export const BarChart = () => {
  const maxValue = Math.max(...weeklyTrafficData.map((d) => d.value));

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-lg">Weekly Traffic</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between h-48 gap-3">
          {weeklyTrafficData.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="flex-1 flex items-end w-full">
                <div
                  className="w-full rounded-t-lg transition-all duration-300 relative"
                  style={{
                    backgroundColor: item.color,
                    height: `${(item.value / maxValue) * 100}%`,
                    minHeight: "20px",
                  }}
                >
                  {/* Value label */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-300 font-medium">
                    {item.value}
                  </div>
                </div>
              </div>
              <span className="text-gray-400 text-xs mt-2">{item.day}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
