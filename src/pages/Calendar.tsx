import React, { useState } from 'react';
import { format } from 'date-fns';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  Globe,
  Star,
  BookOpen,
  RefreshCw,
  CalendarDays
} from 'lucide-react';
import { useCalendar } from '@/hooks/useCalendar';
import CalendarGrid from '@/components/CalendarGrid';
import EventDetails from '@/components/EventDetails';

const Calendar = () => {
  const {
    currentDate,
    selectedDate,
    setSelectedDate,
    calendarDays,
    formattedCurrentDate,
    upcomingEvents,
    events,
    hebrewEvents,
    navigateToNextMonth,
    navigateToPreviousMonth,
    navigateToToday,
    getEventsForDate,
    getHebrewEventForDate,
    hasEvents,
    addEvent,
    isSameMonth,
    isToday,
    isSameDay
  } = useCalendar();

  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    type: 'Service' as const,
    department: '',
    description: '',
    biblicalSignificance: ''
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Church Calendar
            </h1>
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground text-lg">
                Live calendar with Hebrew dates & biblical significance
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span>Current: {formattedCurrentDate.full}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{formattedCurrentDate.timezone}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={navigateToToday}>
              <CalendarDays className="mr-2 h-4 w-4" />
              Today
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Dialog open={showEventForm} onOpenChange={setShowEventForm}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary hover:opacity-90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Church Event</DialogTitle>
                </DialogHeader>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newEvent.title && newEvent.date && newEvent.time) {
                      addEvent({
                        ...newEvent,
                        date: new Date(newEvent.date)
                      });
                      setNewEvent({
                        title: '',
                        date: '',
                        time: '',
                        location: '',
                        type: 'Service',
                        department: '',
                        description: '',
                        biblicalSignificance: ''
                      });
                      setShowEventForm(false);
                    }
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Event Title *</Label>
                      <Input
                        id="title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Sunday Service"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Event Type</Label>
                      <Select value={newEvent.type} onValueChange={(value: any) => setNewEvent(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Service">Service</SelectItem>
                          <SelectItem value="Bible Study">Bible Study</SelectItem>
                          <SelectItem value="Fellowship">Fellowship</SelectItem>
                          <SelectItem value="Ministry">Ministry</SelectItem>
                          <SelectItem value="Youth">Youth</SelectItem>
                          <SelectItem value="Children">Children</SelectItem>
                          <SelectItem value="Special">Special</SelectItem>
                          <SelectItem value="Holiday">Holiday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Time *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Main Sanctuary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={newEvent.department}
                        onChange={(e) => setNewEvent(prev => ({ ...prev, department: e.target.value }))}
                        placeholder="Main Church"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Event description..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="biblical">Biblical Significance (Optional)</Label>
                    <Textarea
                      id="biblical"
                      value={newEvent.biblicalSignificance}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, biblicalSignificance: e.target.value }))}
                      placeholder="Scripture references or spiritual significance..."
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setShowEventForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Event</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    {formattedCurrentDate.monthYear}
                    <Badge variant="outline" className="ml-2">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Live
                    </Badge>
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={navigateToPreviousMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={navigateToNextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Church Events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>Hebrew Holidays</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-3 w-3 text-yellow-600" />
                    <span>Biblical Significance</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CalendarGrid
                  days={calendarDays}
                  currentDate={currentDate}
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                  getEventsForDate={getEventsForDate}
                  getHebrewEventForDate={getHebrewEventForDate}
                  hasEvents={hasEvents}
                  isSameMonth={isSameMonth}
                  isToday={isToday}
                  isSameDay={isSameDay}
                />
              </CardContent>
            </Card>

            {/* Event Details */}
            {selectedDate && (
              <EventDetails
                selectedDate={selectedDate}
                events={getEventsForDate(selectedDate)}
                hebrewEvent={getHebrewEventForDate(selectedDate)}
                onClose={() => setSelectedDate(null)}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>Next 30 days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.slice(0, 5).map((event) => (
                    <div 
                      key={event.id} 
                      className="border rounded p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedDate(event.date)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm line-clamp-1">{event.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            event.type === 'Service' ? 'border-blue-300 text-blue-700' :
                            event.type === 'Bible Study' ? 'border-green-300 text-green-700' :
                            event.type === 'Fellowship' ? 'border-purple-300 text-purple-700' :
                            event.type === 'Youth' ? 'border-orange-300 text-orange-700' :
                            event.type === 'Children' ? 'border-pink-300 text-pink-700' :
                            'border-red-300 text-red-700'
                          }`}
                        >
                          {event.type}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{format(event.date, 'MMM d, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                      
                      {event.biblicalSignificance && (
                        <div className="mt-2 p-2 bg-accent/10 rounded text-xs">
                          <BookOpen className="inline h-3 w-3 mr-1" />
                          <span className="italic">{event.biblicalSignificance.substring(0, 60)}...</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No upcoming events</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hebrew Calendar Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  Hebrew Calendar
                </CardTitle>
                <CardDescription>Biblical holidays & significance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {hebrewEvents.filter(event => event.isHoliday && event.date >= new Date()).slice(0, 3).map((event, index) => (
                  <div 
                    key={index} 
                    className="border rounded p-3 bg-gradient-to-r from-blue-50 to-purple-50 cursor-pointer hover:from-blue-100 hover:to-purple-100 transition-colors"
                    onClick={() => setSelectedDate(event.date)}
                  >
                    <div className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-blue-900">{event.holidayName}</h4>
                        <p className="text-xs text-blue-700">{event.hebrewDate}</p>
                        <p className="text-xs text-blue-600">{format(event.date, 'MMM d, yyyy')}</p>
                        {event.biblicalReference && (
                          <p className="text-xs text-blue-800 italic">
                            <BookOpen className="inline h-3 w-3 mr-1" />
                            {event.biblicalReference.split(',')[0]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Calendar Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setShowEventForm(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={navigateToToday}>
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Go to Today
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Departments
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Biblical Studies
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Calendar Legend */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Calendar Legend</CardTitle>
            <CardDescription>Understanding the calendar symbols and colors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Church Events</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500/20 border border-blue-500 rounded"></div>
                    <span className="text-sm">Services</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500/20 border border-green-500 rounded"></div>
                    <span className="text-sm">Bible Study</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500/20 border border-purple-500 rounded"></div>
                    <span className="text-sm">Fellowship</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Ministry Events</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500/20 border border-orange-500 rounded"></div>
                    <span className="text-sm">Youth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-pink-500/20 border border-pink-500 rounded"></div>
                    <span className="text-sm">Children</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500/20 border border-red-500 rounded"></div>
                    <span className="text-sm">Special</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Hebrew Calendar</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Hebrew Holiday</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Hebrew Date</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">Biblical Significance</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Calendar Features</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Auto-updates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Live timezone</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Scripture references</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;