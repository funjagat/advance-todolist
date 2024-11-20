"use client";

import { useNotes } from "@/context/notes-context";
import { cn } from "@/lib/utils";
import {
  Archive,
  Star,
  Tag,
  Folder,
  ChevronDown,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

// TODO: Add drag and drop support for note organization
// TODO: Implement custom category icons and colors
// TODO: Add support for nested categories/folders
// TODO: Implement category sharing and collaboration
// TODO: Add support for category-specific settings
// TODO: Implement category statistics and insights
// TODO: Add support for category templates
// TODO: Implement category archiving functionality
// TODO: Add category search and filtering
// TODO: Implement category export/import functionality

export function Sidebar() {
  const { notes, categories, tags } = useNotes();
  const [showCategories, setShowCategories] = useState(true);
  const [showTags, setShowTags] = useState(true);

  const archivedCount = notes.filter((note) => note.isArchived).length;
  const favoritesCount = notes.filter((note) => note.isFavorite).length;

  return (
    <div className="hidden lg:flex h-screen w-64 flex-col border-r bg-background">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Quick Filters</h2>
      </div>
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              size="sm"
            >
              <Star className="mr-2 h-4 w-4 text-yellow-500" />
              Favorites
              <span className="ml-auto text-muted-foreground">{favoritesCount}</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              size="sm"
            >
              <Archive className="mr-2 h-4 w-4" />
              Archived
              <span className="ml-auto text-muted-foreground">{archivedCount}</span>
            </Button>
          </div>

          <div className="space-y-2">
            <div
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => setShowCategories(!showCategories)}
            >
              <div className="flex items-center">
                <Folder className="mr-2 h-4 w-4" />
                <span className="font-medium">Categories</span>
              </div>
              {showCategories ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
            <AnimatePresence>
              {showCategories && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1 overflow-hidden"
                >
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant="ghost"
                      className="w-full justify-start pl-6"
                      size="sm"
                    >
                      {category}
                      <span className="ml-auto text-muted-foreground">
                        {notes.filter((note) => note.category === category).length}
                      </span>
                    </Button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <div
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => setShowTags(!showTags)}
            >
              <div className="flex items-center">
                <Tag className="mr-2 h-4 w-4" />
                <span className="font-medium">Tags</span>
              </div>
              {showTags ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
            <AnimatePresence>
              {showTags && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1 overflow-hidden"
                >
                  {tags.map((tag) => (
                    <Button
                      key={tag}
                      variant="ghost"
                      className="w-full justify-start pl-6"
                      size="sm"
                    >
                      {tag}
                      <span className="ml-auto text-muted-foreground">
                        {notes.filter((note) => note.tags.includes(tag)).length}
                      </span>
                    </Button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}