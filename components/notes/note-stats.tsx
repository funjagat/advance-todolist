"use client";

import { Clock, BookOpen, Hash } from "lucide-react";

interface NoteStatsProps {
  content: string;
}

export function NoteStats({ content }: NoteStatsProps) {
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // Assuming 200 words per minute
  const characterCount = content.length;

  return (
    <div className="flex items-center gap-4 text-xs text-muted-foreground">
      <div className="flex items-center gap-1">
        <Hash className="h-3 w-3" />
        {wordCount} words
      </div>
      <div className="flex items-center gap-1">
        <BookOpen className="h-3 w-3" />
        {readingTime} min read
      </div>
      <div className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {characterCount} characters
      </div>
    </div>
  );
}