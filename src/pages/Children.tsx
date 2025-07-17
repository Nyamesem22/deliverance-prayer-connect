import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Baby, 
  Search, 
  Play, 
  Book, 
  Download, 
  Heart,
  Star,
  Volume2,
  Video,
  Upload,
  Clock
} from 'lucide-react';

const Children = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const childrensBible = [
    {
      id: 1,
      title: "Noah's Ark",
      ageGroup: "3-6 years",
      type: "Bible Story",
      duration: "8 mins",
      format: ["Video", "Audio", "Book"],
      description: "Learn about Noah and God's promise"
    },
    {
      id: 2,
      title: "David and Goliath",
      ageGroup: "5-10 years",
      type: "Bible Story",
      duration: "12 mins",
      format: ["Video", "Book"],
      description: "The brave shepherd boy who trusted God"
    },
    {
      id: 3,
      title: "The Good Samaritan",
      ageGroup: "4-8 years",
      type: "Jesus' Parables",
      duration: "6 mins",
      format: ["Video", "Audio", "Book"],
      description: "Learning about kindness and helping others"
    }
  ];

  const videos = [
    {
      id: 1,
      title: "Bible Songs for Kids",
      duration: "25 mins",
      ageGroup: "2-8 years",
      category: "Music",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Jesus Loves Me - Animation",
      duration: "4 mins",
      ageGroup: "1-5 years",
      category: "Songs",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Creation Story for Kids",
      duration: "15 mins",
      ageGroup: "3-10 years",
      category: "Bible Stories",
      thumbnail: "/placeholder.svg"
    }
  ];

  const readingMaterials = [
    {
      id: 1,
      title: "My First Bible",
      author: "Children's Ministry",
      ageGroup: "2-6 years",
      pages: 64,
      category: "Bible",
      format: ["PDF", "Interactive"]
    },
    {
      id: 2,
      title: "Bible Heroes Coloring Book",
      author: "Kids Department",
      ageGroup: "4-10 years",
      pages: 32,
      category: "Activity",
      format: ["PDF"]
    },
    {
      id: 3,
      title: "Jesus and Me Storybook",
      author: "Sunday School Team",
      ageGroup: "3-8 years",
      pages: 48,
      category: "Stories",
      format: ["PDF", "Audio"]
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
              Children's Corner
            </h1>
            <p className="text-muted-foreground text-lg">
              Bible stories, videos, and learning materials for children
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Upload className="mr-2 h-4 w-4" />
            Add Content
          </Button>
        </div>

        {/* Search and Age Filter */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search children's content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">2-4 years</Button>
                <Button variant="outline" size="sm">5-8 years</Button>
                <Button variant="outline" size="sm">9-12 years</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="bible" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bible">Children's Bible</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="reading">Reading Materials</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>

          {/* Children's Bible Tab */}
          <TabsContent value="bible" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {childrensBible.map((story) => (
                <Card key={story.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-gradient-accent text-primary-foreground">{story.ageGroup}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {story.duration}
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2">{story.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {story.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Badge variant="outline">{story.type}</Badge>
                      <div className="flex flex-wrap gap-1">
                        {story.format.map((format, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {format === 'Video' && <Video className="mr-1 h-3 w-3" />}
                            {format === 'Audio' && <Volume2 className="mr-1 h-3 w-3" />}
                            {format === 'Book' && <Book className="mr-1 h-3 w-3" />}
                            {format}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <Play className="mr-2 h-3 w-3" />
                          Experience
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

          {/* Videos Tab */}
          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card key={video.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted rounded-t-lg relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                    <Badge className="absolute top-2 left-2 bg-gradient-primary text-primary-foreground">
                      {video.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{video.title}</CardTitle>
                    <CardDescription>
                      <div className="flex justify-between items-center">
                        <span>{video.ageGroup}</span>
                        <span>{video.duration}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Play className="mr-2 h-3 w-3" />
                        Watch
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reading Materials Tab */}
          <TabsContent value="reading" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {readingMaterials.map((material) => (
                <Card key={material.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-gradient-secondary text-primary-foreground">{material.ageGroup}</Badge>
                      <div className="text-sm text-muted-foreground">
                        {material.pages} pages
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2">{material.title}</CardTitle>
                    <CardDescription>
                      by {material.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Badge variant="outline">{material.category}</Badge>
                      <div className="flex flex-wrap gap-1">
                        {material.format.map((format, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {format}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <Book className="mr-2 h-3 w-3" />
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

          {/* Activities Tab */}
          <TabsContent value="activities" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <Star className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
                <h3 className="font-semibold mb-2">Coloring Pages</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Bible-themed coloring activities
                </p>
                <Button size="sm" className="w-full">Download</Button>
              </Card>
              
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <Heart className="h-12 w-12 mx-auto mb-4 text-red-500" />
                <h3 className="font-semibold mb-2">Memory Verses</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Interactive verse memorization
                </p>
                <Button size="sm" className="w-full">Start Learning</Button>
              </Card>
              
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <Book className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                <h3 className="font-semibold mb-2">Bible Puzzles</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fun puzzles and games
                </p>
                <Button size="sm" className="w-full">Play Now</Button>
              </Card>
              
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <Baby className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h3 className="font-semibold mb-2">Crafts & Projects</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  DIY Bible-themed crafts
                </p>
                <Button size="sm" className="w-full">Get Ideas</Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured Section */}
        <Card className="mt-8 bg-gradient-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-center">Featured This Week</CardTitle>
            <CardDescription className="text-center text-primary-foreground/80">
              Special content selected for young hearts
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Jesus Loves the Little Children</h3>
              <p className="mb-6 text-primary-foreground/90">
                A beautiful animated story about how Jesus welcomed children and blessed them. 
                Perfect for teaching kids about God's love.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="secondary">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Now
                </Button>
                <Button variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Children;