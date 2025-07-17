import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Search, 
  Play, 
  Download, 
  Calendar, 
  User,
  Filter,
  Grid,
  List
} from 'lucide-react';

const Sermons = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const sermons = [
    {
      id: 1,
      title: "Walking in Faith",
      speaker: "Pastor Johnson",
      date: "2024-01-14",
      duration: "45 mins",
      series: "Living by Faith",
      audioUrl: "#",
      videoUrl: "#",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 2,
      title: "The Power of Prayer",
      speaker: "Elder Smith",
      date: "2024-01-07",
      duration: "38 mins",
      series: "Prayer Life",
      audioUrl: "#",
      videoUrl: "#",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 3,
      title: "God's Love for Humanity",
      speaker: "Pastor Davis",
      date: "2023-12-31",
      duration: "42 mins",
      series: "New Year Series",
      audioUrl: "#",
      videoUrl: "#",
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
              Sermons & Messages
            </h1>
            <p className="text-muted-foreground text-lg">
              Listen to inspiring messages and download for offline study
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Upload className="mr-2 h-4 w-4" />
            Upload Sermon
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search sermons, speakers, or series..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sermons Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {sermons.map((sermon) => (
            <Card key={sermon.id} className="hover:shadow-lg transition-shadow">
              {viewMode === 'grid' ? (
                <>
                  <div className="aspect-video bg-muted rounded-t-lg relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <Badge className="w-fit mb-2">{sermon.series}</Badge>
                    <CardTitle className="line-clamp-2">{sermon.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {sermon.speaker}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {sermon.date}
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{sermon.duration}</span>
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
                </>
              ) : (
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-16 bg-muted rounded flex items-center justify-center">
                      <Play className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <Badge className="mb-2">{sermon.series}</Badge>
                      <h3 className="font-semibold mb-1">{sermon.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{sermon.speaker}</span>
                        <span>{sermon.date}</span>
                        <span>{sermon.duration}</span>
                      </div>
                    </div>
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
              )}
            </Card>
          ))}
        </div>

        {/* Upload Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Upload New Sermon</CardTitle>
            <CardDescription>
              Share your messages with the congregation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Upload Audio or Video</p>
              <p className="text-muted-foreground mb-4">
                Drag and drop your files here, or click to browse
              </p>
              <Button>Choose Files</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sermons;