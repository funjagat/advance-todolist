import NotesContainer from "@/components/notes/notes-container";
import { CreateNoteButton } from "@/components/notes/create-note-button";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold tracking-tight">My Notes</h1>
          <CreateNoteButton />
        </div>
        <NotesContainer />
      </div>
    </main>
  );
}