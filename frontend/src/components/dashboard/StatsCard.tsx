import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { statsData } from "@/data/mockData";

export const StatsCard = () => {
  return (
    <Card className="bg-gray-800 border-gray-700 pt-[97px]">
      <CardContent className="pt-8 px-6 pb-6 mb-16 space-y-4">
        {/* Known Visitors */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">Known Visitors</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {statsData.knownVisitors}
          </div>
          <Progress value={85} className="h-2 bg-gray-700" />
        </div>

        {/* Unknown Visitors */}
        <div className="space-y-3 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">Unknown Visitors</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {statsData.unknownVisitors}
          </div>
          <Progress value={25} className="h-2 bg-gray-700" />
        </div>
      </CardContent>
    </Card>
  );
};
