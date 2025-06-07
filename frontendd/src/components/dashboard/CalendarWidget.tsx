import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
const calendarDays = [
  null,
  null,
  null,
  null,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  null,
  null,
  null,
];

const highlightedDays = [4, 5, 6, 7, 8];

export const CalendarWidget = () => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-white text-lg">Calendar</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white"
        >
          View
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Month Selector */}
        <Select defaultValue="feb-2023">
          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 border-gray-600">
            <SelectItem value="feb-2023" className="text-white">
              Feb 2023
            </SelectItem>
            <SelectItem value="jan-2023" className="text-white">
              Jan 2023
            </SelectItem>
            <SelectItem value="mar-2023" className="text-white">
              Mar 2023
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Days of week header */}
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className="text-center text-xs text-gray-400 font-medium py-2"
            >
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`
                text-center text-sm h-8 flex items-center justify-center rounded cursor-pointer
                ${day ? "text-gray-300 hover:bg-gray-700" : ""}
                ${day && highlightedDays.includes(day) ? "bg-yellow-500 text-black font-medium" : ""}
              `}
            >
              {day}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
