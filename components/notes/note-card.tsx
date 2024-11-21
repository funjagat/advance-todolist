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
  Copy,
  Share2,
  Download,
  Printer,
  CheckCircle2,
  Link2,
  Palette,
  MoreHorizontal,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useNotes } from "@/context/notes-context";
import type { Note } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface NoteCardProps {
  note: Note;
}

const COLORS = [
  "#FFF3BF",
  "#D1F2EB",
  "#FADBD8",
  "#E8DAEF",
  "#D6EAF8",
  "#FCE4EC",
  "#F0F4C3",
  "#CFD8DC",
  "#FFE0B2",
  "#C8E6C9",
];

export function NoteCard({ note }: NoteCardProps) {
  const { deleteNote, updateNote, togglePin, toggleArchive, toggleFavorite } = useNotes();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);
  const [isCompleted, setIsCompleted] = useState(note.isCompleted || false);

  const handleSave = () => {
    updateNote(note.id, { content: editedContent });
    setIsEditing(false);
    toast.success("Note updated successfully!");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(note.content);
    toast.success("Note content copied to clipboard!");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Shared Note",
        text: note.content,
      }).catch(() => {
        toast.error("Failed to share note");
      });
    } else {
      toast.error("Sharing is not supported on this device");
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([note.content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `note-${note.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Note downloaded successfully!");
  };

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=600,height=600");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Note</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .note-content { white-space: pre-wrap; }
              .metadata { color: #666; font-size: 0.9em; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="note-content">${note.content}</div>
            <div class="metadata">
              Created: ${formatDate(note.createdAt)}<br>
              Category: ${note.category}<br>
              Tags: ${note.tags.join(", ")}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  const handleColorChange = (color: string) => {
    updateNote(note.id, { color });
    toast.success("Note color updated!");
  };

  const handleToggleComplete = () => {
    setIsCompleted(!isCompleted);
    updateNote(note.id, { isCompleted: !isCompleted });
    toast.success(isCompleted ? "Note marked as incomplete" : "Note marked as complete");
  };

  const handleCopyLink = () => {
    const noteUrl = `${window.location.origin}/note/${note.id}`;
    navigator.clipboard.writeText(noteUrl);
    toast.success("Note link copied to clipboard!");
  };

  const tags = note.tags || [];
  const category = note.category || "Uncategorized";

  return (
    <Card
      style={{ backgroundColor: note.color }}
      className={cn(
        "transition-all duration-200 hover:shadow-lg relative group",
        note.isPriority && "ring-2 ring-red-500",
        isCompleted && "opacity-75"
      )}
    >
      {/* Priority Badge - Absolute positioned */}
      {note.isPriority && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge variant="destructive" className="shadow-lg">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Priority
          </Badge>
        </div>
      )}

      <CardHeader className="space-y-2 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs font-medium">
              {category}
            </Badge>
            {note.dueDate && (
              <Badge variant="secondary" className="text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(note.dueDate).toLocaleDateString()}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleToggleComplete}
            >
              <CheckCircle2 className={cn("h-4 w-4", isCompleted && "text-green-500")} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => togglePin(note.id)}
            >
              <Pin className={cn("h-4 w-4", note.isPinned && "text-yellow-500")} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => toggleFavorite(note.id)}
            >
              <Star className={cn("h-4 w-4", note.isFavorite && "text-yellow-500")} />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setIsEditing(!isEditing)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleArchive(note.id)}>
                  <Archive className="h-4 w-4 mr-2" />
                  {note.isArchived ? "Unarchive" : "Archive"}
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={handleCopy}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Text
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopyLink}>
                  <Link2 className="h-4 w-4 mr-2" />
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem 
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this note?")) {
                      deleteNote(note.id);
                      toast.success("Note deleted successfully!");
                    }
                  }}
                  className="text-red-500 focus:text-red-500"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
            className="min-h-[150px] resize-none bg-background/50"
          />
        ) : (
          <div 
            className={cn(
              "prose prose-sm dark:prose-invert max-w-none",
              isCompleted && "line-through opacity-75"
            )}
          >
            <ReactMarkdown>{note.content}</ReactMarkdown>
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs bg-background/50"
              >
                <Tag className="h-3 w-3 mr-1 opacity-50" />
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between pt-3">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1 opacity-50" />
          {formatDate(note.lastModified || note.createdAt)}
        </div>
        {isEditing && (
          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        )}
      </CardFooter>

      {/* Color Picker - Absolute positioned */}
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Palette className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-2">
            <div className="grid grid-cols-5 gap-1">
              {COLORS.map((color) => (
                <div
                  key={color}
                  className="w-6 h-6 rounded-full cursor-pointer hover:ring-2 ring-offset-2"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}