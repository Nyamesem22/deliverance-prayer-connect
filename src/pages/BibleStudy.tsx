import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Search, 
  Download, 
  Calendar, 
  User,
  FileText,
  Video,
  Headphones,
  Upload
} from 'lucide-react';

const BibleStudy = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const studies = [
    {
      id: 1,
      title: "Romans Chapter Study",
      teacher: "Elder Thompson",
      date: "2024-01-15",
      type: "Weekly Series",
      materials: ["PDF Guide", "Audio", "Video"],
      description: "Deep dive into Paul's letter to the Romans"
    },
    {
      id: 2,
      title: "Psalms Devotional",
      teacher: "Sister Williams",
      date: "2024-01-10",
      type: "Daily Study",
      materials: ["PDF Guide", "Audio"],
      description: "Finding comfort and strength in the Psalms"
    },
    {
      id: 3,
      title: "Gospel of John",
      teacher: "Pastor Davis",
      date: "2024-01-08",
      type: "Book Study",
      materials: ["PDF Guide", "Video", "Workbook"],
      description: "Exploring the life and teachings of Jesus"
    }
  ];

  const books = [
    {
      id: 1,
      title: "Understanding Bible Prophecy",
      author: "Dr. Michael Stevens",
      category: "Prophecy",
      format: ["PDF", "Audio"],
      pages: 245
    },
    {
      id: 2,
      title: "Prayer and Fasting Guide",
      author: "Pastor Rebecca Johnson",
      category: "Spiritual Discipline",
      format: ["PDF"],
      pages: 128
    },
    {
      id: 3,
      title: "Christian Leadership Principles",
      author: "Elder Mark Wilson",
      category: "Leadership",
      format: ["PDF", "Audio", "Video"],
      pages: 312
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
              Bible Study & Learning
            </h1>
            <p className="text-muted-foreground text-lg">
              Deepen your faith through structured study and learning materials
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Upload className="mr-2 h-4 w-4" />
            Upload Study Material
          </Button>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search bible studies, books, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs for different content types */}
        <Tabs defaultValue="studies" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="studies">Bible Studies</TabsTrigger>
            <TabsTrigger value="books">Learning Books</TabsTrigger>
            <TabsTrigger value="resources">Teaching Resources</TabsTrigger>
          </TabsList>

          {/* Bible Studies Tab */}
          <TabsContent value="studies" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studies.map((study) => (
                <Card key={study.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Badge className="w-fit mb-2">{study.type}</Badge>
                    <CardTitle className="line-clamp-2">{study.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {study.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-3 w-3" />
                        <span>{study.teacher}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-3 w-3" />
                        <span>{study.date}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {study.materials.map((material, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {material}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <BookOpen className="mr-2 h-3 w-3" />
                          Study
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

          {/* Learning Books Tab */}
          <TabsContent value="books" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <Card key={book.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Badge className="w-fit mb-2">{book.category}</Badge>
                    <CardTitle className="line-clamp-2">{book.title}</CardTitle>
                    <CardDescription>
                      by {book.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground">
                        {book.pages} pages
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {book.format.map((format, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {format === 'PDF' && <FileText className="mr-1 h-3 w-3" />}
                            {format === 'Audio' && <Headphones className="mr-1 h-3 w-3" />}
                            {format === 'Video' && <Video className="mr-1 h-3 w-3" />}
                            {format}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <BookOpen className="mr-2 h-3 w-3" />
                          Read
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

          {/* Teaching Resources Tab */}
          <TabsContent value="resources" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6">
                <FileText className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Study Guides</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Downloadable guides for personal and group study
                </p>
                <Button size="sm">Browse Guides</Button>
              </Card>
              
              <Card className="text-center p-6">
                <Video className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Video Lessons</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Teaching videos and recorded lessons
                </p>
                <Button size="sm">View Videos</Button>
              </Card>
              
              <Card className="text-center p-6">
                <Headphones className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Audio Resources</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Podcasts and audio teaching materials
                </p>
                <Button size="sm">Listen Now</Button>
              </Card>
              
              <Card className="text-center p-6">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Study Plans</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Structured reading and study plans
                </p>
                <Button size="sm">Start Plan</Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Upload Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Contribute Learning Materials</CardTitle>
            <CardDescription>
              Share your study materials and teaching resources with the congregation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Upload Study Materials</p>
              <p className="text-muted-foreground mb-4">
                Share PDFs, audio files, videos, or documents
              </p>
              <Button>Choose Files</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BibleStudy;