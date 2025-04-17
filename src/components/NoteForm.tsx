
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, Edit3 } from "lucide-react";

export type NoteFormData = {
  id?: string;
  title: string;
  content: string;
  color: "yellow" | "blue" | "pink" | "purple" | "peach";
  pinColor: "default" | "red" | "blue" | "purple" | "green";
};

type NoteFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: NoteFormData) => void;
  initialData?: NoteFormData;
};

const defaultNote: NoteFormData = {
  title: "",
  content: "",
  color: "yellow",
  pinColor: "default",
};

const NoteForm: React.FC<NoteFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [note, setNote] = useState<NoteFormData>(initialData || defaultNote);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && titleRef.current) {
      titleRef.current.focus();
    }
    if (initialData) {
      setNote(initialData);
    } else {
      setNote(defaultNote);
    }
  }, [isOpen, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color: NoteFormData["color"]) => {
    setNote((prev) => ({ ...prev, color }));
  };

  const handlePinColorChange = (pinColor: NoteFormData["pinColor"]) => {
    setNote((prev) => ({ ...prev, pinColor }));
  };

  const handleSave = () => {
    if (note.title.trim() === "") return;
    onSave(note);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Note" : "Create New Note"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Input
            ref={titleRef}
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Title"
            className="font-medium"
          />
          <Textarea
            name="content"
            value={note.content}
            onChange={handleChange}
            placeholder="Write your note here..."
            className="min-h-[150px]"
          />

          <div>
            <p className="text-sm font-medium mb-2">Note Color</p>
            <div className="flex space-x-2">
              {(["yellow", "blue", "pink", "purple", "peach"] as const).map(
                (color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`w-8 h-8 rounded-full ${
                      note.color === color ? "ring-2 ring-black" : ""
                    }`}
                    style={{
                      background:
                        color === "yellow"
                          ? "linear-gradient(135deg, #fff9c4, #ffee58)"
                          : color === "blue"
                          ? "linear-gradient(135deg, #D3E4FD, #90caf9)"
                          : color === "pink"
                          ? "linear-gradient(135deg, #FFDEE2, #f48fb1)"
                          : color === "purple"
                          ? "linear-gradient(135deg, #E5DEFF, #ce93d8)"
                          : "linear-gradient(135deg, #FDE1D3, #ffab91)",
                    }}
                  />
                )
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Pin Color</p>
            <div className="flex space-x-2">
              {(["default", "red", "blue", "purple", "green"] as const).map(
                (color) => (
                  <button
                    key={color}
                    onClick={() => handlePinColorChange(color)}
                    className={`w-8 h-8 rounded-full ${
                      note.pinColor === color ? "ring-2 ring-black" : ""
                    }`}
                    style={{
                      background:
                        color === "default"
                          ? "#F97316"
                          : color === "red"
                          ? "#ef4444"
                          : color === "blue"
                          ? "#33C3F0"
                          : color === "purple"
                          ? "#9b87f5"
                          : "#22c55e",
                    }}
                  />
                )
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="cartoon" onClick={handleSave} className="flex items-center gap-2">
              <Edit3 size={16} />
              {initialData ? "Update" : "Save"} Note
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NoteForm;
