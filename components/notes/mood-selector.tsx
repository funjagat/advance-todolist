"use client";

import { Button } from "@/components/ui/button";
import { Smile, Meh, Frown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MoodSelectorProps {
  value?: 'happy' | 'neutral' | 'sad';
  onChange: (mood: 'happy' | 'neutral' | 'sad') => void;
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "flex-1",
          value === "happy" && "bg-green-100 dark:bg-green-900"
        )}
        onClick={() => onChange("happy")}
      >
        <Smile className={cn(
          "h-4 w-4 mr-2",
          value === "happy" && "text-green-500"
        )} />
        Happy
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "flex-1",
          value === "neutral" && "bg-yellow-100 dark:bg-yellow-900"
        )}
        onClick={() => onChange("neutral")}
      >
        <Meh className={cn(
          "h-4 w-4 mr-2",
          value === "neutral" && "text-yellow-500"
        )} />
        Neutral
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "flex-1",
          value === "sad" && "bg-blue-100 dark:bg-blue-900"
        )}
        onClick={() => onChange("sad")}
      >
        <Frown className={cn(
          "h-4 w-4 mr-2",
          value === "sad" && "text-blue-500"
        )} />
        Sad
      </Button>
    </div>
  );
}