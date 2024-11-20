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
import { Plus, Tag, Image as ImageIcon } from "lucide-react";
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
      <DialogContent className="w-full max-w-3xl h-[90vh] sm:h-auto">
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full max-h-[calc(90vh-8rem)] sm:max-h-none px-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
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
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Add new category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <Button type="button" onClick={handleAddCategory} className="shrink-0">
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Note Content (Markdown supported)</Label>
              <Textarea
                placeholder="Write your note here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[150px] sm:min-h-[200px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label>Image URL (optional)</Label>
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setImageUrl("")}
                  className="shrink-0"
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Due Date (optional)</Label>
                <Input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Priority Note</Label>
                  <Switch
                    checked={isPriority}
                    onCheckedChange={setIsPriority}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Set Reminder</Label>
                  <Switch
                    checked={reminder}
                    onCheckedChange={setReminder}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <ScrollArea className="h-20 w-full rounded-md border p-2">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Button
                      key={tag}
                      type="button"
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleTag(tag)}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Add new tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <Button type="button" onClick={handleAddTag} className="shrink-0">
                Add
              </Button>
            </div>

            <Button type="submit" className="w-full">
              Save Note
            </Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}