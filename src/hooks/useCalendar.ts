import { useState, useEffect, useMemo } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { HDate, HebrewCalendar, Event, flags } from 'hebcal';

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

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timezone] = useState('America/New_York'); // Default timezone, can be made configurable
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
    const sampleEvents: CalendarEvent[] = [
      // Recurring Sunday Services
      {
        id: 'sunday-service',
        title: 'Sunday Morning Worship',
        date: new Date(2024, 11, 15), // December 15, 2024
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
        date: new Date(2024, 11, 18), // December 18, 2024
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
        date: new Date(2024, 11, 20), // December 20, 2024
        time: '6:30 PM',
        location: 'Youth Hall',
        type: 'Youth',
        department: 'Youth Ministry',
        description: 'Weekly youth gathering and Bible study'
      },
      // Children Events
      {
        id: 'children-1',
        title: 'Children\'s Christmas Program',
        date: new Date(2024, 11, 22), // December 22, 2024
        time: '11:00 AM',
        location: 'Main Sanctuary',
        type: 'Children',
        department: 'Children\'s Ministry',
        description: 'Annual Christmas celebration with the children'
      },
      // Special Holiday Events
      {
        id: 'christmas-eve',
        title: 'Christmas Eve Service',
        date: new Date(2024, 11, 24), // December 24, 2024
        time: '7:00 PM',
        location: 'Main Sanctuary',
        type: 'Special',
        department: 'Main Church',
        description: 'Candlelight Christmas Eve worship service',
        biblicalSignificance: 'Celebrating the birth of Jesus Christ (Luke 2:1-20)'
      },
      {
        id: 'christmas-day',
        title: 'Christmas Day Celebration',
        date: new Date(2024, 11, 25), // December 25, 2024
        time: '10:00 AM',
        location: 'Main Sanctuary',
        type: 'Holiday',
        department: 'Main Church',
        description: 'Christmas morning worship celebrating the Nativity',
        biblicalSignificance: 'The Word became flesh (John 1:14)'
      },
      // New Year Events
      {
        id: 'new-year-eve',
        title: 'Watch Night Service',
        date: new Date(2024, 11, 31), // December 31, 2024
        time: '10:00 PM',
        location: 'Main Sanctuary',
        type: 'Special',
        department: 'Main Church',
        description: 'New Year\'s Eve prayer and reflection service'
      }
    ];

    setEvents(sampleEvents);
  }, []);

  // Generate Hebrew calendar events using hebcal library
  useEffect(() => {
    const generateHebrewEvents = () => {
      const hebrewHolidays: HebrewCalendarEvent[] = [];
      
      // Get the start and end of the calendar view
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      const calendarStart = startOfWeek(monthStart);
      const calendarEnd = endOfWeek(monthEnd);

      // Get Hebrew calendar events for the date range
      const options = {
        start: calendarStart,
        end: calendarEnd,
        candlelighting: false,
        sedrot: false,
        omer: false,
      };

      const events = HebrewCalendar.calendar(options);

      // Biblical significance mapping for holidays
      const biblicalSignificance: { [key: string]: { reference: string; significance: string } } = {
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
        }
      };

      // Process each Hebrew calendar event
      events.forEach((event: Event) => {
        const hdate = event.getDate();
        const gregDate = hdate.greg();
        const hebrewDateStr = hdate.toString();
        const eventDesc = event.render('en');
        
        // Check if it's a major holiday
        const isHoliday = event.getFlags() & (flags.CHAG | flags.MAJOR_FAST | flags.MINOR_FAST | flags.ROSH_CHODESH);
        
        // Get biblical significance if available
        let biblicalRef = '';
        let significance = '';
        
        for (const [key, value] of Object.entries(biblicalSignificance)) {
          if (eventDesc.includes(key)) {
            biblicalRef = value.reference;
            significance = value.significance;
            break;
          }
        }

        hebrewHolidays.push({
          date: gregDate,
          hebrewDate: hebrewDateStr,
          holidayName: isHoliday ? eventDesc : undefined,
          isHoliday: !!isHoliday,
          biblicalReference: biblicalRef || undefined,
          significance: significance || undefined
        });
      });

      setHebrewEvents(hebrewHolidays);
    };

    generateHebrewEvents();
  }, [currentDate]);

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