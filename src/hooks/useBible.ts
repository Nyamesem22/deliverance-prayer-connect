import { useState, useEffect, useMemo } from 'react';
import { bibleBooks, getBookInfo, getChapterContent, BibleVerse } from '@/data/bibleData';

export interface BibleState {
  selectedBook: string;
  selectedChapter: string;
  selectedVersion: string;
  searchTerm: string;
  fontSize: number;
  bookmarks: Array<{
    book: string;
    chapter: number;
    verse: number;
    version: string;
    note: string;
  }>;
  readingHistory: Array<{
    book: string;
    chapter: number;
    version: string;
    date: string;
  }>;
}

export const useBible = () => {
  const [state, setState] = useState<BibleState>({
    selectedBook: 'Genesis',
    selectedChapter: '1',
    selectedVersion: 'KJV',
    searchTerm: '',
    fontSize: 16,
    bookmarks: [
      { book: 'John', chapter: 3, verse: 16, version: 'KJV', note: "God's love for the world" },
      { book: 'Psalms', chapter: 23, verse: 1, version: 'KJV', note: 'The Lord is my shepherd' },
      { book: 'Romans', chapter: 8, verse: 28, version: 'NIV', note: 'All things work together for good' }
    ],
    readingHistory: [
      { book: 'Psalms', chapter: 23, version: 'KJV', date: '2024-01-15' },
      { book: 'John', chapter: 3, version: 'NIV', date: '2024-01-14' },
      { book: 'Romans', chapter: 8, version: 'KJV', date: '2024-01-13' }
    ]
  });

  // Get current book info
  const currentBook = useMemo(() => getBookInfo(state.selectedBook), [state.selectedBook]);

  // Get current chapter content
  const currentChapterContent = useMemo(() => {
    return getChapterContent(state.selectedVersion, state.selectedBook, state.selectedChapter);
  }, [state.selectedVersion, state.selectedBook, state.selectedChapter]);

  // Get available chapters for current book
  const availableChapters = useMemo(() => {
    if (!currentBook) return [];
    return Array.from({ length: currentBook.chapters }, (_, i) => i + 1);
  }, [currentBook]);

  // Search functionality
  const searchResults = useMemo(() => {
    if (!state.searchTerm.trim()) return [];
    
    const searchTerm = state.searchTerm.toLowerCase();
    const results: Array<{
      book: string;
      chapter: string;
      verse: number;
      text: string;
      version: string;
    }> = [];

    // Simple search through available content
    Object.entries(getChapterContent(state.selectedVersion, state.selectedBook, state.selectedChapter)).forEach(([_, verses]) => {
      if (Array.isArray(verses)) {
        verses.forEach(verse => {
          if (verse.text.toLowerCase().includes(searchTerm)) {
            results.push({
              book: state.selectedBook,
              chapter: state.selectedChapter,
              verse: verse.verse,
              text: verse.text,
              version: state.selectedVersion
            });
          }
        });
      }
    });

    return results;
  }, [state.searchTerm, state.selectedVersion, state.selectedBook, state.selectedChapter]);

  // Update reading history when chapter changes
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const newReading = {
      book: state.selectedBook,
      chapter: parseInt(state.selectedChapter),
      version: state.selectedVersion,
      date: today
    };

    setState(prev => ({
      ...prev,
      readingHistory: [
        newReading,
        ...prev.readingHistory.filter(
          r => !(r.book === newReading.book && r.chapter === newReading.chapter && r.version === newReading.version)
        )
      ].slice(0, 10) // Keep only last 10
    }));
  }, [state.selectedBook, state.selectedChapter, state.selectedVersion]);

  // Navigation functions
  const navigateToPrevious = () => {
    const currentChapterNum = parseInt(state.selectedChapter);
    if (currentChapterNum > 1) {
      setState(prev => ({ ...prev, selectedChapter: (currentChapterNum - 1).toString() }));
    } else {
      // Go to previous book's last chapter
      const currentBookIndex = bibleBooks.findIndex(book => book.name === state.selectedBook);
      if (currentBookIndex > 0) {
        const previousBook = bibleBooks[currentBookIndex - 1];
        setState(prev => ({
          ...prev,
          selectedBook: previousBook.name,
          selectedChapter: previousBook.chapters.toString()
        }));
      }
    }
  };

  const navigateToNext = () => {
    const currentChapterNum = parseInt(state.selectedChapter);
    if (currentBook && currentChapterNum < currentBook.chapters) {
      setState(prev => ({ ...prev, selectedChapter: (currentChapterNum + 1).toString() }));
    } else {
      // Go to next book's first chapter
      const currentBookIndex = bibleBooks.findIndex(book => book.name === state.selectedBook);
      if (currentBookIndex < bibleBooks.length - 1) {
        const nextBook = bibleBooks[currentBookIndex + 1];
        setState(prev => ({
          ...prev,
          selectedBook: nextBook.name,
          selectedChapter: '1'
        }));
      }
    }
  };

  const addBookmark = (verse: number, note: string = '') => {
    const bookmark = {
      book: state.selectedBook,
      chapter: parseInt(state.selectedChapter),
      verse,
      version: state.selectedVersion,
      note
    };

    setState(prev => ({
      ...prev,
      bookmarks: [...prev.bookmarks, bookmark]
    }));
  };

  const removeBookmark = (book: string, chapter: number, verse: number) => {
    setState(prev => ({
      ...prev,
      bookmarks: prev.bookmarks.filter(
        b => !(b.book === book && b.chapter === chapter && b.verse === verse)
      )
    }));
  };

  const updateSettings = (updates: Partial<BibleState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  return {
    // State
    ...state,
    
    // Computed values
    currentBook,
    currentChapterContent,
    availableChapters,
    searchResults,
    bibleBooks,

    // Actions
    navigateToPrevious,
    navigateToNext,
    addBookmark,
    removeBookmark,
    updateSettings
  };
};