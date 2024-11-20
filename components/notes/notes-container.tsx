"use client";

import { useState } from "react";
import { useNotes } from "@/context/notes-context";
import { NoteCard } from "./note-card";
import { EmptyNotes } from "./empty-notes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// TODO: Add support for note sorting (by date, title, priority)
// TODO: Implement note grouping by category/tag
// TODO: Add support for note filtering by date range
// TODO: Implement note search with advanced filters

export default function NotesContainer() {
  const { notes, categories, tags, searchNotes } = useNotes();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [showArchived, setShowArchived] = useState(false);
  console.log("Notes", notes);

  const filteredNotes = searchQuery
    ? searchNotes(searchQuery)
    : notes.filter((note) => {
        if (!showArchived && note.isArchived) return false;
        if (selectedCategory !== "all" && note.category !== selectedCategory)
          return false;
        if (selectedTag !== "all" && !note.tags.includes(selectedTag))
          return false;
        return true;
      });

  const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
  const unpinnedNotes = filteredNotes.filter((note) => !note.isPinned);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {tags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={() => setShowArchived(!showArchived)}
            className={showArchived ? "bg-secondary" : ""}
          >
            <Filter className="h-4 w-4 mr-2" />
            {showArchived ? "Hide Archived" : "Show Archived"}
          </Button>
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <EmptyNotes />
      ) : (
        <div className="space-y-8">
          {pinnedNotes.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">📌 Pinned Notes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pinnedNotes.map((note) => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              {pinnedNotes.length > 0 ? "Other Notes" : "All Notes"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unpinnedNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
