"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface CollaboratorsProps {
  collaborators: string[];
  onAdd: (collaborator: string) => void;
  onRemove: (collaborator: string) => void;
}

export function Collaborators({ collaborators, onAdd, onRemove }: CollaboratorsProps) {
  const [email, setEmail] = useState("");

  const handleAdd = () => {
    if (email && !collaborators.includes(email)) {
      onAdd(email);
      setEmail("");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Add collaborator by email..."
          className="flex-1"
        />
        <Button onClick={handleAdd} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {collaborators.map((collaborator) => (
          <div
            key={collaborator}
            className="flex items-center gap-2 bg-secondary rounded-full pl-1 pr-2 py-1"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={`https://avatar.vercel.sh/${collaborator}`} />
              <AvatarFallback>
                {collaborator[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{collaborator}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 hover:bg-transparent"
              onClick={() => onRemove(collaborator)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}