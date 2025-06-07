import { Search, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export const Header = () => {
  return (
    <div className="fixed top-0 left-16 right-0 h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 z-10">
      {/* Search Bar */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search here..."
          className="pl-10 bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      {/* Dashboard Title */}
      <div className="flex-1 text-center"></div>

      {/* User Profile */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-white text-sm font-medium">Aditya Jaiswal</p>
          <p className="text-gray-400 text-xs">jaiswal@vellore.org.edu</p>
        </div>
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder.svg" alt="Aditya Jaiswal" />
          <AvatarFallback className="bg-purple-600 text-white text-xs">
            AJ
          </AvatarFallback>
        </Avatar>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};
