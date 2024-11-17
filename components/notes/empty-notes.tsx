import { FileText } from "lucide-react";

export function EmptyNotes() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 border-2 border-dashed rounded-lg">
      <FileText className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-2xl font-semibold mb-2">No notes yet</h3>
      <p className="text-muted-foreground">
        Create your first note by clicking the &quot;New Note&quot; button above.
      </p>
    </div>
  );
}