import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns';
import { useStore } from '../../lib/store';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

export default function Calendar({ selectedDate, onChange }: CalendarProps) {
  const { diaryEntries, plannerTasks } = useStore();

  const days = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  });

  const hasEntries = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return (
      diaryEntries.some((entry) => entry.date === formattedDate) ||
      plannerTasks.some((task) => task.date === formattedDate)
    );
  };

  return (
    <div className="retro-card">
      <div className="flex items-center justify-between mb-4">
        <button
          className="retro-button p-2"
          onClick={() =>
            onChange(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))
          }
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-bold">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
        <button
          className="retro-button p-2"
          onClick={() =>
            onChange(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))
          }
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center font-medium text-sm py-2"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const isSelected = isSameDay(day, selectedDate);
          const hasContent = hasEntries(day);

          return (
            <button
              key={day.toString()}
              onClick={() => onChange(day)}
              className={`
                p-2 text-sm rounded-md relative
                ${!isSameMonth(day, selectedDate) && 'text-gray-400'}
                ${isSelected && 'bg-[#ffd4e5]'}
                ${isToday(day) && 'font-bold'}
                hover:bg-[#d4e5ff]
              `}
            >
              {format(day, 'd')}
              {hasContent && (
                <span className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-blue-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}