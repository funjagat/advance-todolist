"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { Note, NotesContextType } from "@/lib/types";

const COLORS = ["#FFF3BF", "#D1F2EB", "#FADBD8", "#E8DAEF", "#D6EAF8"];

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    const storedCategories = JSON.parse(localStorage.getItem("categories") || "[]");
    const storedTags = JSON.parse(localStorage.getItem("tags") || "[]");
    
    // Ensure all notes have required properties
    const validatedNotes = storedNotes.map((note: Note) => ({
      ...note,
      tags: note.tags || [],
      category: note.category || "Uncategorized",
      isPinned: note.isPinned || false,
      isArchived: note.isArchived || false,
      isFavorite: note.isFavorite || false,
      lastModified: note.lastModified || note.createdAt,
    }));

    setNotes(validatedNotes);
    setCategories(storedCategories);
    setTags(storedTags);
  }, []);

  const addNote = (content: string, category: string, noteTags: string[]) => {
    const newNote = {
      id: Date.now(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      category,
      tags: noteTags,
      isPinned: false,
      isArchived: false,
      isFavorite: false,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const updateNote = (id: number, updates: Partial<Note>) => {
    const updatedNotes = notes.map((note) =>
      note.id === id
        ? {
            ...note,
            ...updates,
            lastModified: new Date().toISOString(),
          }
        : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      const updatedCategories = [...categories, category];
      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
    }
  };

  const deleteCategory = (category: string) => {
    const updatedCategories = categories.filter((c) => c !== category);
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      const updatedTags = [...tags, tag];
      setTags(updatedTags);
      localStorage.setItem("tags", JSON.stringify(updatedTags));
    }
  };

  const deleteTag = (tag: string) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
    localStorage.setItem("tags", JSON.stringify(updatedTags));
  };

  const searchNotes = (query: string) => {
    return notes.filter(
      (note) =>
        note.content.toLowerCase().includes(query.toLowerCase()) ||
        note.category.toLowerCase().includes(query.toLowerCase()) ||
        note.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const togglePin = (id: number) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const toggleArchive = (id: number) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, isArchived: !note.isArchived } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const toggleFavorite = (id: number) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        updateNote,
        categories,
        addCategory,
        deleteCategory,
        tags,
        addTag,
        deleteTag,
        searchNotes,
        togglePin,
        toggleArchive,
        toggleFavorite,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}