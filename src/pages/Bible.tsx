import React from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Book, 
  Search, 
  Bookmark, 
  History, 
  Settings,
  Type,
  BookOpen,
  Filter,
  RotateCcw
} from 'lucide-react';
import { useBible } from '@/hooks/useBible';
import { BibleReader } from '@/components/BibleReader';

const Bible = () => {
  const {
    selectedBook,
    selectedChapter,
    selectedVersion,
    searchTerm,
    fontSize,
    currentBook,
    currentChapterContent,
    availableChapters,
    searchResults,
    bookmarks,
    readingHistory,
    bibleBooks,
    navigateToPrevious,
    navigateToNext,
    addBookmark,
    removeBookmark,
    updateSettings
  } = useBible();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Holy Bible Online
            </h1>
            <p className="text-muted-foreground text-lg">
              Study God's Word with KJV & NIV translations • Interactive Bible reader
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Bible Reading Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      Font Size: {fontSize}px
                    </Label>
                    <Slider
                      value={[fontSize]}
                      onValueChange={(value) => updateSettings({ fontSize: value[0] })}
                      min={12}
                      max={24}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
                  <label className="text-sm font-medium mb-2 block">Bible Version</label>
                  <Select 
                    value={selectedVersion} 
                    onValueChange={(value) => updateSettings({ selectedVersion: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="KJV">
                        <div>
                          <div className="font-medium">King James Version</div>
                          <div className="text-xs text-muted-foreground">Classic English translation</div>
                        </div>
                      </SelectItem>
                      <SelectItem value="NIV">
                        <div>
                          <div className="font-medium">New International Version</div>
                          <div className="text-xs text-muted-foreground">Modern English translation</div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Book Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Book</label>
                  <Select 
                    value={selectedBook} 
                    onValueChange={(value) => updateSettings({ selectedBook: value, selectedChapter: '1' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      <div className="p-2">
                        <div className="text-xs font-semibold text-muted-foreground mb-2">Old Testament</div>
                        {bibleBooks.filter(book => book.testament === 'old').map((book) => (
                          <SelectItem key={book.name} value={book.name}>
                            {book.name} ({book.chapters} chapters)
                          </SelectItem>
                        ))}
                        <div className="text-xs font-semibold text-muted-foreground mb-2 mt-4">New Testament</div>
                        {bibleBooks.filter(book => book.testament === 'new').map((book) => (
                          <SelectItem key={book.name} value={book.name}>
                            {book.name} ({book.chapters} chapters)
                          </SelectItem>
                        ))}
                      </div>
                    </SelectContent>
                  </Select>
                </div>

                {/* Chapter Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Chapter {currentBook && `(1-${currentBook.chapters})`}
                  </label>
                  <Select 
                    value={selectedChapter} 
                    onValueChange={(value) => updateSettings({ selectedChapter: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {availableChapters.map((chapter) => (
                        <SelectItem key={chapter} value={chapter.toString()}>
                          Chapter {chapter}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search Verses</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search in current chapter..."
                      value={searchTerm}
                      onChange={(e) => updateSettings({ searchTerm: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                  {searchTerm && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                    </div>
                  )}
                </div>

                {/* Quick Navigation */}
                <div className="pt-4 border-t">
                  <label className="text-sm font-medium mb-2 block">Quick Access</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => updateSettings({ selectedBook: 'Genesis', selectedChapter: '1' })}
                      className="text-xs"
                    >
                      <BookOpen className="h-3 w-3 mr-1" />
                      Genesis 1
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateSettings({ selectedBook: 'Psalms', selectedChapter: '23' })}
                      className="text-xs"
                    >
                      <BookOpen className="h-3 w-3 mr-1" />
                      Psalm 23
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateSettings({ selectedBook: 'John', selectedChapter: '3' })}
                      className="text-xs"
                    >
                      <BookOpen className="h-3 w-3 mr-1" />
                      John 3
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateSettings({ selectedBook: 'Matthew', selectedChapter: '1' })}
                      className="text-xs"
                    >
                      <BookOpen className="h-3 w-3 mr-1" />
                      Matthew 1
                    </Button>
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
                {searchTerm && searchResults.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Search Results
                      </CardTitle>
                      <CardDescription>
                        Found {searchResults.length} verse{searchResults.length !== 1 ? 's' : ''} containing "{searchTerm}"
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {searchResults.map((result, index) => (
                          <div key={index} className="flex gap-4 hover:bg-muted/50 p-3 rounded border">
                            <Badge variant="outline" className="min-w-8 h-6 flex items-center justify-center">
                              {result.verse}
                            </Badge>
                            <div className="flex-1">
                              <p className="leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
                                {result.text}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {result.book} {result.chapter}:{result.verse} ({result.version})
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateSettings({ searchTerm: '' })}
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Clear Search
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <BibleReader
                    book={selectedBook}
                    chapter={selectedChapter}
                    version={selectedVersion}
                    verses={currentChapterContent}
                    fontSize={fontSize}
                    bookmarks={bookmarks}
                    onNavigatePrevious={navigateToPrevious}
                    onNavigateNext={navigateToNext}
                    onAddBookmark={addBookmark}
                  />
                )}
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
                      {readingHistory.length > 0 ? (
                        readingHistory.map((reading, index) => (
                          <div key={index} className="flex justify-between items-center p-3 border rounded hover:bg-muted/50 cursor-pointer">
                            <div>
                              <p className="font-medium">{reading.book} Chapter {reading.chapter}</p>
                              <p className="text-sm text-muted-foreground">{reading.version} • {reading.date}</p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateSettings({ 
                                selectedBook: reading.book, 
                                selectedChapter: reading.chapter.toString(),
                                selectedVersion: reading.version
                              })}
                            >
                              Continue Reading
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No reading history yet</p>
                          <p className="text-sm">Start reading to build your history</p>
                        </div>
                      )}
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
                      {bookmarks.length > 0 ? (
                        bookmarks.map((bookmark, index) => (
                          <div key={index} className="border rounded p-4 hover:bg-muted/50">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium">
                                {bookmark.book} {bookmark.chapter}:{bookmark.verse}
                              </h4>
                              <div className="flex gap-2">
                                <Badge variant="outline">{bookmark.version}</Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeBookmark(bookmark.book, bookmark.chapter, bookmark.verse)}
                                  className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                                >
                                  ×
                                </Button>
                              </div>
                            </div>
                            {bookmark.note && (
                              <p className="text-sm text-muted-foreground mb-2 italic">"{bookmark.note}"</p>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateSettings({ 
                                selectedBook: bookmark.book, 
                                selectedChapter: bookmark.chapter.toString(),
                                selectedVersion: bookmark.version
                              })}
                            >
                              Read Chapter
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Bookmark className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No bookmarks saved yet</p>
                          <p className="text-sm">Bookmark verses while reading to save them here</p>
                        </div>
                      )}
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