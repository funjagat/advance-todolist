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
  Calendar,
  Bell,
  AlertTriangle,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useNotes } from "@/context/notes-context";
import type { Note } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

// TODO: Add rich text editor with formatting options
// TODO: Implement file attachments (images, documents)
// TODO: Add support for note categories with color coding
// TODO: Implement note linking/references between notes
// TODO: Add collaborative editing with real-time updates
// TODO: Implement version history and restore functionality
// TODO: Add support for code snippets with syntax highlighting
// TODO: Implement note encryption for sensitive information
// TODO: Add support for voice notes and transcription
// TODO: Implement OCR for images with text extraction

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

  const tags = note.tags || [];
  const category = note.category || "Uncategorized";

  return (
    <Card
      style={{ backgroundColor: note.color }}
      className={cn(
        "transition-all duration-200 hover:shadow-lg",
        note.isPriority && "ring-2 ring-red-500"
      )}
    >
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline">{category}</Badge>
            {note.isPriority && (
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="h-3 w-3" />
                Priority
              </Badge>
            )}
            {note.dueDate && (
              <Badge variant="secondary" className="gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(note.dueDate).toLocaleDateString()}
              </Badge>
            )}
            {note.reminder && (
              <Badge variant="secondary" className="gap-1">
                <Bell className="h-3 w-3" />
                Reminder
              </Badge>
            )}
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => togglePin(note.id)}
              className={cn(
                "hover:text-yellow-600",
                note.isPinned && "text-yellow-600"
              )}
            >
              <Pin className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(note.id)}
              className={cn(
                "hover:text-yellow-600",
                note.isFavorite && "text-yellow-600"
              )}
            >
              <Star className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleArchive(note.id)}
              className={cn(
                "hover:text-gray-600",
                note.isArchived && "text-gray-600"
              )}
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
        {note.imageUrl && (
          <img
            src={note.imageUrl}
            alt="Note attachment"
            className="w-full h-48 object-cover rounded-md"
          />
        )}
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