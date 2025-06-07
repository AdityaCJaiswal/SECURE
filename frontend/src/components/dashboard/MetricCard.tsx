import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  bgColor: string;
  illustration: string;
}

export const MetricCard = ({
  title,
  value,
  bgColor,
  illustration,
}: MetricCardProps) => {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-0 p-6 text-white",
        bgColor,
      )}
    >
      <div className="relative z-10">
        <h3 className="text-sm font-medium opacity-90 mb-2">{title}</h3>
        <p className="text-3xl font-bold mb-4">{value}</p>
        <button className="text-xs bg-white/20 hover:bg-white/30 transition-colors px-3 py-1 rounded-full">
          View entire list
        </button>
      </div>

      {/* Decorative illustration area */}
      <div className="absolute right-4 top-4 text-4xl opacity-30">
        {illustration}
      </div>

      {/* Abstract shapes for decoration */}
      <div className="absolute -right-6 -top-6 w-20 h-20 bg-white/10 rounded-full"></div>
      <div className="absolute -right-2 bottom-4 w-12 h-12 bg-white/10 rounded-full"></div>
    </Card>
  );
};
