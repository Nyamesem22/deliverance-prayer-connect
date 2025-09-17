import React from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CalendarGridProps {
  days: Date[];
  currentDate: Date;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  getEventsForDate: (date: Date) => any[];
  getHebrewEventForDate: (date: Date) => any;
  hasEvents: (date: Date) => boolean;
  isSameMonth: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
  isSameDay: (date1: Date, date2: Date) => boolean;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  currentDate,
  selectedDate,
  onSelectDate,
  getEventsForDate,
  getHebrewEventForDate,
  hasEvents,
  isSameMonth,
  isToday,
  isSameDay
}) => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="w-full">
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center font-medium text-sm p-2 text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const hebrewEvent = getHebrewEventForDate(day);
          const isCurrentMonthDay = isSameMonth(day);
          const isDayToday = isToday(day);
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const dayHasEvents = hasEvents(day);

          return (
            <Button
              key={index}
              variant="ghost"
              className={cn(
                "relative h-20 p-1 flex flex-col items-start justify-start text-left transition-colors",
                {
                  // Month styling
                  "text-muted-foreground bg-muted/30": !isCurrentMonthDay,
                  "text-foreground hover:bg-muted": isCurrentMonthDay,
                  
                  // Today styling
                  "bg-primary text-primary-foreground hover:bg-primary/90": isDayToday,
                  
                  // Selected styling
                  "ring-2 ring-primary bg-primary/10": isSelected && !isDayToday,
                  
                  // Events styling
                  "border-2 border-accent": dayHasEvents && !isDayToday && !isSelected
                }
              )}
              onClick={() => onSelectDate(day)}
            >
              {/* Day number */}
              <span className={cn(
                "text-sm font-medium",
                {
                  "text-primary-foreground": isDayToday,
                  "text-foreground": !isDayToday && isCurrentMonthDay,
                  "text-muted-foreground": !isCurrentMonthDay
                }
              )}>
                {format(day, 'd')}
              </span>

              {/* Hebrew date indicator */}
              {hebrewEvent && (
                <div className="absolute top-1 right-1">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    hebrewEvent.isHoliday ? "bg-orange-500" : "bg-blue-500"
                  )} />
                </div>
              )}

              {/* Events indicators */}
              {dayEvents.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1 w-full">
                  {dayEvents.slice(0, 2).map((event, eventIndex) => (
                    <Badge
                      key={eventIndex}
                      variant="secondary"
                      className={cn(
                        "text-xs px-1 py-0 h-4 truncate max-w-full",
                        {
                          "bg-blue-500/20 text-blue-700": event.type === 'Service',
                          "bg-green-500/20 text-green-700": event.type === 'Bible Study',
                          "bg-purple-500/20 text-purple-700": event.type === 'Fellowship',
                          "bg-orange-500/20 text-orange-700": event.type === 'Youth',
                          "bg-pink-500/20 text-pink-700": event.type === 'Children',
                          "bg-red-500/20 text-red-700": event.type === 'Special',
                          "bg-yellow-500/20 text-yellow-700": event.type === 'Holiday'
                        }
                      )}
                    >
                      {event.title.length > 8 ? event.title.substring(0, 8) + '...' : event.title}
                    </Badge>
                  ))}
                  
                  {dayEvents.length > 2 && (
                    <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                      +{dayEvents.length - 2}
                    </Badge>
                  )}
                </div>
              )}

              {/* Hebrew event name */}
              {hebrewEvent && hebrewEvent.isHoliday && (
                <div className="mt-auto w-full">
                  <Badge
                    variant="outline"
                    className="text-xs px-1 py-0 h-4 truncate max-w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400"
                  >
                    {hebrewEvent.holidayName?.split('(')[0].trim()}
                  </Badge>
                </div>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;