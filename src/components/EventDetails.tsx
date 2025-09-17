import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  BookOpen, 
  Star,
  ExternalLink
} from 'lucide-react';
import { CalendarEvent, HebrewCalendarEvent } from '@/hooks/useCalendar';

interface EventDetailsProps {
  selectedDate: Date;
  events: CalendarEvent[];
  hebrewEvent?: HebrewCalendarEvent;
  onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  selectedDate,
  events,
  hebrewEvent,
  onClose
}) => {
  const formattedDate = format(selectedDate, 'EEEE, MMMM d, yyyy');

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {formattedDate}
            </CardTitle>
            {hebrewEvent && (
              <CardDescription className="mt-1 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-600" />
                Hebrew Date: {hebrewEvent.hebrewDate}
              </CardDescription>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Hebrew Calendar Event */}
        {hebrewEvent && hebrewEvent.isHoliday && (
          <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
            <div className="flex items-start gap-3">
              <Star className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
              <div className="space-y-2 flex-1">
                <h4 className="font-semibold text-blue-900">{hebrewEvent.holidayName}</h4>
                {hebrewEvent.biblicalReference && (
                  <p className="text-sm text-blue-800">
                    <BookOpen className="inline h-3 w-3 mr-1" />
                    Biblical Reference: {hebrewEvent.biblicalReference}
                  </p>
                )}
                {hebrewEvent.significance && (
                  <p className="text-sm text-blue-700 italic">
                    {hebrewEvent.significance}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Church Events */}
        {events.length > 0 ? (
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Church Events ({events.length})
            </h4>
            
            {events.map((event) => (
              <div key={event.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-medium text-foreground">{event.title}</h5>
                    <Badge 
                      variant="secondary" 
                      className={
                        event.type === 'Service' ? 'bg-blue-100 text-blue-800' :
                        event.type === 'Bible Study' ? 'bg-green-100 text-green-800' :
                        event.type === 'Fellowship' ? 'bg-purple-100 text-purple-800' :
                        event.type === 'Youth' ? 'bg-orange-100 text-orange-800' :
                        event.type === 'Children' ? 'bg-pink-100 text-pink-800' :
                        event.type === 'Special' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }
                    >
                      {event.type}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 md:col-span-2">
                    <Users className="h-4 w-4" />
                    <span>{event.department}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {event.description}
                </p>

                {event.biblicalSignificance && (
                  <div className="p-3 bg-accent/20 rounded border-l-4 border-primary">
                    <p className="text-sm text-accent-foreground flex items-start gap-2">
                      <BookOpen className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="italic">{event.biblicalSignificance}</span>
                    </p>
                  </div>
                )}

                {event.isRecurring && (
                  <Badge variant="outline" className="mt-2">
                    Recurring Event
                  </Badge>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No church events scheduled for this date</p>
          </div>
        )}

        {/* Additional Hebrew Calendar Info */}
        {hebrewEvent && !hebrewEvent.isHoliday && (
          <div className="text-center py-4 text-muted-foreground border-t">
            <p className="text-sm">Hebrew Date: {hebrewEvent.hebrewDate}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventDetails;