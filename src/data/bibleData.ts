// Bible book and chapter data structure
export interface BibleVerse {
  verse: number;
  text: string;
}

export interface BibleChapter {
  chapter: number;
  verses: BibleVerse[];
}

export interface BibleBook {
  name: string;
  chapters: number;
  testament: 'old' | 'new';
}

// Complete Bible book structure with chapter counts
export const bibleBooks: BibleBook[] = [
  // Old Testament
  { name: 'Genesis', chapters: 50, testament: 'old' },
  { name: 'Exodus', chapters: 40, testament: 'old' },
  { name: 'Leviticus', chapters: 27, testament: 'old' },
  { name: 'Numbers', chapters: 36, testament: 'old' },
  { name: 'Deuteronomy', chapters: 34, testament: 'old' },
  { name: 'Joshua', chapters: 24, testament: 'old' },
  { name: 'Judges', chapters: 21, testament: 'old' },
  { name: 'Ruth', chapters: 4, testament: 'old' },
  { name: '1 Samuel', chapters: 31, testament: 'old' },
  { name: '2 Samuel', chapters: 24, testament: 'old' },
  { name: '1 Kings', chapters: 22, testament: 'old' },
  { name: '2 Kings', chapters: 25, testament: 'old' },
  { name: '1 Chronicles', chapters: 29, testament: 'old' },
  { name: '2 Chronicles', chapters: 36, testament: 'old' },
  { name: 'Ezra', chapters: 10, testament: 'old' },
  { name: 'Nehemiah', chapters: 13, testament: 'old' },
  { name: 'Esther', chapters: 10, testament: 'old' },
  { name: 'Job', chapters: 42, testament: 'old' },
  { name: 'Psalms', chapters: 150, testament: 'old' },
  { name: 'Proverbs', chapters: 31, testament: 'old' },
  { name: 'Ecclesiastes', chapters: 12, testament: 'old' },
  { name: 'Song of Solomon', chapters: 8, testament: 'old' },
  { name: 'Isaiah', chapters: 66, testament: 'old' },
  { name: 'Jeremiah', chapters: 52, testament: 'old' },
  { name: 'Lamentations', chapters: 5, testament: 'old' },
  { name: 'Ezekiel', chapters: 48, testament: 'old' },
  { name: 'Daniel', chapters: 12, testament: 'old' },
  { name: 'Hosea', chapters: 14, testament: 'old' },
  { name: 'Joel', chapters: 3, testament: 'old' },
  { name: 'Amos', chapters: 9, testament: 'old' },
  { name: 'Obadiah', chapters: 1, testament: 'old' },
  { name: 'Jonah', chapters: 4, testament: 'old' },
  { name: 'Micah', chapters: 7, testament: 'old' },
  { name: 'Nahum', chapters: 3, testament: 'old' },
  { name: 'Habakkuk', chapters: 3, testament: 'old' },
  { name: 'Zephaniah', chapters: 3, testament: 'old' },
  { name: 'Haggai', chapters: 2, testament: 'old' },
  { name: 'Zechariah', chapters: 14, testament: 'old' },
  { name: 'Malachi', chapters: 4, testament: 'old' },
  
  // New Testament
  { name: 'Matthew', chapters: 28, testament: 'new' },
  { name: 'Mark', chapters: 16, testament: 'new' },
  { name: 'Luke', chapters: 24, testament: 'new' },
  { name: 'John', chapters: 21, testament: 'new' },
  { name: 'Acts', chapters: 28, testament: 'new' },
  { name: 'Romans', chapters: 16, testament: 'new' },
  { name: '1 Corinthians', chapters: 16, testament: 'new' },
  { name: '2 Corinthians', chapters: 13, testament: 'new' },
  { name: 'Galatians', chapters: 6, testament: 'new' },
  { name: 'Ephesians', chapters: 6, testament: 'new' },
  { name: 'Philippians', chapters: 4, testament: 'new' },
  { name: 'Colossians', chapters: 4, testament: 'new' },
  { name: '1 Thessalonians', chapters: 5, testament: 'new' },
  { name: '2 Thessalonians', chapters: 3, testament: 'new' },
  { name: '1 Timothy', chapters: 6, testament: 'new' },
  { name: '2 Timothy', chapters: 4, testament: 'new' },
  { name: 'Titus', chapters: 3, testament: 'new' },
  { name: 'Philemon', chapters: 1, testament: 'new' },
  { name: 'Hebrews', chapters: 13, testament: 'new' },
  { name: 'James', chapters: 5, testament: 'new' },
  { name: '1 Peter', chapters: 5, testament: 'new' },
  { name: '2 Peter', chapters: 3, testament: 'new' },
  { name: '1 John', chapters: 5, testament: 'new' },
  { name: '2 John', chapters: 1, testament: 'new' },
  { name: '3 John', chapters: 1, testament: 'new' },
  { name: 'Jude', chapters: 1, testament: 'new' },
  { name: 'Revelation', chapters: 22, testament: 'new' }
];

// Sample Bible content - Genesis 1 (KJV)
export const sampleBibleContent: Record<string, Record<string, Record<string, BibleVerse[]>>> = {
  KJV: {
    Genesis: {
      "1": [
        { verse: 1, text: "In the beginning God created the heaven and the earth." },
        { verse: 2, text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters." },
        { verse: 3, text: "And God said, Let there be light: and there was light." },
        { verse: 4, text: "And God saw the light, that it was good: and God divided the light from the darkness." },
        { verse: 5, text: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day." },
        { verse: 6, text: "And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters." },
        { verse: 7, text: "And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so." },
        { verse: 8, text: "And God called the firmament Heaven. And the evening and the morning were the second day." },
        { verse: 9, text: "And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so." },
        { verse: 10, text: "And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good." },
        { verse: 11, text: "And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind, whose seed is in itself, upon the earth: and it was so." },
        { verse: 12, text: "And the earth brought forth grass, and herb yielding seed after his kind, and the tree yielding fruit, whose seed was in itself, after his kind: and God saw that it was good." },
        { verse: 13, text: "And the evening and the morning were the third day." },
        { verse: 14, text: "And God said, Let there be lights in the firmament of the heaven to divide the day from the night; and let them be for signs, and for seasons, and for days, and years:" },
        { verse: 15, text: "And let them be for lights in the firmament of the heaven to give light upon the earth: and it was so." },
        { verse: 16, text: "And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also." },
        { verse: 17, text: "And God set them in the firmament of the heaven to give light upon the earth," },
        { verse: 18, text: "And to rule over the day and over the night, and to divide the light from the darkness: and God saw that it was good." },
        { verse: 19, text: "And the evening and the morning were the fourth day." },
        { verse: 20, text: "And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven." },
        { verse: 21, text: "And God created great whales, and every living creature that moveth, which the waters brought forth abundantly, after their kind, and every winged fowl after his kind: and God saw that it was good." },
        { verse: 22, text: "And God blessed them, saying, Be fruitful, and multiply, and fill the waters in the seas, and let fowl multiply in the earth." },
        { verse: 23, text: "And the evening and the morning were the fifth day." },
        { verse: 24, text: "And God said, Let the earth bring forth the living creature after his kind, cattle, and creeping thing, and beast of the earth after his kind: and it was so." },
        { verse: 25, text: "And God made the beast of the earth after his kind, and cattle after their kind, and every thing that creepeth upon the earth after his kind: and God saw that it was good." },
        { verse: 26, text: "And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth." },
        { verse: 27, text: "So God created man in his own image, in the image of God created he him; male and female created he them." },
        { verse: 28, text: "And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth." },
        { verse: 29, text: "And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat." },
        { verse: 30, text: "And to every beast of the earth, and to every fowl of the air, and to every thing that creepeth upon the earth, wherein there is life, I have given every green herb for meat: and it was so." },
        { verse: 31, text: "And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day." }
      ]
    },
    John: {
      "3": [
        { verse: 1, text: "There was a man of the Pharisees, named Nicodemus, a ruler of the Jews:" },
        { verse: 2, text: "The same came to Jesus by night, and said unto him, Rabbi, we know that thou art a teacher come from God: for no man can do these miracles that thou doest, except God be with him." },
        { verse: 3, text: "Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God." },
        { verse: 16, text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." },
        { verse: 17, text: "For God sent not his Son into the world to condemn the world; but that the world through him might be saved." }
      ]
    },
    Psalms: {
      "23": [
        { verse: 1, text: "The Lord is my shepherd; I shall not want." },
        { verse: 2, text: "He maketh me to lie down in green pastures: he leadeth me beside the still waters." },
        { verse: 3, text: "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake." },
        { verse: 4, text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me." },
        { verse: 5, text: "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over." },
        { verse: 6, text: "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the Lord for ever." }
      ]
    }
  },
  NIV: {
    Genesis: {
      "1": [
        { verse: 1, text: "In the beginning God created the heavens and the earth." },
        { verse: 2, text: "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters." },
        { verse: 3, text: "And God said, \"Let there be light,\" and there was light." },
        { verse: 4, text: "God saw that the light was good, and he separated the light from the darkness." },
        { verse: 5, text: "God called the light \"day,\" and the darkness he called \"night.\" And there was evening, and there was morning—the first day." }
      ]
    },
    John: {
      "3": [
        { verse: 16, text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." }
      ]
    }
  }
};

// Utility function to get book info
export function getBookInfo(bookName: string): BibleBook | undefined {
  return bibleBooks.find(book => book.name === bookName);
}

// Utility function to get chapter content
export function getChapterContent(version: string, book: string, chapter: string): BibleVerse[] {
  return sampleBibleContent[version]?.[book]?.[chapter] || [];
}