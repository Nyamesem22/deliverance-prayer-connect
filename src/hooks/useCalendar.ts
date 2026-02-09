import { useState, useEffect, useMemo } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import Hebcal from 'hebcal';

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  type: 'Service' | 'Bible Study' | 'Fellowship' | 'Ministry' | 'Youth' | 'Children' | 'Special' | 'Holiday';
  department: string;
  description: string;
  isRecurring?: boolean;
  hebrewDate?: string;
  biblicalSignificance?: string;
}

export interface HebrewCalendarEvent {
  date: Date;
  hebrewDate: string;
  holidayName?: string;
  isHoliday: boolean;
  biblicalReference?: string;
  significance?: string;
}

// Helper function to get Hebrew date string
const getHebrewDateString = (date: Date): string => {
  try {
    const hd = new Hebcal.HDate(date);
    return hd.toString('h');
  } catch {
    return '';
  }
};

// Biblical significance mapping for holidays
const biblicalSignificanceMap: { [key: string]: { reference: string; significance: string } } = {
  'Rosh Hashana': {
    reference: 'Leviticus 23:23-25',
    significance: 'Jewish New Year, Day of Judgment and Remembrance'
  },
  'Yom Kippur': {
    reference: 'Leviticus 16, Hebrews 9:6-15',
    significance: 'Day of Atonement, prefigures Christ\'s sacrifice'
  },
  'Sukkot': {
    reference: 'Leviticus 23:33-43, John 7:2',
    significance: 'Feast of Booths, Jesus taught during this feast'
  },
  'Chanukah': {
    reference: '1 Maccabees 4:52-59, John 10:22-23',
    significance: 'Festival of Dedication, Jesus walked in Solomon\'s Colonnade'
  },
  'Purim': {
    reference: 'Book of Esther',
    significance: 'Celebration of deliverance from Haman\'s plot'
  },
  'Pesach': {
    reference: 'Exodus 12, Luke 22:7-20',
    significance: 'Memorial of exodus from Egypt, Jesus\' Last Supper was a Passover meal'
  },
  'Shavuot': {
    reference: 'Leviticus 23:15-22, Acts 2:1-31',
    significance: 'Feast of Weeks, the Holy Spirit was poured out on Pentecost'
  },
  'Tu BiShvat': {
    reference: 'Deuteronomy 8:8',
    significance: 'New Year of Trees, celebrating God\'s creation'
  },
  'Tisha B\'Av': {
    reference: 'Lamentations',
    significance: 'Day of mourning for the destruction of the Temples'
  },
  'Rosh Chodesh': {
    reference: 'Numbers 10:10, Psalm 81:3',
    significance: 'New Moon, biblical monthly celebration'
  }
};

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timezone] = useState('America/New_York');
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [hebrewEvents, setHebrewEvents] = useState<HebrewCalendarEvent[]>([]);

  // Generate calendar days for current month view
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentDate]);

  // Sample events with recurring and special dates
  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    
    const sampleEvents: CalendarEvent[] = [
      // Recurring Sunday Services
      {
        id: 'sunday-service',
        title: 'Sunday Morning Worship',
        date: new Date(currentYear, currentMonth, 15),
        time: '9:00 AM',
        location: 'Main Sanctuary',
        type: 'Service',
        department: 'Main Church',
        description: 'Weekly worship service with communion',
        isRecurring: true
      },
      // Bible Study
      {
        id: 'bible-study-1',
        title: 'Midweek Bible Study',
        date: new Date(currentYear, currentMonth, 18),
        time: '7:00 PM',
        location: 'Fellowship Hall',
        type: 'Bible Study',
        department: 'Adult Ministry',
        description: 'Study of the Gospel of John',
        biblicalSignificance: 'Following Jesus through the Gospel of John'
      },
      // Youth Events
      {
        id: 'youth-1',
        title: 'Youth Group Meeting',
        date: new Date(currentYear, currentMonth, 20),
        time: '6:30 PM',
        location: 'Youth Hall',
        type: 'Youth',
        department: 'Youth Ministry',
        description: 'Weekly youth gathering and Bible study'
      },
      // Children Events
      {
        id: 'children-1',
        title: 'Children\'s Ministry',
        date: new Date(currentYear, currentMonth, 22),
        time: '11:00 AM',
        location: 'Main Sanctuary',
        type: 'Children',
        department: 'Children\'s Ministry',
        description: 'Weekly children\'s program'
      },
      // Special Holiday Events
      {
        id: 'special-service',
        title: 'Special Prayer Service',
        date: new Date(currentYear, currentMonth, 24),
        time: '7:00 PM',
        location: 'Main Sanctuary',
        type: 'Special',
        department: 'Main Church',
        description: 'Monthly prayer and praise service',
        biblicalSignificance: 'Coming together in prayer (Matthew 18:20)'
      }
    ];

    setEvents(sampleEvents);
  }, []);

  // Generate Hebrew calendar events
  useEffect(() => {
    const generateHebrewEvents = () => {
      const hebrewHolidays: HebrewCalendarEvent[] = [];
      
      try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Hebcal months are 1-indexed
        
        // Get the Hebrew year for this Gregorian date
        const hebYear = new Hebcal.HDate(currentDate).getFullYear();
        
        // Create a Hebcal instance for the Hebrew year
        const hc = new Hebcal.Year(hebYear);
        
        // Get holidays for this year
        const holidays = hc.holidays;
        
        if (holidays && Array.isArray(holidays)) {
          holidays.forEach((holiday: { date?: Date; greg?: () => Date; name?: string; desc?: string }) => {
            try {
              const gregDate = holiday.date || (holiday.greg ? holiday.greg() : null);
              if (!gregDate) return;
              
              // Check if holiday is in current month view
              if (gregDate.getMonth() === currentDate.getMonth() && 
                  gregDate.getFullYear() === currentDate.getFullYear()) {
                
                const holidayName = holiday.name || holiday.desc || 'Hebrew Holiday';
                
                // Get biblical significance
                let biblicalRef = '';
                let significance = '';
                
                for (const [key, value] of Object.entries(biblicalSignificanceMap)) {
                  if (holidayName.toLowerCase().includes(key.toLowerCase())) {
                    biblicalRef = value.reference;
                    significance = value.significance;
                    break;
                  }
                }
                
                hebrewHolidays.push({
                  date: gregDate,
                  hebrewDate: getHebrewDateString(gregDate),
                  holidayName: holidayName,
                  isHoliday: true,
                  biblicalReference: biblicalRef || undefined,
                  significance: significance || undefined
                });
              }
            } catch {
              // Skip invalid holiday entries
            }
          });
        }
        
        // Add Hebrew date for each day in the calendar view
        calendarDays.forEach(day => {
          if (!hebrewHolidays.some(h => isSameDay(h.date, day))) {
            hebrewHolidays.push({
              date: day,
              hebrewDate: getHebrewDateString(day),
              isHoliday: false
            });
          }
        });
        
      } catch (error) {
        console.error('Error generating Hebrew calendar:', error);
        // Fallback: just add Hebrew dates without holidays
        calendarDays.forEach(day => {
          hebrewHolidays.push({
            date: day,
            hebrewDate: getHebrewDateString(day),
            isHoliday: false
          });
        });
      }

      setHebrewEvents(hebrewHolidays);
    };

    generateHebrewEvents();
  }, [currentDate, calendarDays]);

  // Navigation functions
  const navigateToNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const navigateToPreviousMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const navigateToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  // Event functions
  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const getHebrewEventForDate = (date: Date) => {
    return hebrewEvents.find(event => isSameDay(event.date, date));
  };

  const hasEvents = (date: Date) => {
    return getEventsForDate(date).length > 0 || !!getHebrewEventForDate(date);
  };

  const addEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const removeEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  // Format current date in different ways
  const formattedCurrentDate = useMemo(() => {
    return {
      monthYear: format(currentDate, 'MMMM yyyy'),
      full: format(currentDate, 'EEEE, MMMM d, yyyy'),
      timezone: formatInTimeZone(new Date(), timezone, 'zzz')
    };
  }, [currentDate, timezone]);

  // Get upcoming events (next 30 days)
  const upcomingEvents = useMemo(() => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    return events
      .filter(event => event.date >= new Date() && event.date <= thirtyDaysFromNow)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [events]);

  return {
    // State
    currentDate,
    selectedDate,
    setSelectedDate,
    timezone,

    // Computed values
    calendarDays,
    formattedCurrentDate,
    upcomingEvents,
    events,
    hebrewEvents,

    // Navigation
    navigateToNextMonth,
    navigateToPreviousMonth,
    navigateToToday,

    // Event functions
    getEventsForDate,
    getHebrewEventForDate,
    hasEvents,
    addEvent,
    removeEvent,

    // Utilities
    isSameMonth: (date: Date) => isSameMonth(date, currentDate),
    isToday,
    isSameDay
  };
};