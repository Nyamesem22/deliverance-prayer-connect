import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  BookmarkPlus, 
  Share, 
  ChevronLeft, 
  ChevronRight,
  Bookmark,
  MessageSquare,
  Copy,
  Check
} from 'lucide-react';
import { BibleVerse } from '@/data/bibleData';

interface BibleReaderProps {
  book: string;
  chapter: string;
  version: string;
  verses: BibleVerse[];
  fontSize: number;
  bookmarks: Array<{
    book: string;
    chapter: number;
    verse: number;
    version: string;
    note: string;
  }>;
  onNavigatePrevious: () => void;
  onNavigateNext: () => void;
  onAddBookmark: (verse: number, note: string) => void;
}

export const BibleReader: React.FC<BibleReaderProps> = ({
  book,
  chapter,
  version,
  verses,
  fontSize,
  bookmarks,
  onNavigatePrevious,
  onNavigateNext,
  onAddBookmark
}) => {
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [bookmarkNote, setBookmarkNote] = useState('');
  const [copiedVerse, setCopiedVerse] = useState<number | null>(null);

  const isBookmarked = (verseNum: number) => {
    return bookmarks.some(b => 
      b.book === book && 
      b.chapter === parseInt(chapter) && 
      b.verse === verseNum &&
      b.version === version
    );
  };

  const handleAddBookmark = () => {
    if (selectedVerse) {
      onAddBookmark(selectedVerse, bookmarkNote);
      setBookmarkNote('');
      setSelectedVerse(null);
    }
  };

  const handleCopyVerse = async (verse: BibleVerse) => {
    const text = `${book} ${chapter}:${verse.verse} (${version})\n"${verse.text}"`;
    await navigator.clipboard.writeText(text);
    setCopiedVerse(verse.verse);
    setTimeout(() => setCopiedVerse(null), 2000);
  };

  const handleShareChapter = async () => {
    const text = `Reading ${book} Chapter ${chapter} (${version}) - Church Bible Study Platform`;
    if (navigator.share) {
      await navigator.share({
        title: `${book} ${chapter}`,
        text,
        url: window.location.href
      });
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="space-y-6">
      {/* Chapter Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">{book} Chapter {chapter}</h2>
          <p className="text-muted-foreground">{version} Translation • {verses.length} verses</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleShareChapter}>
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Verses */}
      <div className="space-y-4 bg-card rounded-lg p-6">
        {verses.length > 0 ? (
          verses.map((verse) => (
            <div 
              key={verse.verse} 
              className="group flex gap-4 hover:bg-muted/30 p-3 rounded-lg transition-colors cursor-pointer"
              onClick={() => setSelectedVerse(verse.verse)}
            >
              <div className="flex flex-col items-center gap-2 min-w-12">
                <Badge 
                  variant={isBookmarked(verse.verse) ? "default" : "outline"} 
                  className="h-7 w-7 flex items-center justify-center text-xs font-semibold"
                >
                  {verse.verse}
                </Badge>
                
                {/* Verse Actions */}
                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyVerse(verse);
                    }}
                  >
                    {copiedVerse === verse.verse ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                  
                  {isBookmarked(verse.verse) ? (
                    <Bookmark className="h-3 w-3 text-primary" />
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVerse(verse.verse);
                          }}
                        >
                          <BookmarkPlus className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Bookmark</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Verse Reference</Label>
                            <div className="text-sm text-muted-foreground">
                              {book} {chapter}:{verse.verse} ({version})
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="note">Personal Note (Optional)</Label>
                            <Textarea
                              id="note"
                              placeholder="Add a personal note about this verse..."
                              value={bookmarkNote}
                              onChange={(e) => setBookmarkNote(e.target.value)}
                            />
                          </div>
                          <Button onClick={handleAddBookmark} className="w-full">
                            Save Bookmark
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
              
              <p 
                className="leading-relaxed text-foreground flex-1 select-text"
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.6 }}
              >
                {verse.text}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>This chapter content is not yet available.</p>
            <p className="text-sm">We are working to add more Bible content to the platform.</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button variant="outline" onClick={onNavigatePrevious} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Previous Chapter
        </Button>
        
        <span className="text-sm text-muted-foreground font-medium">
          {book} {chapter}
        </span>
        
        <Button variant="outline" onClick={onNavigateNext} className="flex items-center gap-2">
          Next Chapter
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};