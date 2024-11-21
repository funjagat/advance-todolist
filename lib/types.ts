export interface Note {
  id: number;
  content: string;
  createdAt: string;
  category: string;
  isPinned: boolean;
  isArchived: boolean;
  color: string;
  tags: string[];
  lastModified: string;
  isFavorite: boolean;
  isPriority?: boolean;
  dueDate?: string;
  reminder?: boolean;
  imageUrl?: string;
  isCompleted?: boolean;
  collaborators?: string[];
  version?: number;
  wordCount?: number;
  readingTime?: number;
  attachments?: string[];
  labels?: { [key: string]: string };
  checklist?: { id: string; text: string; checked: boolean }[];
  mentions?: string[];
  mood?: 'happy' | 'neutral' | 'sad';
  weather?: string;
  location?: { lat: number; lng: number; name: string };
}

export interface NotesContextType {
  notes: Note[];
  addNote: (
    content: string,
    category: string,
    tags: string[],
    options?: {
      isPriority?: boolean;
      dueDate?: string;
      reminder?: boolean;
      imageUrl?: string;
      collaborators?: string[];
      checklist?: { id: string; text: string; checked: boolean }[];
      labels?: { [key: string]: string };
      mood?: 'happy' | 'neutral' | 'sad';
      weather?: string;
      location?: { lat: number; lng: number; name: string };
    }
  ) => void;
  deleteNote: (id: number) => void;
  updateNote: (id: number, updates: Partial<Note>) => void;
  categories: string[];
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
  tags: string[];
  addTag: (tag: string) => void;
  deleteTag: (tag: string) => void;
  searchNotes: (query: string) => Note[];
  togglePin: (id: number) => void;
  toggleArchive: (id: number) => void;
  toggleFavorite: (id: number) => void;
}