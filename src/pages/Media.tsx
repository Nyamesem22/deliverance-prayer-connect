import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Video, 
  Search, 
  Upload, 
  Download, 
  Play, 
  Calendar,
  User,
  Music,
  Image,
  FileText
} from 'lucide-react';

const Media = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mediaItems = [
    {
      id: 1,
      title: "Sunday Service - January 14",
      type: "Service Recording",
      format: "Video",
      duration: "1h 45m",
      date: "2024-01-14",
      speaker: "Pastor Johnson",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Youth Conference 2024",
      type: "Event",
      format: "Video",
      duration: "2h 30m",
      date: "2024-01-10",
      speaker: "Multiple Speakers",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Worship Night Audio",
      type: "Worship",
      format: "Audio",
      duration: "45m",
      date: "2024-01-08",
      speaker: "Worship Team",
      thumbnail: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Media Center
            </h1>
            <p className="text-muted-foreground text-lg">
              Videos, audio recordings, and multimedia resources
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Upload className="mr-2 h-4 w-4" />
            Upload Media
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search media content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Media Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Media</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted rounded-t-lg relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full">
                        {item.format === 'Video' ? <Play className="h-6 w-6" /> : <Music className="h-6 w-6" />}
                      </Button>
                    </div>
                    <Badge className="absolute top-2 left-2">{item.format}</Badge>
                  </div>
                  <CardHeader>
                    <Badge className="w-fit mb-2">{item.type}</Badge>
                    <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {item.speaker}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {item.date}
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{item.duration}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Play className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tabs would have similar content filtered by type */}
          <TabsContent value="videos" className="mt-6">
            <div className="text-center py-12">
              <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Video Content</h3>
              <p className="text-muted-foreground">Service recordings, events, and video messages</p>
            </div>
          </TabsContent>

          <TabsContent value="audio" className="mt-6">
            <div className="text-center py-12">
              <Music className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Audio Content</h3>
              <p className="text-muted-foreground">Sermons, worship sessions, and audio resources</p>
            </div>
          </TabsContent>

          <TabsContent value="photos" className="mt-6">
            <div className="text-center py-12">
              <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Photo Gallery</h3>
              <p className="text-muted-foreground">Event photos and church activities</p>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Documents</h3>
              <p className="text-muted-foreground">PDFs, presentations, and written materials</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Media;
