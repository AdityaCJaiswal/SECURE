import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, startOfWeek, endOfWeek } from 'date-fns';

interface CalendarProps {
  data?: Array<{
    date: string;
    count: number;
  }>;
}

const Calendar: React.FC<CalendarProps> = ({ data = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getTrafficCount = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayData = data.find(d => d.date === dateStr);
    return dayData?.count || 0;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(selectedDate?.getTime() === date.getTime() ? null : date);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 h-full flex flex-col shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <CalendarIcon className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-white text-xl font-semibold">Activity Calendar</h3>
            <p className="text-gray-300 text-sm">Monthly traffic overview</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-white font-medium px-3 min-w-[100px] text-center">
            {format(currentDate, 'MMM yyyy')}
          </span>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-3">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-gray-400 text-xs font-medium p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid with fixed height */}
        <div className="grid grid-cols-7 gap-1 flex-1">
          {days.map((day) => {
            const trafficCount = getTrafficCount(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isCurrentDay = isToday(day);
            const isSelected = selectedDate?.getTime() === day.getTime();

            return (
              <button
                key={day.toISOString()}
                onClick={() => handleDateClick(day)}
                className={`
                  h-8 w-full flex items-center justify-center text-xs rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-105 active:scale-95 relative
                  ${isCurrentMonth ? 'text-white' : 'text-gray-600'}
                  ${isCurrentDay ? 'bg-blue-500 text-white shadow-lg font-bold' : 'hover:bg-white/10'}
                  ${isSelected ? 'ring-2 ring-purple-400' : ''}
                  ${trafficCount > 50 ? 'bg-red-500 text-white font-bold' : ''}
                  ${trafficCount > 20 && trafficCount <= 50 ? 'bg-orange-500 text-white' : ''}
                  ${trafficCount > 0 && trafficCount <= 20 ? 'bg-green-500 text-white' : ''}
                `}
              >
                {format(day, 'd')}
                {trafficCount > 0 && (
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected date info */}
        {selectedDate && (
          <div className="bg-white/10 rounded-lg p-3 mt-4 border border-white/20">
            <p className="text-white text-sm font-medium">
              {format(selectedDate, 'MMMM d, yyyy')}
            </p>
            <p className="text-gray-300 text-xs">
              Traffic: {getTrafficCount(selectedDate)} vehicles
            </p>
          </div>
        )}

        {/* Legend */}
        <div className="mt-4 pt-3 border-t border-white/20">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-400">Low (1-20)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span className="text-gray-400">Medium (21-50)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-gray-400">High (50+)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;