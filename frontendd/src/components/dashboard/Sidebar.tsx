import {
  Home,
  LayoutGrid,
  FileText,
  MessageSquare,
  TrendingUp,
  User,
  Settings,
  PieChart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: Home, isActive: true },
  { icon: LayoutGrid, isActive: false },
  { icon: FileText, isActive: false },
  { icon: MessageSquare, isActive: false },
  { icon: TrendingUp, isActive: false },
  { icon: User, isActive: false },
  { icon: Settings, isActive: false },
];

export const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-gray-900 flex flex-col items-center py-4 z-10">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <PieChart className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-4">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200",
                item.isActive
                  ? "bg-white text-gray-900"
                  : "text-gray-400 hover:text-white hover:bg-gray-800",
              )}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </nav>
    </div>
  );
};
