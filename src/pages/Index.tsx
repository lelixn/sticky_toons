
import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StickyNote from "@/components/StickyNote";
import NoteForm, { NoteFormData } from "@/components/NoteForm";
import Navbar from "@/components/Navbar";
import Decorations from "@/components/Decorations";
import EmptyState from "@/components/EmptyState";
import MobileWarning from "@/components/MobileWarning";

type Note = {
  id: string;
  title: string;
  content: string;
  color: "yellow" | "blue" | "pink" | "purple" | "peach";
  pinColor: "default" | "red" | "blue" | "purple" | "green";
  createdAt: number;
};

const Index = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedNotes = localStorage.getItem("stickyToonNotes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error("Failed to parse saved notes:", error);
      }
    } else {
      // Add example notes for first-time users
      const exampleNotes: Note[] = [
        {
          id: "1",
          title: "Welcome to Sticky Toon Notes!",
          content: "This is a fun note-taking app with a cartoon theme. Click the + button to add a new note.",
          color: "yellow",
          pinColor: "default",
          createdAt: Date.now(),
        },
        {
          id: "2",
          title: "Customizable notes",
          content: "You can change the color of your notes and pins to organize your thoughts better.",
          color: "blue",
          pinColor: "blue",
          createdAt: Date.now() - 10000,
        },
        {
          id: "3",
          title: "Todo List",
          content: "- Buy groceries\n- Walk the dog\n- Learn React\n- Build a cool app",
          color: "pink",
          pinColor: "purple",
          createdAt: Date.now() - 20000,
        },
      ];
      setNotes(exampleNotes);
      localStorage.setItem("stickyToonNotes", JSON.stringify(exampleNotes));
    }
  }, []);

  const saveNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
    localStorage.setItem("stickyToonNotes", JSON.stringify(updatedNotes));
  };

  const handleAddNote = (noteData: NoteFormData) => {
    const newNote: Note = {
      id: Date.now().toString(),
      ...noteData,
      createdAt: Date.now(),
    };
    
    const updatedNotes = [newNote, ...notes];
    saveNotes(updatedNotes);
    
    toast({
      title: "Note created",
      description: "Your note has been saved successfully!",
      className: "bg-green-50 border-green-200",
    });
  };

  const handleEditNote = (id: string) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setEditingNote(noteToEdit);
      setIsFormOpen(true);
    }
  };

  const handleUpdateNote = (noteData: NoteFormData) => {
    if (!editingNote) return;
    
    const updatedNotes = notes.map((note) =>
      note.id === editingNote.id
        ? { ...note, ...noteData }
        : note
    );
    
    saveNotes(updatedNotes);
    setEditingNote(null);
    
    toast({
      title: "Note updated",
      description: "Your note has been updated successfully!",
    });
  };

  const handleDeleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    saveNotes(updatedNotes);
    
    toast({
      title: "Note deleted",
      description: "Your note has been deleted.",
      variant: "destructive",
      className: "bg-red-50 border-red-200 text-red-900",
    });
  };

  const handleSaveNote = (noteData: NoteFormData) => {
    if (editingNote) {
      handleUpdateNote(noteData);
    } else {
      handleAddNote(noteData);
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Decorations />
      <Navbar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <main className="container p-4 md:p-6">
        {filteredNotes.length === 0 ? (
          <EmptyState 
            title={searchTerm ? "No matching notes" : "No notes yet"}
            description={
              searchTerm 
                ? "Try searching with different keywords or clear your search." 
                : "Start by adding your first sticky note using the + button below!"
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredNotes.map((note) => (
              <StickyNote
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                color={note.color}
                pinColor={note.pinColor}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </main>

      <button
        className="add-note-btn"
        onClick={() => {
          setEditingNote(null);
          setIsFormOpen(true);
        }}
        aria-label="Add new note"
      >
        <Plus size={24} strokeWidth={3} className="animate-pulse"/>
      </button>

      <NoteForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveNote}
        initialData={editingNote || undefined}
      />
      
      <MobileWarning />
    </div>
  );
};

export default Index;
