import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StreakCalendarProps {
  studyDays: Set<string>;
}

export default function StreakCalendar({ studyDays }: StreakCalendarProps) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Get first day of month and total days
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthName = today.toLocaleString('default', { month: 'long' });

  const getDayStatus = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return studyDays.has(dateStr);
  };

  const isToday = (day: number) => {
    return day === today.getDate();
  };

  const isFutureDate = (day: number) => {
    return day > today.getDate();
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{monthName} {currentYear}</h3>
      </div>
      
      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {/* Actual days */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const hasStudied = getDayStatus(day);
          const today = isToday(day);
          const future = isFutureDate(day);

          return (
            <TooltipProvider key={day}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`
                      aspect-square rounded-lg flex items-center justify-center text-sm font-medium
                      transition-all cursor-pointer
                      ${future ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
                      ${hasStudied && !future ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-md hover:shadow-lg' : ''}
                      ${!hasStudied && !future && !today ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' : ''}
                      ${today && !hasStudied ? 'bg-blue-100 border-2 border-blue-500 text-blue-700' : ''}
                      ${today && hasStudied ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white border-2 border-blue-500 shadow-lg' : ''}
                    `}
                  >
                    {day}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    {future ? 'Future date' : hasStudied ? '✅ Studied this day' : today ? '📅 Today' : '❌ No study recorded'}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex gap-6 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gradient-to-br from-green-400 to-emerald-500"></div>
          <span>Studied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-200"></div>
          <span>No study</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-500"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}