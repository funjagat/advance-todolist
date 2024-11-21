"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Tag, Image as ImageIcon, CalendarIcon, BellIcon, AlertTriangle } from "lucide-react";
import { useNotes } from "@/context/notes-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function CreateNoteButton() {
  const { addNote, categories, tags, addCategory, addTag } = useNotes();
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [open, setOpen] = useState(false);
  const [isPriority, setIsPriority] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [reminder, setReminder] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !category) return;

    addNote(content, category, selectedTags, {
      isPriority,
      dueDate,
      reminder,
      imageUrl,
    });
    
    setContent("");
    setCategory("");
    setSelectedTags([]);
    setIsPriority(false);
    setDueDate("");
    setReminder(false);
    setImageUrl("");
    setOpen(false);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setCategory(newCategory.trim());
      setNewCategory("");
    }
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      addTag(newTag.trim());
      setSelectedTags([...selectedTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 h-[90vh] flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Plus className="h-5 w-5" />
            Create New Note
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <form onSubmit={handleSubmit} className="space-y-6 px-6">
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Category</Label>
                    <div className="flex gap-2">
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2 flex-1">
                        <Input
                          placeholder="Add new category"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="flex-1"
                        />
                        <Button 
                          type="button" 
                          onClick={handleAddCategory} 
                          variant="secondary"
                          className="shrink-0"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Note Content</Label>
                    <div className="relative">
                      <Textarea
                        placeholder="Write your note here... (Markdown supported)"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-[200px] resize-none pr-20"
                      />
                      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                        {content.length} characters
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Image URL</Label>
                    <div className="flex gap-2">
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setImageUrl("")}
                        className={cn(
                          "shrink-0",
                          imageUrl && "text-destructive hover:text-destructive"
                        )}
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Settings</Label>
                    <div className="space-y-4 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">Priority Note</span>
                        </div>
                        <Switch
                          checked={isPriority}
                          onCheckedChange={setIsPriority}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BellIcon className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Set Reminder</span>
                        </div>
                        <Switch
                          checked={reminder}
                          onCheckedChange={setReminder}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Due Date</Label>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-green-500" />
                        <Input
                          type="datetime-local"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Tags</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Add new tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="w-[200px]"
                      />
                      <Button 
                        type="button" 
                        onClick={handleAddTag} 
                        variant="secondary"
                        size="sm"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  
                  <ScrollArea className="h-20 rounded-lg border p-4">
                    {tags.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => toggleTag(tag)}
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        No tags available. Create one above.
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </div>
            </form>
          </ScrollArea>
        </div>

        <div className="border-t p-4 mt-auto">
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={!content.trim() || !category}
            >
              Create Note
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}