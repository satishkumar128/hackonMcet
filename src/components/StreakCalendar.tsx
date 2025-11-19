import React from 'react';
import { format, subDays } from 'date-fns';

interface StreakCalendarProps {
  completedDates: Array<string | Date>;
  days?: number; // number of days to show (default 30)
}

function toYMD(date: Date) {
  return format(date, 'yyyy-MM-dd');
}

export default function StreakCalendar({ completedDates, days = 30 }: StreakCalendarProps) {
  const completedSet = new Set(
    (completedDates || []).map((d) => (typeof d === 'string' ? d.split('T')[0] : toYMD(d as Date))),
  );

  const today = new Date();
  // build array from oldest -> newest
  const daysArray = Array.from({ length: days }).map((_, i) => {
    const dt = subDays(today, days - 1 - i);
    const ymd = toYMD(dt);
    return { date: dt, ymd, completed: completedSet.has(ymd) };
  });

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-1">
        {daysArray.map((d) => (
          <div
            key={d.ymd}
            title={format(d.date, 'PPP')}
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded ${d.completed ? 'bg-green-500' : 'bg-gray-200'} transition-transform hover:scale-110`}
            aria-label={`Date ${d.ymd} - ${d.completed ? 'completed' : 'not completed'}`}
          />
        ))}
      </div>
    </div>
  );
}
