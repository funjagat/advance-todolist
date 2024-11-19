"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  Trash2,
  Save,
  Pin,
  Archive,
  Star,
  Clock,
  Tag,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useNotes } from "@/context/notes-context";
import type { Note } from "@/lib/types";
import ReactMarkdown from "react-markdown";

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const { deleteNote, updateNote, togglePin, toggleArchive, toggleFavorite } =
    useNotes();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleSave = () => {
    updateNote(note.id, { content: editedContent });
    setIsEditing(false);
  };

  // Ensure tags is always an array
  const tags = note.tags || [];
  const category = note.category || "Uncategorized";

  return (
    <Card
      style={{ backgroundColor: note.color }}
      className="transition-all duration-200 hover:shadow-lg"
    >
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{category}</Badge>
            {note.isPinned && <Pin className="h-4 w-4 text-yellow-600" />}
            {note.isFavorite && <Star className="h-4 w-4 text-yellow-600" />}
            {note.isArchived && <Archive className="h-4 w-4 text-gray-600" />}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => togglePin(note.id)}
              className={note.isPinned ? "text-yellow-600" : ""}
            >
              <Pin className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(note.id)}
              className={note.isFavorite ? "text-yellow-600" : ""}
            >
              <Star className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleArchive(note.id)}
              className={note.isArchived ? "text-gray-600" : ""}
            >
              <Archive className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteNote(note.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="min-h-[150px] resize-none"
          />
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{note.content}</ReactMarkdown>
          </div>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          Last modified: {formatDate(note.lastModified || note.createdAt)}
        </div>
        {isEditing && (
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}