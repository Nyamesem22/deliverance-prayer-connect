import { useState, useEffect, useMemo } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';


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

// Helper function to get Hebrew date string (browser-native via Intl)
const getHebrewDateString = (date: Date): string => {
  try {
    // Uses the built-in Hebrew calendar when supported by the browser/JS engine
    return new Intl.DateTimeFormat('en-u-ca-hebrew', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    // Fallback: still render something rather than crash
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

  // Generate Hebrew calendar events (never crash the app)
  useEffect(() => {
    let cancelled = false;

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    // Baseline: Hebrew date for every day in the grid (works even without any library)
    const byDayKey = new Map<string, HebrewCalendarEvent>();
    for (const day of calendarDays) {
      const key = format(day, 'yyyy-MM-dd');
      byDayKey.set(key, {
        date: day,
        hebrewDate: getHebrewDateString(day),
        isHoliday: false,
      });
    }

    (async () => {
      try {
        // Optional enrichment: holiday names/significance from @hebcal/core
        const mod = await import('@hebcal/core');
        const HebrewCalendar: any = (mod as any).HebrewCalendar;
        const flags: any = (mod as any).flags;

        const calEvents: any[] = HebrewCalendar.calendar({
          start: calendarStart,
          end: calendarEnd,
          candlelighting: false,
          sedrot: false,
          omer: false,
          locale: 'en',
        });

        for (const ev of calEvents) {
          const hdate = ev?.getDate?.();
          if (!hdate) continue;

          const gregDate: Date = hdate.greg();
          const key = format(gregDate, 'yyyy-MM-dd');
          const existing = byDayKey.get(key);
          if (!existing) continue;

          const desc: string = ev.render?.('en') ?? '';
          const isHoliday =
            ((ev.getFlags?.() ?? 0) &
              (flags.CHAG | flags.MAJOR_FAST | flags.MINOR_FAST | flags.ROSH_CHODESH)) !==
            0;

          let biblicalRef = existing.biblicalReference ?? '';
          let significance = existing.significance ?? '';

          for (const [k, v] of Object.entries(biblicalSignificanceMap)) {
            if (desc.toLowerCase().includes(k.toLowerCase())) {
              biblicalRef = v.reference;
              significance = v.significance;
              break;
            }
          }

          byDayKey.set(key, {
            ...existing,
            // Prefer library string if available
            hebrewDate: hdate.toString?.() ?? existing.hebrewDate,
            isHoliday: existing.isHoliday || isHoliday,
            holidayName: isHoliday
              ? (existing.holidayName ? `${existing.holidayName}; ${desc}` : desc)
              : existing.holidayName,
            biblicalReference: biblicalRef || undefined,
            significance: significance || undefined,
          });
        }
      } catch (error) {
        // Silent fallback: baseline Hebrew dates still render
        console.error('Hebrew calendar enrichment unavailable:', error);
      }

      if (!cancelled) {
        setHebrewEvents(Array.from(byDayKey.values()));
      }
    })();

    return () => {
      cancelled = true;
    };
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