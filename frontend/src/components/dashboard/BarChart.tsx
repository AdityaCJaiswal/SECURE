import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { weeklyTrafficData } from "@/data/mockData";

export const BarChart = () => {
  const maxValue = Math.max(...weeklyTrafficData.map((d) => d.value));

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pt-9 px-6 pb-6">
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
                    minHeight:
                      item.value >= 100
                        ? "120px"
                        : item.value >= 60
                          ? "70px"
                          : "20px",
                  }}
                >
                  {/* Value label */}
                  <div
                    className="absolute text-xs text-gray-300 font-medium"
                    style={{
                      left: index % 2 === 0 ? "3px" : "5px",
                      top: (() => {
                        switch (index) {
                          case 0:
                            return "-64px"; // Mon (120)
                          case 1:
                            return "-116px"; // Tue (80)
                          case 2:
                            return "-67px"; // Wed (100)
                          case 3:
                            return "-118px"; // Thu (60)
                          case 4:
                            return "-69px"; // Fri (140)
                          case 5:
                            return "-120px"; // Sat (90)
                          default:
                            return "-120px";
                        }
                      })(),
                    }}
                  >
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
