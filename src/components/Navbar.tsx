
import React from "react";
import { Search, Palette, Pin, MoonStar } from "lucide-react";
import { Input } from "./ui/input";

type NavbarProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center">
        <Pin className="text-toon-orange mr-2" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-toon-orange to-toon-purple bg-clip-text text-transparent">
          Sticky Toon Notes
        </h1>
      </div>
      
      <div className="relative max-w-sm mx-4 flex-1">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search notes..."
          className="pl-8 pr-4 py-2 w-full rounded-full"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Palette size={20} className="text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <MoonStar size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
