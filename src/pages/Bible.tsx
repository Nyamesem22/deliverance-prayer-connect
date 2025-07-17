import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Book, 
  Search, 
  Bookmark, 
  History, 
  Settings,
  ChevronLeft,
  ChevronRight,
  BookmarkPlus,
  Share
} from 'lucide-react';

const Bible = () => {
  const [selectedBook, setSelectedBook] = useState('Genesis');
  const [selectedChapter, setSelectedChapter] = useState('1');
  const [selectedVersion, setSelectedVersion] = useState('KJV');
  const [searchTerm, setSearchTerm] = useState('');

  const bibleBooks = [
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth',
    '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah',
    'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
    'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah',
    'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark',
    'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
    'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy',
    'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
    'Jude', 'Revelation'
  ];

  const sampleVerses = [
    { verse: 1, text: "In the beginning God created the heaven and the earth." },
    { verse: 2, text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters." },
    { verse: 3, text: "And God said, Let there be light: and there was light." },
    { verse: 4, text: "And God saw the light, that it was good: and God divided the light from the darkness." },
    { verse: 5, text: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day." }
  ];

  const recentReadings = [
    { book: 'Psalms', chapter: 23, version: 'KJV', date: '2024-01-15' },
    { book: 'John', chapter: 3, version: 'NIV', date: '2024-01-14' },
    { book: 'Romans', chapter: 8, version: 'KJV', date: '2024-01-13' }
  ];

  const bookmarks = [
    { book: 'John', chapter: 3, verse: 16, version: 'KJV', note: 'God\'s love for the world' },
    { book: 'Psalms', chapter: 23, verse: 1, version: 'KJV', note: 'The Lord is my shepherd' },
    { book: 'Romans', chapter: 8, verse: 28, version: 'NIV', note: 'All things work together for good' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Holy Bible
            </h1>
            <p className="text-muted-foreground text-lg">
              Read and study the Word of God online - KJV & NIV translations
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Bible Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Book className="mr-2 h-5 w-5" />
                  Navigation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Version Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Version</label>
                  <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="KJV">King James Version</SelectItem>
                      <SelectItem value="NIV">New International Version</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Book Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Book</label>
                  <Select value={selectedBook} onValueChange={setSelectedBook}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {bibleBooks.map((book) => (
                        <SelectItem key={book} value={book}>{book}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Chapter Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Chapter</label>
                  <Select value={selectedChapter} onValueChange={setSelectedChapter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 50 }, (_, i) => i + 1).map((chapter) => (
                        <SelectItem key={chapter} value={chapter.toString()}>
                          Chapter {chapter}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search verses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Bible Reading Area */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="read" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="read">Read</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
              </TabsList>

              {/* Reading Tab */}
              <TabsContent value="read" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>{selectedBook} Chapter {selectedChapter}</CardTitle>
                        <CardDescription>{selectedVersion} Translation</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <BookmarkPlus className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sampleVerses.map((verse) => (
                        <div key={verse.verse} className="flex gap-4 hover:bg-muted/50 p-2 rounded">
                          <Badge variant="outline" className="min-w-8 h-6 flex items-center justify-center">
                            {verse.verse}
                          </Badge>
                          <p className="leading-relaxed">{verse.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t">
                      <Button variant="outline">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Previous Chapter
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        {selectedBook} {selectedChapter}
                      </span>
                      <Button variant="outline">
                        Next Chapter
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <History className="mr-2 h-5 w-5" />
                      Reading History
                    </CardTitle>
                    <CardDescription>
                      Your recent Bible reading activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentReadings.map((reading, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded hover:bg-muted/50">
                          <div>
                            <p className="font-medium">{reading.book} Chapter {reading.chapter}</p>
                            <p className="text-sm text-muted-foreground">{reading.version} • {reading.date}</p>
                          </div>
                          <Button variant="outline" size="sm">Continue Reading</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Bookmarks Tab */}
              <TabsContent value="bookmarks" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bookmark className="mr-2 h-5 w-5" />
                      Saved Verses
                    </CardTitle>
                    <CardDescription>
                      Your bookmarked verses and notes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bookmarks.map((bookmark, index) => (
                        <div key={index} className="border rounded p-4 hover:bg-muted/50">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">
                              {bookmark.book} {bookmark.chapter}:{bookmark.verse}
                            </h4>
                            <Badge variant="outline">{bookmark.version}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{bookmark.note}</p>
                          <Button variant="outline" size="sm">Read Chapter</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bible;