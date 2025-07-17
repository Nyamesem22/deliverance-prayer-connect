import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = [
    {
      id: 1,
      title: "Sunday Service",
      date: "2024-01-21",
      time: "9:00 AM",
      location: "Main Sanctuary",
      type: "Service",
      department: "Main Church",
      description: "Weekly worship service"
    },
    {
      id: 2,
      title: "Youth Bible Study",
      date: "2024-01-23",
      time: "7:00 PM",
      location: "Youth Hall",
      type: "Bible Study",
      department: "Youth Department",
      description: "Weekly youth gathering"
    },
    {
      id: 3,
      title: "Women's Fellowship",
      date: "2024-01-25",
      time: "6:00 PM",
      location: "Fellowship Hall",
      type: "Fellowship",
      department: "Women's Fellowship",
      description: "Monthly women's meeting"
    },
    {
      id: 4,
      title: "Children's Ministry",
      date: "2024-01-27",
      time: "10:00 AM",
      location: "Children's Room",
      type: "Ministry",
      department: "Children Department",
      description: "Children's activities and learning"
    }
  ];

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());

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
            <p className="text-muted-foreground text-lg">
              Stay updated with all church events and activities
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    January 2024
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Simple calendar grid */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center font-medium text-sm p-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 6; // Adjust for proper calendar start
                    const isCurrentMonth = day > 0 && day <= 31;
                    const hasEvent = [21, 23, 25, 27].includes(day);
                    
                    return (
                      <div
                        key={i}
                        className={`
                          aspect-square flex items-center justify-center text-sm border rounded
                          ${isCurrentMonth 
                            ? 'bg-background text-foreground hover:bg-muted cursor-pointer' 
                            : 'bg-muted/50 text-muted-foreground'
                          }
                          ${hasEvent ? 'bg-primary/10 border-primary' : 'border-border'}
                        `}
                      >
                        {isCurrentMonth && (
                          <div className="relative">
                            {day}
                            {hasEvent && (
                              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Next events on the calendar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.slice(0, 4).map((event) => (
                  <div key={event.id} className="border rounded p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium line-clamp-1">{event.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{event.department}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-2">
                      {event.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Event
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  View All Events
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Departments
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Event Types Legend */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Event Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm">Services</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Bible Study</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-sm">Fellowship</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm">Youth Events</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-pink-500 rounded"></div>
                <span className="text-sm">Children's Ministry</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm">Special Events</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;