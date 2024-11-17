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
}

export interface NotesContextType {
  notes: Note[];
  addNote: (content: string, category: string, tags: string[]) => void;
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