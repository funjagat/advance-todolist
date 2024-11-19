import NotesContainer from "@/components/notes/notes-container";
import { CreateNoteButton } from "@/components/notes/create-note-button";
import { ModeToggle } from "@/components/mode-toggle";
import { Sidebar } from "@/components/sidebar";
import { StatsCard } from "@/components/stats-card";
import { SearchCommand } from "@/components/search-command";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
        <div className="container px-4 py-8 mx-auto">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold tracking-tight">My Notes</h1>
              <div className="flex items-center gap-4">
                <SearchCommand />
                <ModeToggle />
                <CreateNoteButton />
              </div>
            </div>
            <StatsCard />
            <NotesContainer />
          </div>
        </div>
      </main>
    </div>
  );
}
