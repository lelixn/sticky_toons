
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Pin from "./Pin";
import { Edit, Trash2 } from "lucide-react";

type StickyNoteProps = {
  id: string;
  title: string;
  content: string;
  color: "yellow" | "blue" | "pink" | "purple" | "peach";
  pinColor?: "default" | "red" | "blue" | "purple" | "green";
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const StickyNote: React.FC<StickyNoteProps> = ({
  id,
  title,
  content,
  color,
  pinColor = "default",
  onEdit,
  onDelete,
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={cn("sticky-note", `sticky-note-${color}`)}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <Pin variant={pinColor} />
      <div className="pt-4">
        <h3 className="font-bold text-lg mb-2 break-words">{title}</h3>
        <p className="text-sm break-words whitespace-pre-wrap overflow-hidden">{content}</p>
      </div>

      {showActions && (
        <div className="absolute bottom-2 right-2 flex space-x-2">
          <button
            onClick={() => onEdit(id)}
            className="p-1 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <Edit size={16} className="text-gray-700" />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-1 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
};

export default StickyNote;
