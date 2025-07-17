import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  Search, 
  FileText, 
  Music, 
  Video, 
  Image,
  Calendar,
  User,
  File,
  Archive
} from 'lucide-react';

const Downloads = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const downloadItems = [
    {
      id: 1,
      title: "Sunday Service - Walking in Faith",
      type: "Audio",
      format: "MP3",
      size: "45.2 MB",
      date: "2024-01-14",
      department: "Main Church",
      downloads: 156
    },
    {
      id: 2,
      title: "Bible Study Guide - Romans",
      type: "Document",
      format: "PDF",
      size: "2.8 MB",
      date: "2024-01-12",
      department: "Bible Study",
      downloads: 89
    },
    {
      id: 3,
      title: "Children's Bible Stories Collection",
      type: "Video",
      format: "MP4",
      size: "234.5 MB",
      date: "2024-01-10",
      department: "Children Department",
      downloads: 203
    },
    {
      id: 4,
      title: "Worship Songs Compilation",
      type: "Audio",
      format: "ZIP",
      size: "125.7 MB",
      date: "2024-01-08",
      department: "Choir Department",
      downloads: 78
    },
    {
      id: 5,
      title: "Youth Conference Presentation",
      type: "Document",
      format: "PDF",
      size: "5.2 MB",
      date: "2024-01-06",
      department: "Youth Department",
      downloads: 34
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'Audio': return <Music className="h-4 w-4" />;
      case 'Video': return <Video className="h-4 w-4" />;
      case 'Document': return <FileText className="h-4 w-4" />;
      case 'Image': return <Image className="h-4 w-4" />;
      default: return <File className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Audio': return 'bg-blue-500';
      case 'Video': return 'bg-red-500';
      case 'Document': return 'bg-green-500';
      case 'Image': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Downloads Center
            </h1>
            <p className="text-muted-foreground text-lg">
              Access and download all available church resources
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Archive className="mr-2 h-4 w-4" />
            Bulk Download
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded">
                  <Music className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">124</p>
                  <p className="text-sm text-muted-foreground">Audio Files</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded">
                  <Video className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">67</p>
                  <p className="text-sm text-muted-foreground">Video Files</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded">
                  <FileText className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">198</p>
                  <p className="text-sm text-muted-foreground">Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded">
                  <Download className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2.4k</p>
                  <p className="text-sm text-muted-foreground">Total Downloads</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search downloads by title, department, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Downloads</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {downloadItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-3 rounded-lg ${getTypeColor(item.type)}/10`}>
                          {getIcon(item.type)}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {item.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {item.department}
                            </span>
                            <span>{item.size}</span>
                            <span>{item.downloads} downloads</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{item.format}</Badge>
                        <Button size="sm">
                          <Download className="mr-2 h-3 w-3" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tabs would show filtered content */}
          <TabsContent value="audio" className="mt-6">
            <div className="text-center py-12">
              <Music className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Audio Downloads</h3>
              <p className="text-muted-foreground">Sermons, worship music, and audio resources</p>
            </div>
          </TabsContent>

          <TabsContent value="video" className="mt-6">
            <div className="text-center py-12">
              <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Video Downloads</h3>
              <p className="text-muted-foreground">Service recordings, teachings, and video content</p>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Document Downloads</h3>
              <p className="text-muted-foreground">Study guides, handouts, and written materials</p>
            </div>
          </TabsContent>

          <TabsContent value="images" className="mt-6">
            <div className="text-center py-12">
              <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Image Downloads</h3>
              <p className="text-muted-foreground">Event photos, graphics, and visual resources</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Popular Downloads */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Most Popular Downloads</CardTitle>
            <CardDescription>
              Top downloaded resources this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {downloadItems.slice(0, 3).map((item, index) => (
                <div key={item.id} className="flex items-center gap-3 p-3 border rounded">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.downloads} downloads</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Downloads;
