"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistProps {
  items: { id: string; text: string; checked: boolean }[];
  onChange: (items: { id: string; text: string; checked: boolean }[]) => void;
}

export function Checklist({ items, onChange }: ChecklistProps) {
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim()) {
      onChange([
        ...items,
        { id: Date.now().toString(), text: newItem.trim(), checked: false },
      ]);
      setNewItem("");
    }
  };

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const toggleItem = (id: string) => {
    onChange(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          className="flex-1"
        />
        <Button onClick={addItem} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 group"
          >
            <Checkbox
              checked={item.checked}
              onCheckedChange={() => toggleItem(item.id)}
              id={item.id}
            />
            <label
              htmlFor={item.id}
              className={cn(
                "flex-1 cursor-pointer",
                item.checked && "line-through text-muted-foreground"
              )}
            >
              {item.text}
            </label>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeItem(item.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}